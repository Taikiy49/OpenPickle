import { uid } from "../utils/id";

const KEY = "pph:events";

const SEED = [
  { id:"evt1", title:"Beginner Clinic (Sample)", island:"Oʻahu", date:"2026-03-01", place:"Honolulu", details:"Bring paddle + water. Coach-led basics." },
  { id:"evt2", title:"Round Robin Night (Sample)", island:"Maui", date:"2026-03-08", place:"Kīhei", details:"Mixed levels, fun games." },
  { id:"evt3", title:"Local Tournament (Sample)", island:"Oʻahu", date:"2026-04-05", place:"Mililani", details:"Doubles bracket. Register early." },
];

export function loadEvents() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return SEED;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : SEED;
  } catch {
    return SEED;
  }
}
export function saveEvents(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
export function addEvent({ title, island, date, place, details }) {
  const list = loadEvents();
  list.unshift({ id: uid("evt"), title, island, date, place, details });
  saveEvents(list);
  return list;
}
export function deleteEvent(id) {
  const list = loadEvents().filter(e => e.id !== id);
  saveEvents(list);
  return list;
}
