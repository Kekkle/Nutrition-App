import type { AvatarConfig } from "../../types";

const VIEW = 120;
const STROKE = 2.5;
const OUTLINE = "#2D3436";

const BODY_PATHS: string[] = [
  // 0: round blob
  "M 60 20 C 90 20 101 45 101 62 C 101 86 84 99 60 99 C 36 99 19 86 19 62 C 19 45 30 20 60 20 Z",
  // 1: taller oval blob
  "M 60 14 C 82 14 94 38 94 60 C 94 88 78 104 60 104 C 42 104 26 88 26 60 C 26 38 38 14 60 14 Z",
  // 2: wider / squatter blob
  "M 60 34 C 98 34 108 50 108 62 C 108 78 88 94 60 94 C 32 94 12 78 12 62 C 12 50 22 34 60 34 Z",
  // 3: bean-shaped blob
  "M 48 28 C 68 20 92 32 96 54 C 100 76 82 94 58 94 C 40 94 24 82 22 64 C 20 46 28 34 48 28 Z",
];

function normIndex(n: number, len: number): number {
  const x = Math.floor(Number.isFinite(n) ? n : 0);
  return ((x % len) + len) % len;
}

function Eyes({ style }: { style: number }) {
  const s = normIndex(style, 4);

  if (s === 0) {
    return (
      <g aria-hidden>
        <circle cx={50} cy={54} r={4} fill={OUTLINE} />
        <circle cx={70} cy={54} r={4} fill={OUTLINE} />
      </g>
    );
  }

  if (s === 1) {
    return (
      <g aria-hidden>
        <circle cx={50} cy={54} r={9} fill={OUTLINE} stroke={OUTLINE} strokeWidth={STROKE * 0.6} />
        <circle cx={70} cy={54} r={9} fill={OUTLINE} stroke={OUTLINE} strokeWidth={STROKE * 0.6} />
        <circle cx={52} cy={52} r={2.8} fill="#FFFFFF" />
        <circle cx={72} cy={52} r={2.8} fill="#FFFFFF" />
        <circle cx={53} cy={55} r={1.2} fill="#FFFFFF" opacity={0.9} />
        <circle cx={73} cy={55} r={1.2} fill="#FFFFFF" opacity={0.9} />
      </g>
    );
  }

  if (s === 2) {
    return (
      <g aria-hidden fill="none" stroke={OUTLINE} strokeWidth={STROKE} strokeLinecap="round">
        <path d="M 43 56 Q 50 48 57 56" />
        <path d="M 63 56 Q 70 48 77 56" />
      </g>
    );
  }

  // 3: wide excited
  return (
    <g aria-hidden>
      <ellipse cx={46} cy={52} rx={9} ry={11} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={STROKE} />
      <ellipse cx={74} cy={52} rx={9} ry={11} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={STROKE} />
      <ellipse cx={46} cy={52} rx={5} ry={7} fill={OUTLINE} />
      <ellipse cx={74} cy={52} rx={5} ry={7} fill={OUTLINE} />
      <circle cx={44} cy={49} r={2} fill="#FFFFFF" />
      <circle cx={72} cy={49} r={2} fill="#FFFFFF" />
    </g>
  );
}

function Accessory({ kind }: { kind: number }) {
  const k = normIndex(kind, 4);
  if (k === 0) return null;

  if (k === 1) {
    return (
      <g aria-hidden stroke={OUTLINE} strokeWidth={STROKE} strokeLinejoin="round">
        <path
          d="M 42 30 L 45 10 L 54 20 L 60 6 L 66 20 L 75 10 L 78 30 L 60 26 Z"
          fill="#FDCB6E"
        />
        <path d="M 42 30 L 60 26 L 78 30" fill="none" />
      </g>
    );
  }

  if (k === 2) {
    return (
      <g aria-hidden stroke={OUTLINE} strokeWidth={STROKE * 0.8} strokeLinejoin="round">
        <ellipse cx={52} cy={22} rx={8} ry={6} fill="#FD79A8" />
        <ellipse cx={68} cy={22} rx={8} ry={6} fill="#FD79A8" />
        <circle cx={60} cy={22} r={4} fill="#E84393" />
      </g>
    );
  }

  // 3: headband + antennae
  return (
    <g aria-hidden stroke={OUTLINE} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 32 38 Q 60 30 88 38" fill="none" />
      <line x1={38} y1={36} x2={38} y2={14} />
      <line x1={82} y1={36} x2={82} y2={14} />
      <circle cx={38} cy={10} r={6} fill="#A29BFE" />
      <circle cx={82} cy={10} r={6} fill="#4ECDC4" />
    </g>
  );
}

export interface AvatarDisplayProps {
  config: AvatarConfig;
  size?: number;
}

export default function AvatarDisplay({ config, size = 120 }: AvatarDisplayProps) {
  const shape = normIndex(config.shape, BODY_PATHS.length);
  const path = BODY_PATHS[shape];
  const eyeStyle = normIndex(config.eyeStyle, 4);
  const accessory = normIndex(config.accessory, 4);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      role="img"
      aria-label={`Buddy avatar: ${config.name || "unnamed"}`}
      className="shrink-0 select-none"
    >
      <title>{config.name ? `${config.name}'s buddy` : "Buddy"}</title>
      <ellipse cx={60} cy={108} rx={36} ry={7} fill="#000000" opacity={0.12} />
      <path
        d={path}
        fill={config.color}
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <Eyes style={eyeStyle} />
      <Accessory kind={accessory} />
    </svg>
  );
}
