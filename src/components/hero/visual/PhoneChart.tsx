"use client";

import { startTransition, useEffect, useRef, useState } from "react";

const POINT_COUNT = 24;
const VIEWBOX_WIDTH = 210;
const STEP_X = VIEWBOX_WIDTH / (POINT_COUNT - 1);
const MIN_Y = 8;
const MAX_Y = 58;
const HEARTBEAT_PATTERN = [
  38, 38, 37, 38, 39, 38, 37, 38, 36, 34, 40, 26, 50, 10, 56, 30, 36, 38, 38,
  37, 38, 39, 38, 37, 38, 36, 37, 38,
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getSample(index: number) {
  const baseValue = HEARTBEAT_PATTERN[index % HEARTBEAT_PATTERN.length];
  const jitter =
    baseValue >= 34 && baseValue <= 40 ? Math.round((Math.random() - 0.5) * 2) : 0;

  return clamp(baseValue + jitter, MIN_Y, MAX_Y);
}

function createInitialPoints() {
  return Array.from({ length: POINT_COUNT }, (_, index) => getSample(index));
}

export function PhoneChart() {
  const phaseRef = useRef(POINT_COUNT);
  const [yPoints, setYPoints] = useState(createInitialPoints);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      startTransition(() => {
        setYPoints((current) => [
          ...current.slice(1),
          getSample(phaseRef.current++),
        ]);
      });
    }, 160);

    return () => window.clearInterval(intervalId);
  }, []);

  const chartPoints = yPoints
    .map((y, index) => `${(index * STEP_X).toFixed(1)},${y}`)
    .join(" ");
  const lastPointX = ((POINT_COUNT - 1) * STEP_X).toFixed(1);
  const lastPointY = yPoints[yPoints.length - 1];

  return (
    <svg
      viewBox="0 0 210 72"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 62H210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <path d="M0 42H210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <path d="M0 22H210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      <polyline
        points={chartPoints}
        stroke="rgba(57,236,130,0.22)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={chartPoints}
        stroke="#39ec82"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx={lastPointX}
        cy={lastPointY}
        r="5.5"
        fill="rgba(57,236,130,0.16)"
      />
      <circle cx={lastPointX} cy={lastPointY} r="2.7" fill="#39ec82" />
    </svg>
  );
}
