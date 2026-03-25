import { get, set, del } from "idb-keyval";
import type { AvatarConfig, UserProgress } from "../types";

const AVATAR_KEY = "nutriphone-avatar";
const PROGRESS_KEY = "nutriphone-progress";

export async function loadAvatar(): Promise<AvatarConfig | undefined> {
  return get<AvatarConfig>(AVATAR_KEY);
}

export async function saveAvatar(avatar: AvatarConfig): Promise<void> {
  await set(AVATAR_KEY, avatar);
}

export async function loadProgress(): Promise<UserProgress | undefined> {
  return get<UserProgress>(PROGRESS_KEY);
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  await set(PROGRESS_KEY, progress);
}

export async function clearAllData(): Promise<void> {
  await del(AVATAR_KEY);
  await del(PROGRESS_KEY);
}
