const KEY = "pph:favorites";
let cache = null;

function load() {
  if (cache) return cache;
  try {
    cache = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  } catch {
    cache = new Set();
  }
  return cache;
}

export function isFavorite(id) {
  return load().has(id);
}

export function toggleFavorite(id) {
  const s = load();
  if (s.has(id)) s.delete(id);
  else s.add(id);
}

export function saveFavorite() {
  const s = load();
  localStorage.setItem(KEY, JSON.stringify(Array.from(s)));
}
