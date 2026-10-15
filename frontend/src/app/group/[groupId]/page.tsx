import { Suspense, use } from 'react';
import GroupRunnerClient from './GroupRunnerClient';

export const metadata = {
  title: 'Group Runner — Learn Finance',
  description: 'Interactive card-by-card group runner.',
};

function GroupRunnerContainer({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = use(params);
  return <GroupRunnerClient groupId={groupId} />;
}

export default function GroupRunnerPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-zinc-400 text-sm">
          Loading interactive group player...
        </div>
      }
    >
      <GroupRunnerContainer params={params} />
    </Suspense>
  );
}
