const KEY = "pph:favorites";

export function loadFavorites() {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); }
  catch { return new Set(); }
}

export function saveFavorites(set) {
  localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
}

export function isFav(id) {
  return loadFavorites().has(id);
}

export function toggleFav(id) {
  const set = loadFavorites();
  set.has(id) ? set.delete(id) : set.add(id);
  saveFavorites(set);
  return set;
}
