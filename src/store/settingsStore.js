const KEY = "pph:settings";

export function loadSettings() {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
  catch { return {}; }
}

export function saveSettings(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function getDarkMode() {
  return !!loadSettings().darkMode;
}

export function setDarkMode(v) {
  const s = loadSettings();
  s.darkMode = !!v;
  saveSettings(s);
}
