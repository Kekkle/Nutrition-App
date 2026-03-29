import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MODULES } from "../../content/modules";
import { useProgressStore } from "../../stores/progressStore";
import { asset } from "../../utils/asset";
import type { Module, UserProgress } from "../../types";

const NODE_IMAGES: Record<string, string> = {
  "m1-n1": asset("/images/celly-character.png"),
  "m1-n2": asset("/images/charger-character.png"),
  "m1-n3": asset("/images/body-outline.png"),
  "m1-n4": asset("/images/banana-sunglasses.png"),
  "m1-n5": asset("/images/mystery-box.png"),
  "m1-n6": asset("/images/mystery-box.png"),
};

const CHECKPOINT_COLORS = [
  "#E84393",
  "#F39C12",
  "#9B59B6",
  "#2ECC71",
  "#E74C3C",
  "#3498DB",
  "#1ABC9C",
];

const VB_W = 300;
const NODE_GAP = 155;
const NODE_START_Y = 55;
const ROAD_LEFT_X = VB_W * 0.30;
const ROAD_RIGHT_X = VB_W * 0.70;

function roadPos(index: number) {
  const y = NODE_START_Y + index * NODE_GAP;
  const isRight = index % 2 === 0;
  return { x: isRight ? ROAD_RIGHT_X : ROAD_LEFT_X, y };
}

const NODE_Y_SHIFT = 12;

function nodePos(index: number) {
  const rp = roadPos(index);
  const isRight = index % 2 === 0;
  return { ...rp, y: rp.y + NODE_Y_SHIFT, side: (isRight ? "right" : "left") as "right" | "left" };
}

function buildRoadPath(count: number) {
  if (count < 1) return "";
  const pts = Array.from({ length: count }, (_, i) => roadPos(i));
  const first = pts[0]!;

  let d = `M ${first.x} ${first.y - 35} L ${first.x} ${first.y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1]!;
    const c = pts[i]!;
    const midY = (p.y + c.y) / 2;
    d += ` C ${p.x} ${midY}, ${c.x} ${midY}, ${c.x} ${c.y}`;
  }
  const last = pts[pts.length - 1]!;
  d += ` L ${last.x} ${last.y + 35}`;
  return d;
}

function getCurrentNodeId(progress: UserProgress): string | null {
  const mod = MODULES.find((m) => m.id === progress.currentModuleId);
  if (!mod) return null;
  const visible = mod.nodes.filter((n) => !n.hidden);
  return visible[progress.currentNodeIndex]?.id ?? null;
}

function nodeStatus(
  nodeId: string,
  progress: UserProgress,
  currentId: string | null,
): "locked" | "current" | "completed" {
  const record = progress.nodes[nodeId];
  if (record?.completed) return "completed";
  if (currentId !== null && nodeId === currentId) return "current";
  return "locked";
}

function StarDots({ count }: { count: number }) {
  const n = Math.min(3, Math.max(0, Math.floor(count)));
  return (
    <div className="mt-0.5 flex justify-center gap-0.5" aria-label={`${n} of 3 stars`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`text-[10px] leading-none ${i < n ? "text-amber-300" : "text-white/30"}`} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

function ModuleHeader({ module }: { module: Module }) {
  const isFirst = module.id === "module-1";

  return (
    <div
      className="relative mb-8 flex items-center gap-3 rounded-2xl border-4 px-4 py-3 shadow-[4px_4px_0_0_rgba(45,52,54,0.08)]"
      style={{
        background: `linear-gradient(135deg, ${module.color}22, var(--color-surface-raised))`,
        borderColor: `${module.color}55`,
      }}
    >
      {isFirst ? (
        <img
          src={asset("/images/celly-character.png")}
          alt="Celly"
          className="absolute -left-3 -top-8 z-10 h-[5.5rem] w-[5.5rem] object-contain drop-shadow-xl"
        />
      ) : (
        <span className="text-4xl" aria-hidden>
          {module.icon}
        </span>
      )}
      <h2 className={`font-display text-xl leading-tight text-text ${isFirst ? "ml-[4.5rem]" : ""}`}>
        {module.title}
      </h2>
    </div>
  );
}

export default function LearningPath() {
  const navigate = useNavigate();
  const progress = useProgressStore((s) => s.progress);
  const loaded = useProgressStore((s) => s.loaded);
  const currentRef = useRef<HTMLButtonElement | null>(null);
  const currentNodeId = getCurrentNodeId(progress);

  useEffect(() => {
    if (!loaded || !currentRef.current) return;
    const el = currentRef.current;
    const scrollContainer = el.closest("main");
    if (!scrollContainer) return;

    const t = window.setTimeout(() => {
      const elRect = el.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const offset = elRect.top - containerRect.top + scrollContainer.scrollTop;
      const margin = scrollContainer.clientHeight - 160;
      scrollContainer.scrollTo({
        top: Math.max(0, offset - margin),
        behavior: "smooth",
      });
    }, 150);
    return () => window.clearTimeout(t);
  }, [loaded, currentNodeId]);

  return (
    <div className="min-h-full bg-gradient-to-b from-surface via-primary/[0.04] to-secondary/[0.06] pb-16 pt-6">
      <div className="mx-auto max-w-md px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="mb-10 text-center"
        >
          <h1 className="font-display text-3xl text-text">Your learning path</h1>
          <p className="mt-2 font-body text-sm text-text-muted">
            Tap the glowing step to keep going!
          </p>
        </motion.header>

        {MODULES.map((module, moduleIndex) => {
          const nodes = module.nodes.filter((n) => !n.hidden);

          if (nodes.length === 0) {
            return (
              <motion.section
                key={module.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4"
              >
                <ModuleHeader module={module} />
                <p className="px-2 text-center font-body text-sm text-text-muted">
                  Lessons coming soon — check back later!
                </p>
              </motion.section>
            );
          }

          const totalH = NODE_START_Y + (nodes.length - 1) * NODE_GAP + 90;
          const roadPath = buildRoadPath(nodes.length);

          return (
            <motion.section
              key={module.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28, delay: moduleIndex * 0.06 }}
              className="mb-8"
            >
              <ModuleHeader module={module} />

              <div className="relative" style={{ aspectRatio: `${VB_W} / ${totalH}` }}>
                {/* Road SVG */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox={`0 0 ${VB_W} ${totalH}`}
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden
                >
                  <path
                    d={roadPath}
                    fill="none"
                    stroke="#2d3436"
                    strokeWidth="34"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.25"
                  />
                  <path
                    d={roadPath}
                    fill="none"
                    stroke="#3d3d3d"
                    strokeWidth="28"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={roadPath}
                    fill="none"
                    stroke="#4d4d4d"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={roadPath}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="8 10"
                    strokeLinecap="round"
                    opacity="0.45"
                  />
                </svg>

                {/* Checkpoint nodes */}
                {nodes.map((node, i) => {
                  const pos = nodePos(i);
                  const status = nodeStatus(node.id, progress, currentNodeId);
                  const stars = progress.nodes[node.id]?.stars ?? 0;
                  const color = CHECKPOINT_COLORS[i % CHECKPOINT_COLORS.length];
                  const imageUrl = NODE_IMAGES[node.id];
                  const locked = status === "locked";
                  const isCurrent = status === "current";
                  const completed = status === "completed";
                  const delay = i * 0.06;

                  return (
                    <div
                      key={node.id}
                      className="absolute flex flex-col"
                      style={{
                        left: `${(pos.x / VB_W) * 100}%`,
                        top: `${(pos.y / totalH) * 100}%`,
                        transform: pos.side === "right"
                          ? "translateY(-50%)"
                          : "translate(-100%, -50%)",
                        alignItems: "center",
                      }}
                    >
                      {/* Location marker — pin tip anchored at road center */}
                      <motion.button
                        ref={isCurrent ? currentRef : undefined}
                        type="button"
                        disabled={locked}
                        onClick={() => {
                          if (!locked) navigate(`/lesson/${node.id}`);
                        }}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={
                          isCurrent
                            ? { opacity: 1, scale: [1, 1.1, 1] }
                            : { opacity: 1, scale: 1 }
                        }
                        transition={
                          isCurrent
                            ? {
                                opacity: { duration: 0.3, delay },
                                scale: { repeat: Infinity, duration: 1.4, ease: "easeInOut" as const },
                              }
                            : { type: "spring", stiffness: 380, damping: 26, delay }
                        }
                        className={`relative flex shrink-0 items-center outline-none focus-visible:ring-4 focus-visible:ring-primary/40 ${
                          locked ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        style={{
                          filter: locked ? "grayscale(1) opacity(0.5)" : "none",
                          flexDirection: pos.side === "right" ? "row" : "row-reverse",
                          scrollMarginTop: "6rem",
                        }}
                      >
                        {/* Pin pointer — tip at road center */}
                        <div
                          className="h-0 w-0 shrink-0"
                          style={{
                            borderTop: "10px solid transparent",
                            borderBottom: "10px solid transparent",
                            ...(pos.side === "left"
                              ? { borderLeft: `14px solid ${locked ? "#d1d5db" : color}`, marginRight: "-3px" }
                              : { borderRight: `14px solid ${locked ? "#d1d5db" : color}`, marginLeft: "-3px" }),
                            filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))",
                          }}
                        />
                        <div className="flex flex-col items-center">
                          <div
                            className={`relative flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border-[5px] shadow-xl ${
                              locked ? "border-gray-300 bg-gray-200" : "border-white"
                            }`}
                            style={
                              locked
                                ? {}
                                : {
                                    backgroundColor: color,
                                    boxShadow: `0 0 0 3px ${color}44, 0 6px 20px -4px ${color}88`,
                                  }
                            }
                          >
                            {locked ? (
                              <span className="text-2xl text-gray-400" aria-hidden>🔒</span>
                            ) : imageUrl ? (
                              <img src={imageUrl} alt="" className="h-11 w-11 object-contain drop-shadow-sm" />
                            ) : (
                              <span className="font-display text-xl font-bold text-white">{i + 1}</span>
                            )}
                            {completed && (
                              <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-success text-[10px] font-bold text-white shadow-md">
                                ✓
                              </span>
                            )}
                          </div>
                          {completed && <StarDots count={stars} />}
                        </div>
                      </motion.button>

                      {/* Title label — directly below */}
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: delay + 0.1 }}
                        className={`mt-1 max-w-[8rem] text-center font-display text-sm leading-tight ${
                          locked ? "text-text-muted" : isCurrent ? "font-bold text-text" : "text-text"
                        }`}
                      >
                        {node.title}
                      </motion.p>
                    </div>
                  );
                })}
              </div>

              {moduleIndex < MODULES.length - 1 && (
                <div
                  className="mx-auto mt-6 h-1 max-w-xs rounded-full bg-gradient-to-r from-transparent via-text-muted/25 to-transparent"
                  role="presentation"
                />
              )}
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
