import React from "react";

type BackgroundGridProps = {
  variant?: 1 | 2 | 3;
};

type PathData = {
  d: string;
  w: string;
  delay: string;
  duration: string;
};

type NodeData = {
  cx: string;
  cy: string;
  r: string;
  delay: string;
};

const VARIANTS: Record<1 | 2 | 3, { paths: PathData[]; nodes: NodeData[] }> = {
  1: {
    paths: [
      {
        d: "M-100 150 C 300 100, 600 250, 1500 200",
        w: "1.2",
        delay: "0s",
        duration: "17s",
      },
      {
        d: "M-50 450 C 400 500, 800 400, 1500 450",
        w: "1.5",
        delay: "-3s",
        duration: "23s",
      },
      {
        d: "M-100 750 C 500 850, 900 650, 1500 800",
        w: "1.3",
        delay: "-7s",
        duration: "19s",
      },
      {
        d: "M300 -50 C 400 300, 200 600, 400 950",
        w: "1.1",
        delay: "-2s",
        duration: "29s",
      },
      {
        d: "M1100 -50 C 1000 400, 1200 700, 1100 950",
        w: "1.4",
        delay: "-11s",
        duration: "31s",
      },
    ],
    nodes: [
      { cx: "300", cy: "125", r: "2", delay: "0s" },
      { cx: "800", cy: "430", r: "1.5", delay: "-2s" },
      { cx: "500", cy: "780", r: "2.5", delay: "-5s" },
      { cx: "1150", cy: "480", r: "1.8", delay: "-1s" },
    ],
  },
  2: {
    paths: [
      {
        d: "M-100 -100 C 400 300, 1000 600, 1500 1000",
        w: "1.6",
        delay: "0s",
        duration: "23s",
      },
      {
        d: "M1500 -100 C 1100 300, 500 600, -100 1000",
        w: "1.4",
        delay: "-5s",
        duration: "19s",
      },
      {
        d: "M-100 900 C 400 600, 1000 300, 1500 0",
        w: "1.2",
        delay: "-13s",
        duration: "29s",
      },
      {
        d: "M720 -50 C 700 400, 740 600, 720 950",
        w: "1.5",
        delay: "-7s",
        duration: "17s",
      },
    ],
    nodes: [
      { cx: "720", cy: "450", r: "2.5", delay: "0s" },
      { cx: "350", cy: "250", r: "1.8", delay: "-3s" },
      { cx: "1050", cy: "650", r: "2", delay: "-6s" },
      { cx: "350", cy: "750", r: "1.5", delay: "-2s" },
    ],
  },
  3: {
    paths: [
      {
        d: "M100 950 C 150 600, 400 300, 900 -50",
        w: "1.4",
        delay: "0s",
        duration: "19s",
      },
      {
        d: "M500 950 C 550 500, 800 200, 1500 100",
        w: "1.3",
        delay: "-4s",
        duration: "23s",
      },
      {
        d: "M-50 600 C 300 550, 700 800, 1500 700",
        w: "1.5",
        delay: "-9s",
        duration: "31s",
      },
      {
        d: "M-50 200 C 500 300, 900 100, 1500 300",
        w: "1.1",
        delay: "-14s",
        duration: "17s",
      },
    ],
    nodes: [
      { cx: "250", cy: "650", r: "2", delay: "-1s" },
      { cx: "650", cy: "350", r: "2.2", delay: "-4s" },
      { cx: "1100", cy: "180", r: "1.7", delay: "-2s" },
      { cx: "1100", cy: "720", r: "2.5", delay: "-7s" },
    ],
  },
};

const PARTICLES = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  cx: (i * 137) % 1440,
  cy: (i * 97) % 900,
  r: 0.6 + ((i * 3) % 10) * 0.05,
  opacity: 0.3 + ((i * 7) % 5) * 0.1,
}));

export function BackgroundGrid({ variant = 1 }: BackgroundGridProps) {
  const currentVariant = VARIANTS[variant];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        .line-flow {
          stroke-dasharray: 200 400;
        }
        @keyframes flow {
          from { stroke-dashoffset: 600; }
          to { stroke-dashoffset: 0; }
        }
        
        .neon-pulse-soft {
          animation: pulse 4s ease-in-out infinite alternate;
        }
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.4; transform: scale(0.8); }
        }

        .particles circle {
          animation: float 13s ease-in-out infinite alternate, drift 19s linear infinite;
        }
        .particles circle:nth-child(even) {
          animation: float 17s ease-in-out infinite alternate-reverse, drift 23s linear infinite reverse;
        }
        .particles circle:nth-child(3n) {
          animation: float 11s ease-in-out infinite alternate, drift 29s linear infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
        @keyframes drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(15px); }
        }
      `}</style>

      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="glow-soft">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.45 0 0 0 0 1 0 0 0 0 0.72 0 0 0 0.9 0"
            result="coloredBlur"
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.45 0 0 0 0 1 0 0 0 0 0.72 0 0 0 1 0"
            result="coloredBlur"
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7CFFB2" stopOpacity="0" />
          <stop offset="20%" stopColor="#7CFFB2" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#8BFFB7" stopOpacity="1" />
          <stop offset="80%" stopColor="#7CFFB2" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7CFFB2" stopOpacity="0" />
        </linearGradient>

        {currentVariant.paths.map((path, i) => (
          <path
            key={`path-${i}`}
            d={path.d}
            stroke="url(#line-gradient)"
            strokeWidth={path.w}
            strokeLinecap="round"
            filter="url(#glow-soft)"
            opacity="0.6"
            className="line-flow"
            style={{
              animation: `flow ${path.duration} linear infinite`,
              animationDelay: path.delay,
            }}
          />
        ))}

        {currentVariant.nodes.map((node, i) => (
          <circle
            key={`node-${i}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="#8BFFB7"
            filter="url(#glow-strong)"
            className="neon-pulse-soft"
            style={{ animationDelay: node.delay }}
          />
        ))}

        <g className="particles">
          {PARTICLES.map((p) => (
            <circle
              key={p.id}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill="#C6FFD9"
              fillOpacity={p.opacity}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
