import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAvatarStore } from "./stores/avatarStore";
import { useProgressStore } from "./stores/progressStore";
import AppShell from "./components/layout/AppShell";
import AvatarCreator from "./components/avatar/AvatarCreator";
import AvatarDisplay from "./components/avatar/AvatarDisplay";
import LearningPath from "./components/map/LearningPath";
import LessonPlayer from "./components/lesson/LessonPlayer";
import GameShell from "./components/game/GameShell";

function ProfilePage() {
  const avatar = useAvatarStore((s) => s.avatar);
  const progress = useProgressStore((s) => s.progress);

  return (
    <div className="flex flex-col items-center gap-6 px-6 py-10">
      <h1 className="font-display text-3xl text-primary">Your profile</h1>
      {avatar && <AvatarDisplay config={avatar} size={160} />}
      <div className="text-center">
        <p className="font-display text-2xl">{avatar?.name ?? "Explorer"}</p>
        <p className="mt-1 text-text-muted">Level {Math.floor(progress.xp / 100) + 1}</p>
        <p className="text-text-muted">{progress.xp} XP</p>
      </div>
      <div className="mt-4 w-full max-w-sm rounded-2xl border-2 border-text/10 bg-surface-raised p-5 shadow-sm">
        <p className="font-semibold">Completed modules</p>
        <p className="text-4xl font-bold text-primary">{progress.completedModules.length}</p>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="flex flex-col items-center gap-6 px-6 py-10">
      <h1 className="font-display text-3xl text-primary">Settings</h1>
      <p className="text-text-muted">Settings coming soon!</p>
    </div>
  );
}

export default function App() {
  const avatarStore = useAvatarStore();
  const progressStore = useProgressStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([avatarStore.init(), progressStore.init()]).then(() =>
      setReady(true),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse font-display text-2xl text-primary">
          Loading...
        </div>
      </div>
    );
  }

  const hasAvatar = avatarStore.avatar !== null;

  return (
    <Routes>
      {!hasAvatar && (
        <>
          <Route path="/onboarding" element={<AvatarCreator />} />
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </>
      )}

      {hasAvatar && (
        <>
          <Route path="/lesson/:nodeId" element={<LessonPlayer />} />
          <Route path="/game/:nodeId" element={<GameShell />} />
          <Route
            path="/"
            element={
              <AppShell>
                <LearningPath />
              </AppShell>
            }
          />
          <Route
            path="/profile"
            element={
              <AppShell>
                <ProfilePage />
              </AppShell>
            }
          />
          <Route
            path="/settings"
            element={
              <AppShell>
                <SettingsPage />
              </AppShell>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}
