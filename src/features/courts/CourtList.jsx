// src/features/courts/CourtList.jsx
import CourtCard from "../../components/CourtCard";
import "../../styles/features.css";

export default function CourtList({
  courts,
  computedById,
  selectedId,
  onSelect,
}) {
  if (!courts.length) {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 800 }}>
          No matches 🥲
        </div>
        <div style={{ color: "#64748b", marginTop: 8 }}>
          Try a different search term.
        </div>
      </div>
    );
  }

  return (
    <div>
      {courts.map((c) => (
        <CourtCard
          key={c.id}
          court={c}
          meta={computedById[c.id]}
          selected={selectedId === c.id}
          onClick={() => onSelect(c.id)}
        />
      ))}
    </div>
  );
}
