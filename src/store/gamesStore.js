// src/store/gamesStore.js
import { uid } from "../utils/id";

const KEY = "pph:games";

/**
 * game:
 * { id, courtId, title, skill, whenLabel, maxPlayers, players: [name], createdAt }
 */
export function loadGames() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
export function saveGames(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
export function createGame({ courtId, title, skill, whenLabel, maxPlayers, host }) {
  const list = loadGames();
  list.unshift({
    id: uid("game"),
    courtId,
    title: title || "Open Play Meetup",
    skill: skill || "All",
    whenLabel: whenLabel || "Today",
    maxPlayers: Number(maxPlayers || 8),
    players: host ? [host] : [],
    createdAt: Date.now(),
  });
  saveGames(list);
  return list;
}
export function joinGame(gameId, name) {
  const list = loadGames();
  const g = list.find((x) => x.id === gameId);
  if (!g || !name) return list;
  if (!g.players.includes(name) && g.players.length < g.maxPlayers) g.players.push(name);
  saveGames(list);
  return list;
}
export function leaveGame(gameId, name) {
  const list = loadGames();
  const g = list.find((x) => x.id === gameId);
  if (!g) return list;
  g.players = g.players.filter((p) => p !== name);
  saveGames(list);
  return list;
}
export function deleteGame(gameId) {
  const list = loadGames().filter((g) => g.id !== gameId);
  saveGames(list);
  return list;
}
