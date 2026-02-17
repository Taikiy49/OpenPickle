// src/components/CourtDrawer.jsx
import { useMemo, useState } from "react";
import { X, MapPin, ExternalLink, Bell, Plus, Users } from "lucide-react";
import Pill from "./Pill";
import Modal from "./Modal";
import { pushToast } from "./ToastHost";

import { toggleFav, loadFavorites } from "../store/favoritesStore";
import { addCrowdReport, getCourtCrowdSummary } from "../store/crowdStore";
import { createGame } from "../store/gamesStore";

export default function CourtDrawer({ open, court, computed, onClose }) {
  const [crowdOpen, setCrowdOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);

  const [players, setPlayers] = useState(6);
  const [note, setNote] = useState("");
  const [condition, setCondition] = useState("Good");

  const [gTitle, setGTitle] = useState("Open Play Meetup");
  const [gSkill, setGSkill] = useState("All");
  const [gWhen, setGWhen] = useState("Today 6:00 PM");
  const [gMax, setGMax] = useState(8);
  const [gHost, setGHost] = useState("You");

  // ✅ Only depends on the court id (not modal open state)
  const fav = useMemo(() => {
    if (!court?.id) return false;
    return loadFavorites().has(court.id);
  }, [court?.id]);

  // ✅ Only depends on the court id; crowd updates when the component re-renders
  // (and we force re-render by closing modal + resetting note/players etc.)
  const crowd = useMemo(() => {
    if (!court?.id) return { recent: [], avgPlayers: 0 };
    return getCourtCrowdSummary(court.id);
  }, [court?.id]);

  if (!open || !court) return null;

  const statusTone = computed?.isOpenNow
    ? "good"
    : computed?.nextStartLabel
    ? "cool"
    : "neutral";

  const statusText = computed?.isOpenNow
    ? "Open play happening now"
    : computed?.nextStartLabel
    ? `Next open play: ${computed.nextStartLabel}`
    : "Open play schedule: TBD";

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-header">
          <div className="row" style={{ alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 auto" }}>
              <div className="h1">{court.name}</div>
              <div
                className="p"
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <MapPin size={14} /> {court.address}
              </div>
              <div style={{ marginTop: 10 }}>
                <Pill tone={statusTone}>{statusText}</Pill>
              </div>
            </div>

            <button className="btn btn-small" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <div className="row" style={{ marginTop: 12 }}>
            <button
              className={`btn btn-small ${fav ? "btn-primary" : ""}`}
              onClick={() => {
                toggleFav(court.id);
                pushToast({ title: fav ? "Removed favorite" : "Favorited!", msg: court.name });
              }}
            >
              {fav ? "★ Favorited" : "☆ Favorite"}
            </button>

            <button
              className="btn btn-small"
              onClick={() =>
                pushToast({
                  title: "Mock alert set 🔔",
                  msg: "Real push later (Firebase / OneSignal).",
                })
              }
            >
              <Bell size={16} /> Notify
            </button>

            <a
              className="btn btn-small"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                court.address
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={16} /> Maps
            </a>

            <div className="spacer" />

            <button className="btn btn-small btn-primary" onClick={() => setCrowdOpen(true)}>
              <Users size={16} /> Crowd report
            </button>

            <button className="btn btn-small btn-primary" onClick={() => setGameOpen(true)}>
              <Plus size={16} /> Create game
            </button>
          </div>
        </div>

        <div className="drawer-body">
          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 1000 }}>Open play schedule</div>
            <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
              {(court.openPlay || []).map((s, idx) => (
                <div key={idx} className="row" style={{ justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 900 }}>{s.day}</div>
                  <div className="p">
                    {s.start}–{s.end}
                  </div>
                  <div className="p">{s.level}</div>
                </div>
              ))}
              {!court.openPlay?.length && <div className="p">No schedule set yet.</div>}
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 1000 }}>Crowd (recent)</div>
            <div className="p" style={{ marginTop: 6 }}>
              Avg from last 5 reports: <b>{crowd.avgPlayers}</b> players
            </div>

            <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
              {crowd.recent.map((r) => (
                <div
                  key={r.id}
                  style={{
                    border: "1px solid rgba(226,232,240,0.7)",
                    borderRadius: 16,
                    padding: 10,
                  }}
                >
                  <div className="row">
                    <Pill tone="good">{r.players} players</Pill>
                    <Pill tone="cool">{r.condition}</Pill>
                    <div className="p">{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  {r.note && <div className="p" style={{ marginTop: 6 }}>{r.note}</div>}
                </div>
              ))}
              {!crowd.recent.length && <div className="p">No crowd reports yet. Be the first 😤</div>}
            </div>
          </div>
        </div>
      </div>

      <Modal open={crowdOpen} title="Post crowd report" onClose={() => setCrowdOpen(false)}>
        <div className="row">
          <div style={{ flex: "1 1 160px" }}>
            <div className="p">Players here now</div>
            <input
              className="input"
              type="number"
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
            />
          </div>

          <div style={{ flex: "1 1 160px" }}>
            <div className="p">Court condition</div>
            <select className="input" value={condition} onChange={(e) => setCondition(e.target.value)}>
              {["Good", "Windy", "Wet", "Cracked surface", "Nets missing", "Packed"].map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div className="p">Note</div>
          <input
            className="input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g., 2 paddles waiting, good vibes"
          />
        </div>

        <div className="row" style={{ marginTop: 12, justifyContent: "flex-end" }}>
          <button className="btn" onClick={() => setCrowdOpen(false)}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={() => {
              addCrowdReport({ courtId: court.id, players, note, condition });
              pushToast({ title: "Crowd report posted ✅", msg: "Thanks! Avg updates instantly." });
              setNote("");
              setCrowdOpen(false);
            }}
          >
            Post
          </button>
        </div>
      </Modal>

      <Modal open={gameOpen} title="Create a game" onClose={() => setGameOpen(false)}>
        <div className="row">
          <div style={{ flex: "1 1 260px" }}>
            <div className="p">Title</div>
            <input className="input" value={gTitle} onChange={(e) => setGTitle(e.target.value)} />
          </div>
          <div style={{ flex: "1 1 220px" }}>
            <div className="p">Skill</div>
            <select className="input" value={gSkill} onChange={(e) => setGSkill(e.target.value)}>
              {["All", "Beginner", "Intermediate", "Advanced"].map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <div style={{ flex: "1 1 260px" }}>
            <div className="p">When</div>
            <input className="input" value={gWhen} onChange={(e) => setGWhen(e.target.value)} />
          </div>
          <div style={{ flex: "1 1 160px" }}>
            <div className="p">Max players</div>
            <input
              className="input"
              type="number"
              value={gMax}
              onChange={(e) => setGMax(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div className="p">Your name (host)</div>
          <input className="input" value={gHost} onChange={(e) => setGHost(e.target.value)} />
        </div>

        <div className="row" style={{ marginTop: 12, justifyContent: "flex-end" }}>
          <button className="btn" onClick={() => setGameOpen(false)}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={() => {
              createGame({
                courtId: court.id,
                title: gTitle,
                skill: gSkill,
                whenLabel: gWhen,
                maxPlayers: gMax,
                host: gHost,
              });
              pushToast({ title: "Game created 🎾", msg: "Go to Games tab to manage it." });
              setGameOpen(false);
            }}
          >
            Create
          </button>
        </div>
      </Modal>
    </>
  );
}
