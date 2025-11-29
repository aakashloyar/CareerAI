'use client';

import { useParams } from 'next/navigation';

type RouteParams = {
  submissionId: string;
};

export default function TakePage() {
  const { submissionId } = useParams() as RouteParams;
  return (
    <div>
      {/* <TakeClient /> */}
    </div>
  );
}
