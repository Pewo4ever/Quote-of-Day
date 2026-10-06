import { useState } from "react";
import { ChevronDown, Heart } from "lucide-react";

export default function QuoteCard({
  quoteData,
  quoteDate,
  isFavorite = false,
  onToggleFavorite,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const explanationId = `quote-explanation-${quoteData.id}`;

  return (
    <article className="my-auto w-full max-w-md px-1 sm:px-0">
      <div className="relative rounded-2xl border border-slate-200 bg-[#f8f9fa] p-5 text-slate-900 shadow-2xl sm:p-7">
        <div className="absolute -top-3 right-6 rounded-b-lg bg-[#700124] px-3 py-1.5 text-xs font-bold text-white shadow-md">
          {quoteData.id}
        </div>

        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={
            isFavorite ? "Убрать из избранного" : "Добавить в избранное"
          }
          aria-pressed={isFavorite}
          className={`rounded-md p-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${
            isFavorite ? "text-rose-700" : "text-slate-400 hover:text-rose-600"
          }`}
        >
          <Heart
            className="h-6 w-6"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <div className="my-6 px-1 text-center sm:px-2">
          <blockquote className="font-serif text-xl leading-relaxed sm:text-2xl">
            {quoteData.quote}
          </blockquote>
          <div className="mx-auto my-4 h-0.5 w-12 bg-rose-600/50" />
          <p className="text-lg font-medium text-rose-800">
            {quoteData.author}
          </p>
          {quoteData.source && (
            <p className="mt-1 text-sm text-slate-500">{quoteData.source}</p>
          )}
        </div>

        <hr className="my-4 border-dashed border-slate-400" />

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls={explanationId}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium text-blue-700 transition hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-amber-600"
        >
          <span>Контекст</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          id={explanationId}
          aria-hidden={!isOpen}
          className={`grid transition-all duration-300 ease-in-out motion-reduce:transition-none ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-sm leading-relaxed text-slate-700">
              {quoteData.explanation}
            </div>
          </div>
        </div>

        {quoteDate && (
          <p className="mt-3 text-center text-xs text-slate-400">{quoteDate}</p>
        )}
      </div>
    </article>
  );
}
