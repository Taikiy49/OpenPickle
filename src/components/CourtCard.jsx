import { MapPin, Users, Clock, Star } from "lucide-react";
import Pill from "./Pill";

export default function CourtCard({ court, meta, selected, onClick, crowdAvg }) {
  const tone = meta?.isOpenNow ? "good" : meta?.nextStart ? "cool" : "neutral";

  return (
    <button onClick={onClick} className={`court-item ${selected ? "selected" : ""}`}>
      <div className="row" style={{ alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 auto" }}>
          <div style={{ fontWeight: 1000, letterSpacing: "-0.01em" }}>{court.name}</div>
          <div className="p" style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
            <MapPin size={14} /> {court.city} • {court.island}
          </div>
        </div>

        <Pill tone={tone}>
          {meta?.isOpenNow ? (<><Users size={14}/> Open now</>) :
           meta?.nextStartLabel ? (<><Clock size={14}/> Next: {meta.nextStartLabel}</>) :
           "Schedule TBD"}
        </Pill>
      </div>

      <div className="row" style={{ marginTop: 10, gap: 8 }}>
        <Pill>{court.courts} courts</Pill>
        <Pill>{court.surface}</Pill>
        <Pill tone={court.lights ? "warn" : "neutral"}>{court.lights ? "Lights" : "No lights"}</Pill>
        <Pill tone={court.covered ? "cool" : "neutral"}>{court.covered ? "Covered" : "Outdoor"}</Pill>
        <Pill><Star size={14}/> {Number(court.communityScore).toFixed(1)}</Pill>
        <Pill tone="good">Avg crowd: {crowdAvg || 0}</Pill>
      </div>
    </button>
  );
}
