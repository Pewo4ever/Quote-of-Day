const DAILY_QUOTES_KEY = "quote-of-day.daily-quotes";
const FAVORITE_QUOTES_KEY = "quote-of-day.favorites";

function readStoredValue(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The app remains usable when browser storage is unavailable.
  }
}

export function getQuoteForDate(dateKey, quotes) {
  if (quotes.length === 0) return null;

  const assignments = readStoredValue(DAILY_QUOTES_KEY, {});
  const savedId = assignments[dateKey];
  const savedQuote = quotes.find((quote) => quote.id === savedId);

  if (savedQuote) return savedQuote;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  writeStoredValue(DAILY_QUOTES_KEY, {
    ...assignments,
    [dateKey]: quote.id,
  });

  return quote;
}

export function readFavoriteIds() {
  const favoriteIds = readStoredValue(FAVORITE_QUOTES_KEY, []);
  return Array.isArray(favoriteIds) ? favoriteIds : [];
}

export function writeFavoriteIds(favoriteIds) {
  writeStoredValue(FAVORITE_QUOTES_KEY, favoriteIds);
}
