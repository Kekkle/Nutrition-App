import { create } from "zustand";
import type { AvatarConfig } from "../types";
import { loadAvatar, saveAvatar } from "../utils/storage";

interface AvatarStore {
  avatar: AvatarConfig | null;
  loaded: boolean;
  init: () => Promise<void>;
  setAvatar: (avatar: AvatarConfig) => Promise<void>;
}

export const useAvatarStore = create<AvatarStore>((set) => ({
  avatar: null,
  loaded: false,

  init: async () => {
    const saved = await loadAvatar();
    set({ avatar: saved ?? null, loaded: true });
  },

  setAvatar: async (avatar) => {
    await saveAvatar(avatar);
    set({ avatar });
  },
}));
