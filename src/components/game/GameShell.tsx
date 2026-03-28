import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MODULES } from "../../content/modules";
import { useProgressStore } from "../../stores/progressStore";
import type { LessonNode } from "../../types";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import StarRating from "../ui/StarRating";
import CatcherGame from "./CatcherGame";
import DragDrop from "./DragDrop";
import MultipleChoice from "./MultipleChoice";
import SnakeGame from "./SnakeGame";
import SnakeCollect from "./SnakeCollect";

function findLessonNode(nodeId: string): LessonNode | undefined {
  for (const mod of MODULES) {
    const node = mod.nodes.find((n) => n.id === nodeId);
    if (node) return node;
  }
  return undefined;
}

const CONFETTI_PIECES = [
  { emoji: "🎊", x: "8%", delay: 0 },
  { emoji: "✨", x: "22%", delay: 0.05 },
  { emoji: "⭐", x: "38%", delay: 0.1 },
  { emoji: "🌟", x: "52%", delay: 0.02 },
  { emoji: "💜", x: "68%", delay: 0.12 },
  { emoji: "🎉", x: "82%", delay: 0.08 },
  { emoji: "✨", x: "15%", delay: 0.15 },
  { emoji: "⭐", x: "45%", delay: 0.18 },
  { emoji: "🎊", x: "75%", delay: 0.06 },
  { emoji: "🌈", x: "92%", delay: 0.14 },
  { emoji: "💫", x: "30%", delay: 0.2 },
  { emoji: "🎈", x: "60%", delay: 0.09 },
];

export default function GameShell() {
  const { nodeId } = useParams<{ nodeId: string }>();
  const navigate = useNavigate();
  const completeNode = useProgressStore((s) => s.completeNode);

  const node = useMemo(
    () => (nodeId ? findLessonNode(nodeId) : undefined),
    [nodeId],
  );

  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [gameKey, setGameKey] = useState(0);

  const handleGameComplete = useCallback(
    async (stars: number) => {
      if (!nodeId) return;
      await completeNode(nodeId, stars);
      setEarnedStars(stars);
      setCelebrationOpen(true);
    },
    [completeNode, nodeId],
  );

  const closeCelebration = useCallback(() => {
    setCelebrationOpen(false);
    navigate("/");
  }, [navigate]);

  const playAgain = useCallback(() => {
    setCelebrationOpen(false);
    setGameKey((k) => k + 1);
  }, []);

  if (!nodeId) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 px-6">
        <p className="text-center font-body text-text-muted">
          Missing activity link.
        </p>
        <Button type="button" variant="secondary" onClick={() => navigate("/")}>
          Back to path
        </Button>
      </div>
    );
  }

  if (!node) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 px-6">
        <p className="text-center font-body text-text-muted">
          We couldn&apos;t find this activity.
        </p>
        <Button type="button" variant="secondary" onClick={() => navigate("/")}>
          Back to path
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col bg-surface">
      <header className="sticky top-0 z-20 flex shrink-0 items-center gap-3 border-b-[3px] border-text/10 bg-surface-raised px-4 py-3 shadow-sm">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-text/10 bg-surface-raised font-body text-text-muted transition hover:border-primary/30 hover:bg-primary-light/15 hover:text-primary"
          aria-label="Back to learning path"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="min-w-0 flex-1 truncate font-display text-lg text-text">
          {node.title}
        </h1>
      </header>

      <div className="flex min-h-0 flex-1 flex-col" key={gameKey}>
        {node.game.type === "multiple-choice" ? (
          <MultipleChoice
            config={node.game}
            onComplete={handleGameComplete}
          />
        ) : node.game.type === "drag-drop" ? (
          <DragDrop config={node.game} onComplete={handleGameComplete} />
        ) : node.game.type === "snake" ? (
          <SnakeGame config={node.game} onComplete={handleGameComplete} />
        ) : node.game.type === "snake-collect" ? (
          <SnakeCollect config={node.game} onComplete={handleGameComplete} />
        ) : node.game.type === "catcher" ? (
          <CatcherGame config={node.game} onComplete={handleGameComplete} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
            <p className="text-center font-body text-text-muted">
              This game type is coming soon.
            </p>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Back to path
            </Button>
          </div>
        )}
      </div>

      <footer className="shrink-0 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-2">
        <div className="mx-auto flex max-w-md justify-start">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => navigate(`/lesson/${nodeId}`, { state: { startAtEnd: true } })}
            className="min-w-[6.5rem]"
          >
            Back
          </Button>
        </div>
      </footer>

      <Modal open={celebrationOpen} onClose={closeCelebration}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light/35 via-accent/25 to-secondary/30 px-2 py-4">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            {CONFETTI_PIECES.map((c, i) => (
              <motion.span
                key={`${c.emoji}-${i}`}
                className="absolute top-0 text-2xl"
                style={{ left: c.x }}
                initial={{ y: -28, opacity: 0, rotate: 0 }}
                animate={{
                  y: [0, 120, 100],
                  opacity: [0, 1, 1],
                  rotate: [0, 18, -12],
                }}
                transition={{
                  duration: 1.4,
                  delay: c.delay,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 2.2,
                }}
                aria-hidden
              >
                {c.emoji}
              </motion.span>
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-4 text-center">
            <motion.div
              className="text-7xl leading-none"
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: [0, -8, 8, 0] }}
              transition={{
                scale: { type: "spring", stiffness: 260, damping: 14 },
                rotate: { duration: 0.6, delay: 0.2 },
              }}
              aria-hidden
            >
              🎉
            </motion.div>

            <motion.p
              className="font-display text-2xl text-primary"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
            >
              Nice work!
            </motion.p>

            <div className="flex flex-col items-center gap-2">
              <p className="font-body text-sm font-semibold text-text-muted">
                Stars you earned
              </p>
              <StarRating stars={earnedStars} size="lg" />
            </div>

            <motion.div
              className="w-full rounded-2xl border-[3px] border-white/80 bg-surface-raised/95 p-4 text-left shadow-md backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 280 }}
            >
              <p className="mb-1 font-display text-sm text-accent">Fun fact</p>
              <p className="font-body text-base font-semibold leading-snug text-text">
                {node.funFact}
              </p>
            </motion.div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              className="mt-2 w-full max-w-xs"
              onClick={playAgain}
            >
              Play again
            </Button>
            <Button
              type="button"
              variant="success"
              size="lg"
              className="w-full max-w-xs shadow-[0_6px_0_rgba(0,184,148,0.35)]"
              onClick={closeCelebration}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
