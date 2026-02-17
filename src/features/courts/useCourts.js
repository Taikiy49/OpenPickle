// src/features/courts/useCourts.js
import { useMemo } from "react";
import { DateTime } from "luxon";
import { COURTS_SEED } from "../../data/courtsSeed";
import { isCourtOpenNow, getNextSessionLabel } from "./courtsUtils";

export function useCourts() {
  const courts = COURTS_SEED;

  const computedById = useMemo(() => {
    const now = DateTime.now().setZone("Pacific/Honolulu");

    const map = {};
    courts.forEach((court) => {
      const isOpenNow = isCourtOpenNow(court.sessions, now);
      const nextStartLabel = getNextSessionLabel(court.sessions, now);

      map[court.id] = {
        isOpenNow,
        nextStartLabel,
      };
    });

    return map;
  }, [courts]);

  return { courts, computedById };
}
