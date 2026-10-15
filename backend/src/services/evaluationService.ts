import { db, Attempt, AttemptResponse, MasteryBand } from '../db/database';
import { curriculumLoader } from '../data/curriculumLoader';

export interface SubmitAssessmentPayload {
  learnerId: string;
  assessmentId: string;
  responses: Array<{
    questionId: string;
    answer: any;
    rubricScores?: Record<string, number>;
  }>;
  activeSeconds?: number;
}

export class EvaluationService {
  /**
   * Evaluates a single question based on its type
   */
  gradeQuestion(question: any, answer: any): { isCorrect: boolean; score: number; misconceptionId?: string } {
    if (!question) {
      return { isCorrect: true, score: 1 };
    }

    let isCorrect = false;
    let score = 0;

    switch (question.type) {
      case 'single_choice': {
        isCorrect = String(answer).trim() === String(question.correct).trim();
        score = isCorrect ? 1 : 0;
        break;
      }

      case 'true_false': {
        const boolAnswer = answer === true || answer === 'true' || answer === 1;
        isCorrect = boolAnswer === question.correct;
        score = isCorrect ? 1 : 0;
        break;
      }

      case 'numeric': {
        const numAnswer = Number(answer);
        const correctVal = Number(question.correct);
        const tolerance = Number(question.tolerance ?? 0);
        isCorrect = !isNaN(numAnswer) && Math.abs(numAnswer - correctVal) <= tolerance;
        score = isCorrect ? 1 : 0;
        break;
      }

      case 'classify': {
        isCorrect = String(answer).trim().toLowerCase() === String(question.correct).trim().toLowerCase();
        score = isCorrect ? 1 : 0;
        break;
      }

      case 'short_answer': {
        const text = String(answer || '').toLowerCase();
        const keyPoints: string[] = question.key_points || [];
        if (keyPoints.length === 0) {
          isCorrect = text.length > 5;
          score = isCorrect ? 1 : 0;
        } else {
          let hits = 0;
          for (const kp of keyPoints) {
            const words = kp.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
            const matchesWord = words.some((w) => text.includes(w));
            if (matchesWord) hits++;
          }
          const coverage = hits / keyPoints.length;
          score = Math.round(coverage * 100) / 100;
          isCorrect = coverage >= 0.67;
        }
        break;
      }

      default:
        // Default to acceptable for custom/unspecified interactions
        isCorrect = true;
        score = 1;
    }

    const misconceptionId = !isCorrect && question.misconception ? question.misconception : undefined;

    return { isCorrect, score, misconceptionId };
  }

  /**
   * Grades a challenge rubric
   */
  gradeRubric(rubric: any[], rubricScores: Record<string, number> = {}): { score: number; passed: boolean } {
    if (!rubric || rubric.length === 0) return { score: 1, passed: true };

    let totalEarned = 0;
    let maxPossible = 0;

    for (const r of rubric) {
      const criterion = r.criterion;
      const max = Number(r.max_score || 3);
      const earned = Math.min(max, Math.max(0, Number(rubricScores[criterion] || 0)));
      totalEarned += earned;
      maxPossible += max;
    }

    const score = maxPossible > 0 ? totalEarned / maxPossible : 1;
    const passed = score >= 0.6; // 60% standard pass threshold for challenges

    return { score: Math.round(score * 100) / 100, passed };
  }

  /**
   * Process and grade an assessment submission
   */
  async submitAssessment(payload: SubmitAssessmentPayload): Promise<{
    attempt: Attempt;
    gradedResponses: AttemptResponse[];
    conceptMasteryUpdates: Record<string, any>;
    triggeredMisconceptions: string[];
  }> {
    const { learnerId, assessmentId, responses, activeSeconds = 0 } = payload;
    const assessment = curriculumLoader.getAssessment(assessmentId);

    const questionsMap = new Map<string, any>();
    if (assessment?.questions) {
      for (const q of assessment.questions) {
        questionsMap.set(q.id, q);
      }
    }

    const gradedResponses: AttemptResponse[] = [];
    const triggeredMisconceptions: string[] = [];
    let totalScore = 0;
    let totalQuestions = 0;

    // Check if it's a rubric challenge
    if (assessment?.kind === 'challenge' || assessment?.kind === 'capstone') {
      const rubricScores = responses[0]?.rubricScores || {};
      const { score, passed } = this.gradeRubric(assessment.rubric || [], rubricScores);
      totalScore = score;
      gradedResponses.push({
        question_id: assessmentId,
        answer: rubricScores,
        score,
        rubric_scores: rubricScores,
        is_correct: passed,
      });
    } else {
      // Quiz questions grading
      for (const r of responses) {
        const question = questionsMap.get(r.questionId);
        const { isCorrect, score, misconceptionId } = this.gradeQuestion(question, r.answer);

        gradedResponses.push({
          question_id: r.questionId,
          answer: r.answer,
          is_correct: isCorrect,
          score,
          misconception_id: misconceptionId || null,
        });

        totalScore += score;
        totalQuestions++;

        if (misconceptionId) {
          triggeredMisconceptions.push(misconceptionId);
        }
      }
    }

    const finalScore = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) / 100 : totalScore;
    const passThreshold = assessment?.type === 'content_final' ? 0.75 : 0.6;
    const passed = finalScore >= passThreshold;

    const previousAttempts = await db.getAttempts(learnerId, assessmentId);
    const attemptNo = previousAttempts.length + 1;

    const attempt: Attempt = {
      attempt_id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      learner_id: learnerId,
      assessment_id: assessmentId,
      attempt_no: attemptNo,
      started_at: new Date(Date.now() - (activeSeconds || 60) * 1000).toISOString(),
      submitted_at: new Date().toISOString(),
      responses: gradedResponses,
      score: finalScore,
      passed,
    };

    await db.recordAttempt(attempt);

    // Mark item as completed
    await db.setItemProgress(learnerId, assessmentId, 'completed', activeSeconds);

    // Update Concept Mastery
    const conceptMasteryUpdates = await this.recalculateMastery(learnerId, assessment, gradedResponses);

    // Update Goals & Tasks
    await this.recalculateGoals(learnerId, assessmentId, finalScore);

    return {
      attempt,
      gradedResponses,
      conceptMasteryUpdates,
      triggeredMisconceptions,
    };
  }

  /**
   * Recalculate concept mastery for concepts tagged on the assessment/questions
   */
  private async recalculateMastery(learnerId: string, assessment: any, gradedResponses: AttemptResponse[]) {
    const taggedConcepts = new Set<string>();

    if (assessment?.concepts) {
      for (const c of assessment.concepts) taggedConcepts.add(c);
    }

    if (assessment?.questions) {
      for (const q of assessment.questions) {
        if (q.concepts) {
          for (const c of q.concepts) taggedConcepts.add(c);
        }
      }
    }

    const updates: Record<string, any> = {};
    const allAttempts = await db.getAttempts(learnerId);

    for (const conceptId of taggedConcepts) {
      // Find all responses tagged with this concept across previous attempts (up to last 8)
      const evidence: Array<{ score: number; weight: number }> = [];

      for (const att of allAttempts.slice(-15)) {
        const attMeta = curriculumLoader.getAssessment(att.assessment_id);
        const weight = attMeta?.type === 'content_final' ? 1.5 : attMeta?.type === 'challenge' ? 2.0 : 1.0;

        for (const resp of att.responses) {
          evidence.push({ score: resp.score ?? (resp.is_correct ? 1 : 0), weight });
        }
      }

      const recentEvidence = evidence.slice(-8);
      if (recentEvidence.length === 0) continue;

      const totalWeightedScore = recentEvidence.reduce((sum, e) => sum + e.score * e.weight, 0);
      const totalWeight = recentEvidence.reduce((sum, e) => sum + e.weight, 0);

      const masteryVal = totalWeight > 0 ? Math.round((totalWeightedScore / totalWeight) * 100) / 100 : 0;
      const band: MasteryBand = masteryVal >= 0.8 ? 'mastered' : masteryVal >= 0.6 ? 'proficient' : 'learning';

      const record = await db.updateConceptMastery(learnerId, conceptId, masteryVal, band, recentEvidence.length);
      updates[conceptId] = record;
    }

    return updates;
  }

  /**
   * Recalculate Lesson Goals affected by this assessment
   */
  private async recalculateGoals(learnerId: string, assessmentId: string, latestScore: number) {
    const rawData = curriculumLoader.getRawData();

    for (const mod of rawData.learning_track.modules || []) {
      for (const sm of mod.submodules || []) {
        for (const ch of sm.chapters || []) {
          for (const lesson of ch.lessons || []) {
            const goals = lesson.evaluation?.goals || [];

            for (const goal of goals) {
              const linked: string[] = goal.linked_assessments || [];

              if (linked.includes(assessmentId)) {
                // Find best score across linked assessments
                let bestScore = latestScore;
                for (const linkedId of linked) {
                  const attempts = await db.getAttempts(learnerId, linkedId);
                  for (const a of attempts) {
                    if (a.score > bestScore) bestScore = a.score;
                  }
                }

                const threshold = Number(goal.mastery_threshold || 0.75);
                const progressVal = Math.min(1, Math.round((bestScore / threshold) * 100) / 100);
                const status = progressVal >= 1 ? 'met' : progressVal > 0 ? 'in_progress' : 'not_started';

                await db.updateGoalProgress(learnerId, goal.id, progressVal, status);
              }
            }
          }
        }
      }
    }
  }
}

export const evaluationService = new EvaluationService();
