import { Suspense, use } from 'react';
import LessonOverviewClient from './LessonOverviewClient';

export const metadata = {
  title: 'Lesson Overview — Learn Finance',
  description: 'Lesson curriculum details and learning units.',
};

function LessonOverviewContainer({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  return <LessonOverviewClient lessonId={lessonId} />;
}

export default function LessonOverviewPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-zinc-400 text-sm">
          Loading lesson overview...
        </div>
      }
    >
      <LessonOverviewContainer params={params} />
    </Suspense>
  );
}
