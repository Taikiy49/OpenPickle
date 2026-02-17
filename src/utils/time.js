import { DateTime } from "luxon";
const ZONE = "Pacific/Honolulu";
const DAY_TO_LUXON = { Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6, Sun:7 };

function parseToMinutes(label) {
  const dt = DateTime.fromFormat(label.trim(), "h:mm a", { zone: ZONE });
  if (!dt.isValid) return null;
  return dt.hour * 60 + dt.minute;
}

export function nowHST() {
  return DateTime.now().setZone(ZONE);
}

export function computeCourtStatus(court) {
  const now = nowHST();
  const weekday = now.weekday;
  const nowMin = now.hour * 60 + now.minute;

  let isOpenNow = false;
  let nextStart = null;

  for (const slot of court.openPlay || []) {
    const w = DAY_TO_LUXON[slot.day];
    if (!w) continue;

    const startMin = parseToMinutes(slot.start);
    const endMin = parseToMinutes(slot.end);
    if (startMin == null || endMin == null) continue;

    if (w === weekday && nowMin >= startMin && nowMin <= endMin) isOpenNow = true;

    const daysAhead = (w - weekday + 7) % 7;
    const startCandidate = now.startOf("day").plus({ days: daysAhead, minutes: startMin });
    if (startCandidate < now) continue;
    if (!nextStart || startCandidate < nextStart) nextStart = startCandidate;
  }

  return {
    isOpenNow,
    nextStart,
    nextStartLabel: nextStart ? nextStart.toFormat("ccc h:mm a") : null,
  };
}
