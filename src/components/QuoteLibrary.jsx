import { useState } from "react";
import QuoteCard from "./QuoteCard";

function formatQuoteCount(count) {
  const remainder = count % 10;
  const lastTwoDigits = count % 100;
  const word =
    remainder === 1 && lastTwoDigits !== 11
      ? "цитата"
      : remainder >= 2 &&
          remainder <= 4 &&
          (lastTwoDigits < 12 || lastTwoDigits > 14)
        ? "цитаты"
        : "цитат";

  return `${count} ${word}`;
}

export default function QuoteLibrary({
  mode,
  quotes,
  favoriteIds,
  onToggleFavorite,
  quoteTextSize,
}) {
  const [query, setQuery] = useState("");
  const isFavorites = mode === "favorites";
  const normalizedQuery = query.trim().toLocaleLowerCase("ru-RU");

  const visibleQuotes = quotes.filter((quote) => {
    if (isFavorites && !favoriteIds.includes(quote.id)) return false;

    const searchableText = [
      quote.quote,
      quote.author,
      quote.source,
      quote.location,
      quote.medium,
      quote.explanation,
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("ru-RU");

    return searchableText.includes(normalizedQuery);
  });

  return (
    <section className="w-full" aria-labelledby="library-title">
      <div className="mx-auto mb-8 w-full max-w-2xl">
        <h1
          id="library-title"
          className="font-serif text-3xl text-slate-100 sm:text-4xl"
        >
          {isFavorites ? "Избранное" : "Поиск цитат"}
        </h1>
        <label className="mt-5 block">
          <span className="sr-only">Поиск по цитате, автору или источнику</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Цитата, автор или источник"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
          />
        </label>
        <p className="mt-3 text-sm text-slate-400" aria-live="polite">
          {formatQuoteCount(visibleQuotes.length)}
        </p>
      </div>

      {visibleQuotes.length > 0 ? (
        <div className="grid w-full grid-cols-1 justify-items-center gap-6 md:grid-cols-2 md:items-start">
          {visibleQuotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quoteData={quote}
              isFavorite={favoriteIds.includes(quote.id)}
              onToggleFavorite={() => onToggleFavorite(quote.id)}
              quoteTextSize={quoteTextSize}
            />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-slate-400">
          {isFavorites && favoriteIds.length === 0
            ? "Пока нет избранных цитат."
            : "Ничего не найдено."}
        </p>
      )}
    </section>
  );
}
