import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MODULES } from "../../content/modules";
import type { LessonNode } from "../../types";
import ProgressBar from "../layout/ProgressBar";
import Button from "../ui/Button";
import AnimatedPanel from "./AnimatedPanel";

function findLessonNode(nodeId: string): LessonNode | undefined {
  for (const mod of MODULES) {
    const node = mod.nodes.find((n) => n.id === nodeId);
    if (node) return node;
  }
  return undefined;
}

export default function LessonPlayer() {
  const { nodeId } = useParams<{ nodeId: string }>();
  const navigate = useNavigate();
  const node = useMemo(
    () => (nodeId ? findLessonNode(nodeId) : undefined),
    [nodeId],
  );

  const panels = node?.panels ?? [];
  const [panelIndex, setPanelIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setPanelIndex(0);
    setDirection(1);
  }, [nodeId]);

  useEffect(() => {
    if (!nodeId || !node || panels.length === 0) {
      navigate("/", { replace: true });
    }
  }, [nodeId, node, panels.length, navigate]);

  const goNext = useCallback(() => {
    if (!nodeId || panels.length === 0) return;
    if (panelIndex >= panels.length - 1) {
      navigate(`/game/${nodeId}`);
      return;
    }
    setDirection(1);
    setPanelIndex((i) => i + 1);
  }, [nodeId, panelIndex, panels.length, navigate]);

  const goPrev = useCallback(() => {
    if (panelIndex <= 0) return;
    setDirection(-1);
    setPanelIndex((i) => i - 1);
  }, [panelIndex]);

  const exitToMap = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (!node || panels.length === 0) {
    return null;
  }

  const currentPanel = panels[panelIndex]!;
  const isFirst = panelIndex === 0;
  const isLast = panelIndex === panels.length - 1;

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col bg-surface-raised">
      <header className="flex shrink-0 items-center gap-3 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top,0px))]">
        <button
          type="button"
          onClick={exitToMap}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-text/10 bg-surface-raised font-body text-text-muted transition hover:border-primary/30 hover:bg-primary-light/15 hover:text-primary"
          aria-label="Back to learning path"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="min-w-0 flex-1 space-y-1.5">
          <ProgressBar
            current={panelIndex + 1}
            total={panels.length}
            color="primary"
            size="md"
          />
          <p className="text-center font-body text-xs font-semibold text-text-muted">
            {panelIndex + 1} / {panels.length}
          </p>
        </div>
        <div className="w-11 shrink-0" aria-hidden />
      </header>

      <div
        className="min-h-0 flex-1 cursor-pointer px-4 pb-2 pt-1 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised"
        onClick={goNext}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goNext();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={
          isLast
            ? "Go to game"
            : `Next panel: ${panelIndex + 2} of ${panels.length}`
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          <AnimatedPanel
            key={currentPanel.id}
            panel={currentPanel}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      <footer className="shrink-0 space-y-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-2">
        <motion.p
          className="pointer-events-none text-center font-body text-sm font-medium text-text-muted"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Tap the panel to continue
        </motion.p>
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <Button
            type="button"
            variant="secondary"
            size="md"
            disabled={isFirst}
            onClick={goPrev}
            className="min-w-[6.5rem]"
          >
            Back
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={goNext}
            className="min-w-[6.5rem]"
          >
            {isLast ? "Start game" : "Next"}
          </Button>
        </div>
      </footer>
    </div>
  );
}
