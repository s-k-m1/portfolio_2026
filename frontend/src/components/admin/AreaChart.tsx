"use client";

import { useId } from "react";

export interface ChartPoint {
  label: string;
  value: number;
}

export default function AreaChart({
  data,
  height = 220,
  color = "#10b981",
}: {
  data: ChartPoint[];
  height?: number;
  color?: string;
}) {
  const gid = useId().replace(/:/g, "");
  const W = 600;
  const H = height;
  const padX = 30;
  const padY = 20;
  const max = Math.max(1, ...data.map((d) => d.value));
  const n = data.length;
  const stepX = n > 1 ? (W - padX * 2) / (n - 1) : 0;

  const pts = data.map((d, i) => ({
    x: padX + (n > 1 ? i * stepX : W / 2),
    y: padY + (H - padY * 2) * (1 - d.value / max),
    label: d.label,
    value: d.value,
  }));

  const line = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const last = pts[pts.length - 1];
  const first = pts[0];
  const area = `${line} L${last.x.toFixed(1)},${H - padY} L${first.x.toFixed(1)},${H - padY} Z`;
  const grid = [0.25, 0.5, 0.75, 1].map((f) => padY + (H - padY * 2) * (1 - f));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height }}
      role="img"
      aria-label="Trend chart"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {grid.map((y, i) => (
        <line
          key={i}
          x1={padX}
          y1={y}
          x2={W - padX}
          y2={y}
          stroke="#d4e0d8"
          strokeWidth={1}
          strokeDasharray="3 5"
        />
      ))}

      <path d={area} fill={`url(#${gid})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={3.5} fill="#fff" stroke={color} strokeWidth={2} />
        </g>
      ))}

      {pts.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={H - 4}
          textAnchor="middle"
          fontSize={10}
          fill="#5d6b7a"
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
}
