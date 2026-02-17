import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import SegmentedControl from "../components/SegmentedControl";
import FilterBar from "../components/FilterBar";
import CourtDrawer from "../components/CourtDrawer";
import CourtMap from "../features/courts/CourtMap";
import CourtList from "../features/courts/CourtList";

import { computeCourtStatus } from "../utils/time";
import { loadCourts } from "../store/courtsStore";

export default function Home() {
  const [view, setView] = useState("Map");
  const [selectedId, setSelectedId] = useState(null);

  const [query, setQuery] = useState("");
  const [island, setIsland] = useState("All");
  const [skill, setSkill] = useState("All");
  const [openNowOnly, setOpenNowOnly] = useState(false);

  const courts = loadCourts();

  const computedById = useMemo(() => {
    const map = {};
    for (const c of courts) map[c.id] = computeCourtStatus(c);
    return map;
  }, [courts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courts.filter((c) => {
      if (island !== "All" && c.island !== island) return false;
      if (skill !== "All" && !(c.skillLevels || []).includes(skill)) return false;

      const meta = computedById[c.id];
      if (openNowOnly && !meta?.isOpenNow) return false;

      if (!q) return true;
      const hay = `${c.name} ${c.city} ${c.island} ${c.address}`.toLowerCase();
      return hay.includes(q);
    });
  }, [courts, computedById, query, island, skill, openNowOnly]);

  const selected = useMemo(
    () => courts.find((c) => c.id === selectedId) || null,
    [courts, selectedId]
  );

  return (
    <div className="container">
      <div className="card">
        <div className="row">
          <SearchBar value={query} onChange={setQuery} />
          <SegmentedControl value={view} onChange={setView} options={["Map","List"]} />
        </div>

        <FilterBar
          island={island} setIsland={setIsland}
          skill={skill} setSkill={setSkill}
          openNowOnly={openNowOnly} setOpenNowOnly={setOpenNowOnly}
        />
      </div>

      <div style={{ height: 14 }} />

      {view === "Map" ? (
        <CourtMap
          courts={filtered}
          computedById={computedById}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ) : (
        <CourtList
          courts={filtered}
          computedById={computedById}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      )}

      <CourtDrawer
        open={!!selected}
        court={selected}
        computed={selected ? computedById[selected.id] : null}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
