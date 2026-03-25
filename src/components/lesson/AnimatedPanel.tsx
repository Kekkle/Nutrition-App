import { motion } from "framer-motion";

export interface AnimatedPanelProps {
  panel: { id: string; text: string; illustration: string };
  direction: number;
}

export default function AnimatedPanel({ panel, direction }: AnimatedPanelProps) {
  return (
    <motion.div
      key={panel.id}
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-text/10 bg-surface-raised shadow-[0_8px_30px_rgba(45,52,54,0.08)] ring-1 ring-text/5"
      initial={{ x: 300 * direction, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300 * direction, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <div className="flex h-[60%] min-h-0 shrink-0 flex-col items-center justify-center rounded-t-3xl bg-primary-light/30 px-4 py-6">
        <div className="flex h-full w-full max-w-lg items-center justify-center rounded-2xl bg-primary-light/50 px-3 py-4">
          <p className="text-center font-body text-sm leading-snug text-text-muted break-words">
            {panel.illustration}
          </p>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-6">
        <p className="text-center font-body text-lg leading-relaxed text-text sm:text-xl">
          {panel.text}
        </p>
      </div>
    </motion.div>
  );
}
