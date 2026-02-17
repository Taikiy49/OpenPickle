import { MapPinned, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-badge">
            <MapPinned size={20} />
          </div>
          <div>
            <div className="h1">OpenPickle</div>

            <div className="p">Open play, games, and community updates 🌴</div>
          </div>
        </div>

        <div className="hidden-md chip">
          <Sparkles size={16} style={{ color: "var(--indigo)" }} />
          Cute + useful MVP
        </div>
      </div>
    </header>
  );
}
