import fs from 'fs';
import path from 'path';

export interface CurriculumData {
  $schema_version: string;
  meta: any;
  conventions: any;
  design_rules: any;
  difficulty_framework: any;
  learning_track: {
    modules: any[];
  };
  evaluation_track: {
    assessment_types: any;
    scoring: any;
    pass_and_gating: any;
    mastery_model: any;
    goals_and_tasks: any;
    metrics: any[];
    misconception_catalog: any[];
    data_contracts: any;
    gamification_suggestions?: any;
    assessment_index: any[];
  };
  glossary: {
    concepts: Array<{ id: string; term: string; definition: string; references?: string[] }>;
  };
  references?: any;
  validation_report?: any;
}

class CurriculumLoader {
  private data!: CurriculumData;
  private interactionExamples: Record<string, any> = {};

  private chaptersMap = new Map<string, { chapter: any; submodule: any; module: any }>();
  private lessonsMap = new Map<string, { lesson: any; chapter: any; submodule: any; module: any }>();
  private groupsMap = new Map<string, { group: any; content: any; lesson: any }>();
  private itemsMap = new Map<string, { item: any; group: any; content: any; lesson: any }>();
  private assessmentsMap = new Map<string, any>();
  private conceptsMap = new Map<string, { id: string; term: string; definition: string }>();
  private misconceptionsMap = new Map<string, any>();

  constructor() {
    this.load();
  }

  private load() {
    const rootDir = path.resolve(__dirname, '../../../');
    const patchedPath = path.join(rootDir, 'app_info', 'curriculum_patched.json');
    const standardPath = path.join(rootDir, 'app_info', 'curriculum.json');
    const examplesPath = path.join(rootDir, 'app_info', 'interaction_examples.json');

    const filePath = fs.existsSync(patchedPath) ? patchedPath : standardPath;
    console.log(`[CurriculumLoader] Loading curriculum from ${filePath}`);

    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      this.data = JSON.parse(raw);
    } catch (err) {
      console.error('[CurriculumLoader] Error loading curriculum JSON:', err);
      throw err;
    }

    try {
      if (fs.existsSync(examplesPath)) {
        this.interactionExamples = JSON.parse(fs.readFileSync(examplesPath, 'utf-8'));
      }
    } catch (err) {
      console.warn('[CurriculumLoader] Could not load interaction_examples.json:', err);
    }

    this.index();
  }

  private index() {
    // Index glossary concepts
    for (const c of this.data.glossary?.concepts || []) {
      this.conceptsMap.set(c.id, c);
    }

    // Index misconceptions
    for (const m of this.data.evaluation_track?.misconception_catalog || []) {
      this.misconceptionsMap.set(m.id, m);
    }

    // Index curriculum tree
    for (const mod of this.data.learning_track.modules || []) {
      // Check for module-level capstone
      if (mod.capstone) {
        this.assessmentsMap.set(mod.capstone.id, {
          ...mod.capstone,
          type: 'module_capstone',
          module_id: mod.id,
        });
      }

      for (const sm of mod.submodules || []) {
        for (const ch of sm.chapters || []) {
          const chId = ch.id || `CH${String(ch.number).padStart(2, '0')}`;
          this.chaptersMap.set(chId, { chapter: ch, submodule: sm, module: mod });
          this.chaptersMap.set(String(ch.number), { chapter: ch, submodule: sm, module: mod });
          this.chaptersMap.set(`CH${ch.number}`, { chapter: ch, submodule: sm, module: mod });

          for (const l of ch.lessons || []) {
            this.lessonsMap.set(l.id, {
              lesson: l,
              chapter: ch,
              submodule: sm,
              module: mod,
            });

            if (l.lesson_assessment) {
              this.assessmentsMap.set(l.lesson_assessment.id, {
                ...l.lesson_assessment,
                type: 'lesson_assessment',
                lesson_id: l.id,
              });
            }

            for (const ct of l.contents || []) {
              if (ct.final_quiz) {
                this.assessmentsMap.set(ct.final_quiz.id, {
                  ...ct.final_quiz,
                  type: 'content_final',
                  content_id: ct.id,
                  lesson_id: l.id,
                });
              }

              for (const g of ct.groups || []) {
                this.groupsMap.set(g.id, { group: g, content: ct, lesson: l });

                for (const it of g.items || []) {
                  this.itemsMap.set(it.id, { item: it, group: g, content: ct, lesson: l });

                  if (it.kind === 'quiz') {
                    this.assessmentsMap.set(it.id, {
                      ...it,
                      type: it.quiz_mode || 'group_quiz',
                      group_id: g.id,
                      content_id: ct.id,
                      lesson_id: l.id,
                    });
                  } else if (it.kind === 'challenge' || it.kind === 'capstone') {
                    this.assessmentsMap.set(it.id, {
                      ...it,
                      type: 'challenge',
                      group_id: g.id,
                      content_id: ct.id,
                      lesson_id: l.id,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log(
      `[CurriculumLoader] Indexed ${this.lessonsMap.size} lessons, ${this.groupsMap.size} groups, ${this.itemsMap.size} items, ${this.assessmentsMap.size} assessments.`
    );
  }

  // Getters
  getMeta() {
    return this.data.meta;
  }

  getModulesSummary() {
    return (this.data.learning_track.modules || []).map((m) => ({
      id: m.id,
      number: m.number,
      title: m.title,
      capstone_id: m.capstone?.id || null,
      submodules_count: (m.submodules || []).length,
      submodules: (m.submodules || []).map((sm: any) => ({
        id: sm.id,
        code: sm.code,
        title: sm.title,
        chapters: (sm.chapters || []).map((ch: any) => ({
          id: ch.id,
          number: ch.number,
          title: ch.title,
          lessons: (ch.lessons || []).map((l: any) => ({
            id: l.id,
            number: l.number,
            title: l.title,
            difficulty: l.difficulty,
            contents_count: (l.contents || []).length,
            groups_count: (l.contents || []).reduce((acc: number, c: any) => acc + (c.groups || []).length, 0),
            authoring_status: (l.contents || [])[0]?.groups?.[0]?.items?.[0]?.authoring_status || 'authored',
          })),
        })),
      })),
    }));
  }

  getChapter(chapterId: string) {
    const entry =
      this.chaptersMap.get(chapterId) ||
      this.chaptersMap.get(chapterId.toUpperCase()) ||
      this.chaptersMap.get(`CH${chapterId.padStart(2, '0')}`);
    if (!entry) return null;
    const { chapter, submodule, module } = entry;

    const combinedItems: any[] = [];
    for (const l of chapter.lessons || []) {
      for (const ct of l.contents || []) {
        for (const g of ct.groups || []) {
          for (const it of g.items || []) {
            combinedItems.push({
              ...it,
              lessonId: l.id,
              lessonNumber: l.number,
              lessonTitle: l.title,
              groupId: g.id,
              groupTitle: g.title,
              contentId: ct.id,
              contentTitle: ct.title,
            });
          }
        }
      }
    }

    const chId = chapter.id || `CH${String(chapter.number).padStart(2, '0')}`;
    return {
      id: chId,
      number: chapter.number,
      title: chapter.title,
      submodule: { id: submodule.id, code: submodule.code, title: submodule.title },
      module: { id: module.id, number: module.number, title: module.title },
      lessons: (chapter.lessons || []).map((l: any) => ({
        id: l.id,
        number: l.number,
        title: l.title,
        difficulty: l.difficulty,
        contents_count: (l.contents || []).length,
        groups_count: (l.contents || []).reduce((acc: number, c: any) => acc + (c.groups || []).length, 0),
        authoring_status: (l.contents || [])[0]?.groups?.[0]?.items?.[0]?.authoring_status || 'authored',
      })),
      items: combinedItems,
    };
  }

  getLesson(lessonId: string) {
    const entry =
      this.lessonsMap.get(lessonId) ||
      this.lessonsMap.get(lessonId.toUpperCase()) ||
      this.lessonsMap.get(`L${lessonId.padStart(2, '0')}`);
    if (!entry) return null;

    const combinedItems: any[] = [];
    for (const ct of entry.lesson.contents || []) {
      for (const g of ct.groups || []) {
        for (const it of g.items || []) {
          combinedItems.push({
            ...it,
            lessonId: entry.lesson.id,
            lessonNumber: entry.lesson.number,
            lessonTitle: entry.lesson.title,
            groupId: g.id,
            groupTitle: g.title,
            contentId: ct.id,
            contentTitle: ct.title,
          });
        }
      }
    }

    return {
      ...entry.lesson,
      items: combinedItems,
      chapter: { id: entry.chapter.id, number: entry.chapter.number, title: entry.chapter.title },
      submodule: { id: entry.submodule.id, code: entry.submodule.code, title: entry.submodule.title },
      module: { id: entry.module.id, number: entry.module.number, title: entry.module.title },
    };
  }

  getAllLessons() {
    return Array.from(this.lessonsMap.values()).map((entry) => ({
      id: entry.lesson.id,
      number: entry.lesson.number,
      title: entry.lesson.title,
      difficulty: entry.lesson.difficulty,
      lesson_assessment: entry.lesson.lesson_assessment,
      chapter: { id: entry.chapter.id, number: entry.chapter.number, title: entry.chapter.title },
      submodule: { id: entry.submodule.id, code: entry.submodule.code, title: entry.submodule.title },
      module: { id: entry.module.id, number: entry.module.number, title: entry.module.title },
      groups: (entry.lesson.contents || []).flatMap((c: any) => c.groups || []),
    }));
  }

  getGroup(groupId: string) {
    const entry = this.groupsMap.get(groupId);
    if (!entry) return null;
    return {
      ...entry.group,
      content: { id: entry.content.id, title: entry.content.title, objective: entry.content.objective },
      lesson: { id: entry.lesson.id, number: entry.lesson.number, title: entry.lesson.title },
    };
  }

  getItem(itemId: string) {
    return this.itemsMap.get(itemId)?.item || null;
  }

  getAssessment(assessmentId: string) {
    return this.assessmentsMap.get(assessmentId) || null;
  }

  getGlossary() {
    return Array.from(this.conceptsMap.values());
  }

  getMisconceptions() {
    return Array.from(this.misconceptionsMap.values());
  }

  getAssessmentIndex() {
    return this.data.evaluation_track.assessment_index || [];
  }

  getInteractionExamples() {
    return this.interactionExamples;
  }

  getRawData() {
    return this.data;
  }
}

export const curriculumLoader = new CurriculumLoader();
