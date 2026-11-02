import assert from "node:assert/strict";
import test from "node:test";
import { quotes } from "./quotesData.js";
import { addDays, formatDateKey, toDateKey } from "../utils/date.js";
import {
  getQuoteForDate,
  readFavoriteIds,
  writeFavoriteIds,
} from "../utils/quoteStorage.js";
import {
  readQuoteTextSize,
  writeQuoteTextSize,
} from "../utils/preferencesStorage.js";

const storage = new Map();
globalThis.window = {
  localStorage: {
    getItem(key) {
      return storage.get(key) ?? null;
    },
    setItem(key, value) {
      storage.set(key, String(value));
    },
  },
};

test("quote records have unique ids and complete attribution", () => {
  const ids = quotes.map((quote) => quote.id);

  assert.equal(new Set(ids).size, ids.length);
  assert.ok(quotes.length >= 8);

  for (const quote of quotes) {
    assert.ok(quote.quote);
    assert.ok(quote.author);
    assert.ok(quote.source);
    assert.ok(quote.location);
    assert.ok(quote.medium);
    assert.ok(quote.explanation);
    assert.ok(quote.sourceUrl.startsWith("https://"));
    assert.ok(quote.quote.length <= 90);
  }
});

test("a date keeps the same quote after later visits", () => {
  storage.clear();

  const firstVisit = getQuoteForDate("2026-10-11", quotes);
  const laterVisit = getQuoteForDate("2026-10-11", quotes);
  const assignments = JSON.parse(storage.get("quote-of-day.daily-quotes"));

  assert.equal(laterVisit.id, firstVisit.id);
  assert.equal(assignments["2026-10-11"], firstVisit.id);
});

test("favorite ids and text-size preference persist", () => {
  storage.clear();
  writeFavoriteIds([2, 5]);
  writeQuoteTextSize("large");

  assert.deepEqual(readFavoriteIds(), [2, 5]);
  assert.equal(readQuoteTextSize(), "large");

  writeQuoteTextSize("gigantic");
  assert.equal(readQuoteTextSize(), "large");
});

test("empty catalog and invalid saved values use safe defaults", () => {
  storage.clear();
  storage.set("quote-of-day.favorites", "{invalid json");
  storage.set("quote-of-day.quote-text-size", "gigantic");

  assert.equal(getQuoteForDate("2026-10-11", []), null);
  assert.deepEqual(readFavoriteIds(), []);
  assert.equal(readQuoteTextSize(), "normal");
});

test("storage access failures do not prevent using the app", () => {
  const originalWindow = globalThis.window;
  globalThis.window = {
    get localStorage() {
      throw new Error("Storage is unavailable");
    },
  };

  try {
    assert.deepEqual(readFavoriteIds(), []);
    assert.equal(readQuoteTextSize(), "normal");
    assert.doesNotThrow(() => writeFavoriteIds([2]));
    assert.doesNotThrow(() => writeQuoteTextSize("large"));
  } finally {
    globalThis.window = originalWindow;
  }
});

test("calendar helpers handle leap day and year boundaries", () => {
  assert.equal(addDays("2024-02-28", 1), "2024-02-29");
  assert.equal(addDays("2024-02-28", 2), "2024-03-01");
  assert.equal(addDays("2025-12-31", 1), "2026-01-01");
  assert.equal(formatDateKey("2026-10-06"), "6 октября 2026 г.");
  assert.equal(toDateKey(new Date(2026, 9, 6)), "2026-10-06");
});
