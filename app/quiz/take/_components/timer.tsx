'use client';
import React, { useEffect, useState } from 'react';
export default function CountdownTimer({
  startTime,
  allotedTime,
}: {
  startTime: Date; // ISO format (e.g., "2025-08-30T12:00:00Z")
  allotedTime: number;
}) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const start=startTime.getTime();
    const end = start + allotedTime* 1000;

    const updateTimer = () => {
      const now = Date.now();

      // if not started yet
      if (now < start) {
        const diff = start - now;
        setTimeLeft(formatTime(diff, 'Starts in'));
      }
      // if already ended
      else if (now >= end) {
        setTimeLeft('Time Over ⏳');
      }
      // ongoing
      else {
        const diff = end - now;
        setTimeLeft(formatTime(diff, 'Time left'));
      }
    };

    updateTimer(); // run once immediately
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startTime, allotedTime]);

  return (
    <div className="text-xl font-bold text-red-600">
      {timeLeft}
    </div>
  );
}

// helper function
function formatTime(ms: number, prefix: string) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${prefix}: ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}