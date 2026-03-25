import { create } from "zustand";
import type { UserProgress } from "../types";
import { loadProgress, saveProgress } from "../utils/storage";

const DEFAULT_PROGRESS: UserProgress = {
  currentModuleId: "module-1",
  currentNodeIndex: 0,
  xp: 0,
  nodes: {},
  completedModules: [],
};

interface ProgressStore {
  progress: UserProgress;
  loaded: boolean;
  init: () => Promise<void>;
  completeNode: (nodeId: string, stars: number) => Promise<void>;
  completeModule: (moduleId: string) => Promise<void>;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: DEFAULT_PROGRESS,
  loaded: false,

  init: async () => {
    const saved = await loadProgress();
    set({ progress: saved ?? DEFAULT_PROGRESS, loaded: true });
  },

  completeNode: async (nodeId, stars) => {
    const prev = get().progress;
    const existing = prev.nodes[nodeId];
    const bestStars = existing ? Math.max(existing.stars, stars) : stars;
    const xpGain = existing ? 0 : stars * 10;

    const updated: UserProgress = {
      ...prev,
      xp: prev.xp + xpGain,
      currentNodeIndex: prev.currentNodeIndex + (existing ? 0 : 1),
      nodes: {
        ...prev.nodes,
        [nodeId]: { stars: bestStars, completed: true },
      },
    };

    await saveProgress(updated);
    set({ progress: updated });
  },

  completeModule: async (moduleId) => {
    const prev = get().progress;
    if (prev.completedModules.includes(moduleId)) return;

    const updated: UserProgress = {
      ...prev,
      completedModules: [...prev.completedModules, moduleId],
    };

    await saveProgress(updated);
    set({ progress: updated });
  },
}));
