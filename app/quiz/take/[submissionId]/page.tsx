'use client';

import { useParams } from 'next/navigation';

type RouteParams = {
  quizId: string;
};

export default function TakePage() {
  const { quizId } = useParams() as RouteParams;
  return (
    <div>
      {/* <TakeClient /> */}
    </div>
  );
}
