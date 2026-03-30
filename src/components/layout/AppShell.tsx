import { useLocation, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

function HomeIcon({ active }: { active: boolean }) {
  const stroke = active ? "var(--color-primary)" : "var(--color-text-muted)";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  const stroke = active ? "var(--color-primary)" : "var(--color-text-muted)";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke={stroke} strokeWidth="2" />
      <path
        d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  const stroke = active ? "var(--color-primary)" : "var(--color-text-muted)";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke={stroke} strokeWidth="2" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const navItems = [
  { path: "/", label: "Home", Icon: HomeIcon },
  { path: "/profile", label: "Profile", Icon: ProfileIcon },
  { path: "/settings", label: "Settings", Icon: SettingsIcon },
] as const;

export type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-full min-h-0 flex-col bg-surface">
      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden [-webkit-overflow-scrolling:touch]">
        {children}
      </main>
      <nav
        className="shrink-0 border-t-[3px] border-text/10 bg-surface-raised px-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-2 shadow-[0_-4px_20px_rgba(45,52,54,0.08)]"
        aria-label="Main navigation"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-around gap-1">
          {navItems.map(({ path, label, Icon }) => {
            const active =
              path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(path);
            return (
              <li key={path} className="flex-1">
                <button
                  type="button"
                  onClick={() => navigate(path)}
                  className={`flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-2 font-body text-xs font-semibold transition ${
                    active
                      ? "text-primary"
                      : "text-text-muted hover:bg-primary/5 hover:text-text"
                  }`}
                >
                  <Icon active={active} />
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
