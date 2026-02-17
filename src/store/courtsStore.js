// src/store/courtsStore.js
import { COURTS_SEED } from "../data/courtsSeed";

const KEY = "pph:courts";

export function loadCourts() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return COURTS_SEED;

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : COURTS_SEED;
  } catch {
    return COURTS_SEED;
  }
}

export function saveCourts(courts) {
  localStorage.setItem(KEY, JSON.stringify(courts));
}

// Optional helper: reset back to seed
export function resetCourtsToSeed() {
  localStorage.removeItem(KEY);
  return COURTS_SEED;
}
