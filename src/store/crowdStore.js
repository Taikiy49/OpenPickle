// src/store/crowdStore.js
import { uid } from "../utils/id";

const KEY = "pph:crowdReports";

/**
 * report:
 * { id, courtId, players, note, condition, createdAt }
 */
export function loadCrowdReports() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCrowdReports(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addCrowdReport({ courtId, players, note, condition }) {
  const list = loadCrowdReports();
  list.unshift({
    id: uid("crowd"),
    courtId,
    players: Number(players || 0),
    note: String(note || ""),
    condition: String(condition || "Good"),
    createdAt: Date.now(),
  });
  saveCrowdReports(list);
  return list;
}

export function getCourtCrowdSummary(courtId) {
  const list = loadCrowdReports().filter((r) => r.courtId === courtId);

  // take most recent 5
  const recent = list.slice(0, 5);

  const avgPlayers = recent.length
    ? Math.round(recent.reduce((sum, r) => sum + (Number(r.players) || 0), 0) / recent.length)
    : 0;

  return { recent, avgPlayers };
}
