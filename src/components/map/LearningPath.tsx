import { Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MODULES } from "../../content/modules";
import { useProgressStore } from "../../stores/progressStore";
import type { LessonNode, UserProgress } from "../../types";
import PathNode from "./PathNode";

type TrailSide = "left" | "center" | "right";

function zigzagSide(i: number): TrailSide {
  const m = i % 4;
  if (m === 0 || m === 2) return "center";
  if (m === 1) return "right";
  return "left";
}

function trailTranslate(side: TrailSide): string {
  switch (side) {
    case "left":
      return "-translate-x-14 sm:-translate-x-20";
    case "right":
      return "translate-x-14 sm:translate-x-20";
    default:
      return "translate-x-0";
  }
}

/** Approximate horizontal anchor (% of trail width) for dotted curve */
function trailXPercent(side: TrailSide): number {
  switch (side) {
    case "left":
      return 34;
    case "right":
      return 66;
    default:
      return 50;
  }
}

function PathSegment({
  from,
  to,
  color,
}: {
  from: TrailSide;
  to: TrailSide;
  color: string;
}) {
  const x1 = trailXPercent(from);
  const x2 = trailXPercent(to);
  return (
    <svg
      className="h-14 w-full shrink-0 text-text-muted/35"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={`M ${x1} 0 C ${x1} 35, ${x2} 65, ${x2} 100`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeDasharray="5 8"
        strokeLinecap="round"
        style={{ color }}
      />
    </svg>
  );
}

const NODE_IMAGES: Record<string, string> = {
  "m1-n1": "/images/celly-character.png",
  "m1-n2": "/images/charger-character.png",
};

function nodeEmoji(node: LessonNode): string {
  const g = node.game;
  if ("items" in g && g.items[0]?.icon) return g.items[0].icon;
  return "📚";
}

function getCurrentNodeId(progress: UserProgress): string | null {
  const mod = MODULES.find((m) => m.id === progress.currentModuleId);
  if (!mod) return null;
  return mod.nodes[progress.currentNodeIndex]?.id ?? null;
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

export default function LearningPath() {
  const navigate = useNavigate();
  const progress = useProgressStore((s) => s.progress);
  const loaded = useProgressStore((s) => s.loaded);
  const currentRef = useRef<HTMLButtonElement | null>(null);

  const currentNodeId = getCurrentNodeId(progress);

  const staggerOffsetByModule = MODULES.map((_, i) =>
    MODULES.slice(0, i).reduce((sum, m) => sum + m.nodes.length, 0),
  );

  useEffect(() => {
    if (!loaded || !currentRef.current) return;
    const t = window.setTimeout(() => {
      currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
    return () => window.clearTimeout(t);
  }, [loaded, currentNodeId]);

  return (
    <div className="min-h-full bg-gradient-to-b from-surface via-primary/[0.06] to-secondary/[0.08] pb-16 pt-6">
      <div className="mx-auto max-w-md px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="mb-10 text-center"
        >
          <h1 className="font-display text-3xl text-text">Your learning path</h1>
          <p className="font-body mt-2 text-sm text-text-muted">
            Tap the glowing step to keep going!
          </p>
        </motion.header>

        {MODULES.map((module, moduleIndex) => {
          const moduleComplete = progress.completedModules.includes(module.id);
          const nodes = module.nodes;
          const moduleStaggerStart = staggerOffsetByModule[moduleIndex] ?? 0;

          const section = (
            <motion.section
              key={module.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
                delay: moduleIndex * 0.06,
              }}
              className="mb-4"
            >
              <div
                className="mb-6 flex items-center gap-3 rounded-2xl border-4 border-text/10 px-4 py-3 shadow-[4px_4px_0_0_rgba(45,52,54,0.08)]"
                style={{
                  background: `linear-gradient(135deg, ${module.color}22, var(--color-surface-raised))`,
                  borderColor: `${module.color}55`,
                }}
              >
                <span className="text-4xl" aria-hidden>
                  {module.icon}
                </span>
                <h2 className="font-display text-xl leading-tight text-text">{module.title}</h2>
              </div>

              {nodes.length === 0 ? (
                <p className="font-body px-2 text-center text-sm text-text-muted">
                  Lessons coming soon — check back later!
                </p>
              ) : (
                <div className="relative mx-auto max-w-[280px]">
                  {nodes.map((node, i) => {
                    const side = zigzagSide(i);
                    const status = nodeStatus(node.id, progress, currentNodeId);
                    const stars = progress.nodes[node.id]?.stars ?? 0;
                    const assignRef = status === "current";
                    const isLast = i === nodes.length - 1;
                    const staggerIndex = moduleStaggerStart + i;

                    const row = (
                      <div
                        className={`flex w-full justify-center ${trailTranslate(side)} transition-transform`}
                      >
                        <PathNode
                          ref={assignRef ? currentRef : undefined}
                          title={node.title}
                          status={status}
                          stars={stars}
                          moduleColor={module.color}
                          icon={nodeEmoji(node)}
                          imageUrl={NODE_IMAGES[node.id]}
                          index={staggerIndex}
                          onClick={() => {
                            if (status === "locked") return;
                            navigate(`/lesson/${node.id}`);
                          }}
                        />
                      </div>
                    );

                    if (isLast) {
                      return (
                        <Fragment key={node.id}>
                          {row}
                        </Fragment>
                      );
                    }

                    const nextSide = zigzagSide(i + 1);
                    return (
                      <Fragment key={node.id}>
                        {row}
                        <PathSegment from={side} to={nextSide} color={module.color} />
                      </Fragment>
                    );
                  })}
                </div>
              )}

              {moduleIndex < MODULES.length - 1 &&
                (moduleComplete ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="mx-auto mt-8 flex max-w-xs justify-center"
                  >
                    <div className="font-display flex items-center gap-2 rounded-full border-4 border-success/40 bg-success/15 px-5 py-2 text-sm text-success">
                      <span aria-hidden>🏅</span>
                      Module complete!
                    </div>
                  </motion.div>
                ) : (
                  <div
                    className="mx-auto mt-10 h-1 max-w-xs rounded-full bg-gradient-to-r from-transparent via-text-muted/25 to-transparent"
                    role="presentation"
                  />
                ))}
            </motion.section>
          );

          return section;
        })}
      </div>
    </div>
  );
}
