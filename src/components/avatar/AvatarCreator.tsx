import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AvatarConfig } from "../../types";
import { useAvatarStore } from "../../stores/avatarStore";
import AvatarDisplay from "./AvatarDisplay";

const PRESET_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFE66D",
  "#A29BFE",
  "#FD79A8",
  "#00CEC9",
  "#6C5CE7",
  "#FF9FF3",
] as const;

const PREVIEW_SHAPE = 0;
const PREVIEW_COLOR = "#A29BFE";

function miniConfig(overrides: Partial<AvatarConfig> & Pick<AvatarConfig, "shape" | "eyeStyle" | "accessory">): AvatarConfig {
  return {
    name: "",
    color: PREVIEW_COLOR,
    ...overrides,
  };
}

const ringSelected = "ring-4 ring-primary ring-offset-2 ring-offset-white scale-[1.02]";
const ringIdle = "ring-2 ring-transparent hover:ring-text-muted/20";

interface AvatarCreatorProps {
  editMode?: boolean;
}

export default function AvatarCreator({ editMode = false }: AvatarCreatorProps) {
  const navigate = useNavigate();
  const setAvatar = useAvatarStore((s) => s.setAvatar);
  const currentAvatar = useAvatarStore((s) => s.avatar);

  const [name, setName] = useState(editMode && currentAvatar ? currentAvatar.name : "");
  const [shape, setShape] = useState(editMode && currentAvatar ? currentAvatar.shape : 0);
  const [color, setColor] = useState<string>(editMode && currentAvatar ? currentAvatar.color : PRESET_COLORS[0]);
  const [eyeStyle, setEyeStyle] = useState(editMode && currentAvatar ? currentAvatar.eyeStyle : 0);
  const [accessory, setAccessory] = useState(editMode && currentAvatar ? currentAvatar.accessory : 0);
  const [saving, setSaving] = useState(false);

  const previewConfig: AvatarConfig = useMemo(
    () => ({
      name: name.trim() || "Buddy",
      shape,
      color,
      eyeStyle,
      accessory,
    }),
    [name, shape, color, eyeStyle, accessory],
  );

  const canSubmit = name.trim().length >= 1;

  async function handleSubmit() {
    if (!canSubmit || saving) return;
    setSaving(true);
    try {
      await setAvatar({
        name: name.trim(),
        shape,
        color,
        eyeStyle,
        accessory,
      });
      navigate(editMode ? "/profile" : "/");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative flex min-h-full flex-col bg-surface text-text">
      {editMode && (
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-surface-raised/80 px-3 py-1.5 font-body text-sm font-semibold text-text shadow-sm backdrop-blur-sm transition hover:bg-surface-raised"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      )}
      <div
        className="pointer-events-none shrink-0 h-36 bg-gradient-to-b from-primary-light/45 via-secondary/20 to-transparent"
        aria-hidden
      />
      <div className="flex flex-1 flex-col px-5 pb-8 -mt-16 min-h-0">
        <h1 className="font-display text-center text-3xl text-text tracking-tight px-2">
          {editMode ? "Edit your buddy!" : "Create your buddy!"}
        </h1>

        <div className="flex shrink-0 justify-center py-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <AvatarDisplay config={previewConfig} size={200} />
          </motion.div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain pb-4">
          <label className="flex flex-col gap-2 font-body">
            <span className="text-sm font-semibold text-text-muted">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name your buddy..."
              maxLength={24}
              className="font-body w-full rounded-2xl border-2 border-text-muted/25 bg-surface-raised px-5 py-4 text-lg text-text shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <section>
            <h2 className="font-body mb-3 text-sm font-semibold text-text-muted">Shape</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[0, 1, 2, 3].map((i) => (
                <motion.button
                  key={i}
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setShape(i)}
                  className={`flex h-16 w-16 items-center justify-center rounded-full bg-surface-raised p-1 shadow-sm transition ${shape === i ? ringSelected : ringIdle}`}
                  aria-pressed={shape === i}
                  aria-label={`Body shape ${i + 1}`}
                >
                  <AvatarDisplay config={miniConfig({ shape: i, eyeStyle: 0, accessory: 0 })} size={52} />
                </motion.button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-body mb-3 text-sm font-semibold text-text-muted">Color</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {PRESET_COLORS.map((c) => (
                <motion.button
                  key={c}
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setColor(c)}
                  className={`h-12 w-12 rounded-full border-2 border-text/10 shadow-sm transition ${color === c ? "ring-4 ring-primary ring-offset-2 ring-offset-white" : "ring-2 ring-transparent hover:ring-text-muted/25"}`}
                  style={{ backgroundColor: c }}
                  aria-pressed={color === c}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-body mb-3 text-sm font-semibold text-text-muted">Eyes</h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[0, 1, 2, 3].map((i) => (
                <motion.button
                  key={i}
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setEyeStyle(i)}
                  className={`flex aspect-square items-center justify-center rounded-2xl bg-surface-raised p-2 shadow-sm transition ${eyeStyle === i ? ringSelected : ringIdle}`}
                  aria-pressed={eyeStyle === i}
                  aria-label={`Eye style ${i + 1}`}
                >
                  <AvatarDisplay
                    config={miniConfig({ shape: PREVIEW_SHAPE, eyeStyle: i, accessory: 0 })}
                    size={56}
                  />
                </motion.button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-body mb-3 text-sm font-semibold text-text-muted">Accessory</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  { id: 0, label: "None" },
                  { id: 1, label: "Crown" },
                  { id: 2, label: "Bow" },
                  { id: 3, label: "Antenna" },
                ] as const
              ).map(({ id, label }) => (
                <motion.button
                  key={id}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setAccessory(id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl bg-surface-raised px-3 py-4 shadow-sm transition font-body text-sm font-semibold text-text ${accessory === id ? ringSelected : ringIdle}`}
                  aria-pressed={accessory === id}
                >
                  <AvatarDisplay
                    config={miniConfig({ shape: PREVIEW_SHAPE, eyeStyle: 0, accessory: id })}
                    size={64}
                  />
                  {label}
                </motion.button>
              ))}
            </div>
          </section>
        </div>

        <motion.button
          type="button"
          whileTap={canSubmit && !saving ? { scale: 0.98 } : undefined}
          disabled={!canSubmit || saving}
          onClick={handleSubmit}
          className="font-body mt-2 w-full shrink-0 rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-md transition enabled:active:brightness-95 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {saving ? "Saving…" : editMode ? "Save changes" : "Let's go!"}
        </motion.button>
      </div>
    </div>
  );
}
