import { useMemo, useState } from "react";
import { loadGames, joinGame, leaveGame, deleteGame } from "../store/gamesStore";
import { loadCourts } from "../store/courtsStore";
import { pushToast } from "../components/ToastHost";

export default function Games() {
  const [name, setName] = useState("You");
  const [refresh, setRefresh] = useState(0);

  const games = useMemo(() => loadGames(), []);
  const courts = useMemo(() => loadCourts(), []);

  const courtName = (id) => courts.find(c => c.id === id)?.name || "Unknown court";

  return (
    <div className="container">
      <div className="card">
        <div className="row">
          <div>
            <div className="h1">Games</div>
            <div className="p">Create & join sessions. (Saved locally for now.)</div>
          </div>
          <div className="spacer" />
          <div style={{ width: 220 }}>
            <div className="p">Your name</div>
            <input className="input" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
        </div>
      </div>

      <div style={{ height: 14 }} />

      {!games.length ? (
        <div className="card">
          <div className="h1">No games yet</div>
          <div className="p">Open any court and tap “Create game”.</div>
        </div>
      ) : (
        games.map(g => (
          <div key={g.id} className="card" style={{ marginBottom: 12 }}>
            <div className="row" style={{ alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 auto" }}>
                <div style={{ fontWeight: 1000 }}>{g.title}</div>
                <div className="p" style={{ marginTop: 6 }}>
                  <b>{courtName(g.courtId)}</b> • {g.whenLabel} • Skill: {g.skill}
                </div>
                <div className="p" style={{ marginTop: 6 }}>
                  Players ({g.players.length}/{g.maxPlayers}): {g.players.join(", ") || "None yet"}
                </div>
              </div>

              <div className="row">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    joinGame(g.id, name);
                    pushToast({ title: "Joined game ✅", msg: g.title });
                    setRefresh(x => x + 1);
                  }}
                >
                  Join
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    leaveGame(g.id, name);
                    pushToast({ title: "Left game", msg: g.title });
                    setRefresh(x => x + 1);
                  }}
                >
                  Leave
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteGame(g.id);
                    pushToast({ title: "Deleted game", msg: g.title });
                    setRefresh(x => x + 1);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
