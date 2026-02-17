import { useMemo, useState } from "react";
import { loadFavorites } from "../store/favoritesStore";
import { loadCourts } from "../store/courtsStore";
import { computeCourtStatus } from "../utils/time";
import CourtList from "../features/courts/CourtList";
import CourtDrawer from "../components/CourtDrawer";

export default function Favorites() {
  const [selectedId, setSelectedId] = useState(null);
  const fav = loadFavorites();
  const courts = loadCourts().filter(c => fav.has(c.id));

  const computedById = useMemo(() => {
    const map = {};
    for (const c of courts) map[c.id] = computeCourtStatus(c);
    return map;
  }, [courts]);

  const selected = useMemo(() => courts.find(c => c.id === selectedId) || null, [courts, selectedId]);

  return (
    <div className="container">
      <div className="card">
        <div className="h1">Favorites</div>
        <div className="p">Your saved courts across Hawaiʻi.</div>
      </div>

      <div style={{ height: 14 }} />

      <CourtList courts={courts} computedById={computedById} selectedId={selectedId} onSelect={setSelectedId} />

      <CourtDrawer
        open={!!selected}
        court={selected}
        computed={selected ? computedById[selected.id] : null}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
