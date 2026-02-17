import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative", flex: "1 1 360px" }}>
      <Search size={16} style={{ position: "absolute", left: 12, top: 13, color: "var(--muted)" }} />
      <input
        className="input"
        style={{ paddingLeft: 34 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search courts, cities…"
      />
    </div>
  );
}
