const textSizes = [
  { id: "small", label: "Маленький" },
  { id: "normal", label: "Обычный" },
  { id: "large", label: "Крупный" },
];

export default function SettingsPanel({
  quoteTextSize,
  onQuoteTextSizeChange,
}) {
  return (
    <section className="w-full max-w-2xl" aria-labelledby="settings-title">
      <h1 id="settings-title" className="font-serif text-3xl text-slate-100">
        Настройки
      </h1>

      <fieldset className="mt-8">
        <legend className="text-sm font-medium text-slate-200">
          Размер текста цитаты
        </legend>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {textSizes.map(({ id, label }) => {
            const isSelected = quoteTextSize === id;

            return (
              <label
                key={id}
                className={`flex min-h-12 cursor-pointer items-center justify-center rounded-lg border px-2 text-sm transition focus-within:outline-2 focus-within:outline-amber-400 ${
                  isSelected
                    ? "border-amber-400 bg-amber-400/10 text-amber-300"
                    : "border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <input
                  type="radio"
                  name="quote-text-size"
                  value={id}
                  checked={isSelected}
                  onChange={() => onQuoteTextSizeChange(id)}
                  className="sr-only"
                />
                {label}
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
