import { Router, Request, Response } from 'express';
import { curriculumLoader } from '../data/curriculumLoader';

const router = Router();

// GET /api/curriculum/meta
router.get('/meta', (_req: Request, res: Response) => {
  res.json({
    meta: curriculumLoader.getMeta(),
    counts: curriculumLoader.getRawData().validation_report?.counts || {},
  });
});

// GET /api/curriculum/modules
router.get('/modules', (_req: Request, res: Response) => {
  res.json({
    modules: curriculumLoader.getModulesSummary(),
  });
});

// GET /api/curriculum/chapters/:chapterId
router.get('/chapters/:chapterId', (req: Request, res: Response) => {
  const { chapterId } = req.params;
  const chapter = curriculumLoader.getChapter(chapterId);
  if (!chapter) {
    return res.status(404).json({ error: `Chapter ${chapterId} not found` });
  }
  res.json({ chapter });
});

// GET /api/curriculum/lessons
router.get('/lessons', (_req: Request, res: Response) => {
  res.json({
    lessons: curriculumLoader.getAllLessons(),
  });
});

// GET /api/curriculum/lessons/:lessonId
router.get('/lessons/:lessonId', (req: Request, res: Response) => {
  const { lessonId } = req.params;
  const lesson = curriculumLoader.getLesson(lessonId);
  if (!lesson) {
    return res.status(404).json({ error: `Lesson ${lessonId} not found` });
  }
  res.json({ lesson });
});

// GET /api/curriculum/groups/:groupId
router.get('/groups/:groupId', (req: Request, res: Response) => {
  const { groupId } = req.params;
  const group = curriculumLoader.getGroup(groupId);
  if (!group) {
    return res.status(404).json({ error: `Group ${groupId} not found` });
  }
  res.json({ group });
});

// GET /api/curriculum/items/:itemId
router.get('/items/:itemId', (req: Request, res: Response) => {
  const { itemId } = req.params;
  const item = curriculumLoader.getItem(itemId);
  if (!item) {
    return res.status(404).json({ error: `Item ${itemId} not found` });
  }
  res.json({ item });
});

// GET /api/curriculum/assessments/:assessmentId
router.get('/assessments/:assessmentId', (req: Request, res: Response) => {
  const { assessmentId } = req.params;
  const assessment = curriculumLoader.getAssessment(assessmentId);
  if (!assessment) {
    return res.status(404).json({ error: `Assessment ${assessmentId} not found` });
  }
  res.json({ assessment });
});

// GET /api/curriculum/glossary
router.get('/glossary', (_req: Request, res: Response) => {
  res.json({
    concepts: curriculumLoader.getGlossary(),
  });
});

// GET /api/curriculum/misconceptions
router.get('/misconceptions', (_req: Request, res: Response) => {
  res.json({
    misconceptions: curriculumLoader.getMisconceptions(),
  });
});

// GET /api/curriculum/interaction-examples
router.get('/interaction-examples', (_req: Request, res: Response) => {
  res.json({
    examples: curriculumLoader.getInteractionExamples(),
  });
});

export default router;
