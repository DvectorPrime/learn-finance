import { Suspense, use } from 'react';
import ChapterPlayerClient from './ChapterPlayerClient';

export const metadata = {
  title: 'Chapter Interactive Study — Learn Finance',
  description: 'Duolingo-style unified chapter learning flow.',
};

function ChapterContainer({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = use(params);
  return <ChapterPlayerClient chapterId={chapterId} />;
}

export default function ChapterPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh] text-zinc-400 text-sm">
          Loading chapter...
        </div>
      }
    >
      <ChapterContainer params={params} />
    </Suspense>
  );
}
