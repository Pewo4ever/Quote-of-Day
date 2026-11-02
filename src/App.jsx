import { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import QuoteCard from "./components/QuoteCard";
import QuoteLibrary from "./components/QuoteLibrary";
import SettingsPanel from "./components/SettingsPanel";
import { quotes } from "./data/quotesData";
import { addDays, formatDateKey, toDateKey } from "./utils/date";
import {
  getQuoteForDate,
  readFavoriteIds,
  writeFavoriteIds,
} from "./utils/quoteStorage";
import {
  readQuoteTextSize,
  writeQuoteTextSize,
} from "./utils/preferencesStorage";

export default function App() {
  const todayKey = toDateKey(new Date());
  const tomorrowKey = addDays(todayKey, 1);
  const [selection, setSelection] = useState(() => {
    const dateKey = toDateKey(new Date());
    return { dateKey, quote: getQuoteForDate(dateKey, quotes) };
  });
  const [activeView, setActiveView] = useState("home");
  const [favoriteIds, setFavoriteIds] = useState(readFavoriteIds);
  const [quoteTextSize, setQuoteTextSize] = useState(readQuoteTextSize);

  const isTomorrow = selection.dateKey === tomorrowKey;

  function changeDay(amount) {
    const dateKey = addDays(selection.dateKey, amount);
    if (dateKey > tomorrowKey) return;

    const quote =
      dateKey === tomorrowKey ? null : getQuoteForDate(dateKey, quotes);
    setSelection({ dateKey, quote });
  }

  function goToToday() {
    setSelection({
      dateKey: todayKey,
      quote: getQuoteForDate(todayKey, quotes),
    });
  }

  function toggleFavorite(quoteId) {
    const nextFavoriteIds = favoriteIds.includes(quoteId)
      ? favoriteIds.filter((id) => id !== quoteId)
      : [...favoriteIds, quoteId];

    setFavoriteIds(nextFavoriteIds);
    writeFavoriteIds(nextFavoriteIds);
  }

  function changeQuoteTextSize(size) {
    setQuoteTextSize(size);
    writeQuoteTextSize(size);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#0f172a] px-4 text-slate-100 sm:px-6">
      <Header />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center py-8 sm:py-12">
        {activeView === "home" ? (
          <section className="flex w-full flex-1 flex-col items-center gap-6">
            <div className="flex w-full max-w-md items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => changeDay(-1)}
                className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-amber-400"
              >
                ← Вчера
              </button>
              <p className="text-center text-sm font-medium text-slate-200">
                {formatDateKey(selection.dateKey)}
              </p>
              <button
                type="button"
                onClick={() => changeDay(1)}
                disabled={isTomorrow}
                className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Завтра →
              </button>
            </div>

            {isTomorrow ? (
              <div className="my-auto flex w-full max-w-md flex-col items-center rounded-2xl border border-dashed border-slate-700 px-6 py-12 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  Следующий день
                </p>
                <h1 className="mt-3 font-serif text-3xl text-slate-100">
                  Завтра
                </h1>
                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
                  Новая цитата появится в этот день. Загляни снова завтра.
                </p>
                <button
                  type="button"
                  onClick={goToToday}
                  className="mt-6 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                >
                  Вернуться к сегодняшней цитате
                </button>
              </div>
            ) : selection.quote ? (
              <QuoteCard
                key={`${selection.dateKey}-${selection.quote.id}`}
                quoteData={selection.quote}
                quoteDate={formatDateKey(selection.dateKey)}
                isFavorite={favoriteIds.includes(selection.quote.id)}
                onToggleFavorite={() => toggleFavorite(selection.quote.id)}
                quoteTextSize={quoteTextSize}
              />
            ) : (
              <p className="my-auto text-center text-slate-400">
                Цитат пока нет.
              </p>
            )}
          </section>
        ) : activeView === "settings" ? (
          <SettingsPanel
            quoteTextSize={quoteTextSize}
            onQuoteTextSizeChange={changeQuoteTextSize}
          />
        ) : (
          <QuoteLibrary
            key={activeView}
            mode={activeView}
            quotes={quotes}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            quoteTextSize={quoteTextSize}
          />
        )}
      </main>

      <BottomNav activeView={activeView} onNavigate={setActiveView} />
    </div>
  );
}
