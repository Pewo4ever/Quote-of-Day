const QUOTE_TEXT_SIZE_KEY = "quote-of-day.quote-text-size";
const validTextSizes = new Set(["small", "normal", "large"]);

export function readQuoteTextSize() {
  try {
    const size = window.localStorage.getItem(QUOTE_TEXT_SIZE_KEY);
    return validTextSizes.has(size) ? size : "normal";
  } catch {
    return "normal";
  }
}

export function writeQuoteTextSize(size) {
  if (!validTextSizes.has(size)) return;

  try {
    window.localStorage.setItem(QUOTE_TEXT_SIZE_KEY, size);
  } catch {
    // The app remains usable when browser storage is unavailable.
  }
}
