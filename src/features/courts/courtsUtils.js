// src/features/courts/courtsUtils.js
import { DateTime } from "luxon";

export function isCourtOpenNow(sessions, now) {
  const today = now.toFormat("ccc"); // Mon, Tue, etc

  return sessions.some((s) => {
    if (!s.days.includes(today)) return false;

    const start = DateTime.fromFormat(s.start, "HH:mm", {
      zone: "Pacific/Honolulu",
    }).set({
      year: now.year,
      month: now.month,
      day: now.day,
    });

    const end = DateTime.fromFormat(s.end, "HH:mm", {
      zone: "Pacific/Honolulu",
    }).set({
      year: now.year,
      month: now.month,
      day: now.day,
    });

    return now >= start && now <= end;
  });
}

export function getNextSessionLabel(sessions, now) {
  const today = now.toFormat("ccc");

  for (const s of sessions) {
    if (!s.days.includes(today)) continue;

    const start = DateTime.fromFormat(s.start, "HH:mm", {
      zone: "Pacific/Honolulu",
    }).set({
      year: now.year,
      month: now.month,
      day: now.day,
    });

    if (start > now) {
      return start.toFormat("h:mm a");
    }
  }

  return null;
}
