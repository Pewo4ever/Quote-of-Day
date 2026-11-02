import { House, Search, Heart, Settings } from "lucide-react";

const navigationItems = [
  { id: "home", label: "Главная", Icon: House },
  { id: "search", label: "Поиск", Icon: Search },
  { id: "favorites", label: "Избранное", Icon: Heart },
  { id: "settings", label: "Настройки", Icon: Settings },
];

export default function BottomNav({ activeView, onNavigate }) {
  return (
    <nav
      aria-label="Основная навигация"
      className="mx-auto flex w-full max-w-5xl justify-around border-t border-slate-800 bg-[#0f172a] pb-[env(safe-area-inset-bottom)] text-xs text-slate-400"
    >
      {navigationItems.map(({ id, label, Icon, disabled }) => {
        const isActive = activeView === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            disabled={disabled}
            aria-label={label}
            aria-pressed={isActive}
            title={disabled ? "Настройки пока недоступны" : undefined}
            className={`flex min-w-16 flex-col items-center gap-1 px-3 py-3 transition focus-visible:outline-2 focus-visible:outline-amber-400 ${
              isActive
                ? "text-amber-400"
                : "hover:text-slate-100 disabled:cursor-not-allowed disabled:text-slate-600"
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
