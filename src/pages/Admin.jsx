import { useMemo, useState } from "react";
import { loadCourts, saveCourts } from "../store/courtsStore";
import { uid } from "../utils/id";
import { pushToast } from "../components/ToastHost";

export default function Admin() {
  const [refresh, setRefresh] = useState(0);
  const courts = useMemo(() => loadCourts(), [refresh]);

  const [editingId, setEditingId] = useState(courts[0]?.id || null);

  const current = courts.find(c => c.id === editingId) || null;
  const [draft, setDraft] = useState(current || null);

  // When selection changes, copy into draft
  const selectCourt = (id) => {
    setEditingId(id);
    const c = courts.find(x => x.id === id);
    setDraft(JSON.parse(JSON.stringify(c)));
  };

  const update = (k, v) => setDraft(d => ({ ...d, [k]: v }));

  const save = () => {
    const next = courts.map(c => c.id === draft.id ? draft : c);
    saveCourts(next);
    pushToast({ title: "Saved ✅", msg: draft.name });
    setRefresh(x => x + 1);
  };

  const addNew = () => {
    const newCourt = {
      id: uid("court"),
      name: "New Court",
      island: "Oʻahu",
      city: "Honolulu",
      address: "",
      lat: 21.3,
      lng: -157.9,
      courts: 4,
      surface: "Outdoor",
      lights: false,
      covered: false,
      skillLevels: ["Beginner","Intermediate"],
      communityScore: 4.0,
      openPlay: [{ day:"Sat", start:"8:00 AM", end:"10:00 AM", level:"All levels" }],
    };
    const next = [newCourt, ...courts];
    saveCourts(next);
    pushToast({ title: "Added court", msg: newCourt.name });
    setRefresh(x => x + 1);
    selectCourt(newCourt.id);
  };

  const remove = (id) => {
    const c = courts.find(x => x.id === id);
    const next = courts.filter(x => x.id !== id);
    saveCourts(next);
    pushToast({ title: "Deleted court", msg: c?.name || "" });
    setRefresh(x => x + 1);
    setEditingId(next[0]?.id || null);
    setDraft(next[0] ? JSON.parse(JSON.stringify(next[0])) : null);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="h1">Admin</div>
        <div className="p">Edit courts + schedules (stored in localStorage).</div>
      </div>

      <div style={{ height: 14 }} />

      <div className="row" style={{ alignItems: "stretch" }}>
        <div className="card" style={{ flex: "1 1 340px", padding: 14 }}>
          <div className="row">
            <div style={{ fontWeight: 1000 }}>Courts</div>
            <div className="spacer" />
            <button className="btn btn-primary btn-small" onClick={addNew}>+ Add</button>
          </div>

          <div style={{ marginTop: 10 }}>
            {courts.map(c => (
              <button
                key={c.id}
                className={`court-item ${editingId === c.id ? "selected" : ""}`}
                onClick={() => selectCourt(c.id)}
              >
                <div style={{ fontWeight: 1000 }}>{c.name}</div>
                <div className="p">{c.city} • {c.island}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ flex: "2 1 520px", padding: 14 }}>
          {!draft ? (
            <div className="p">No court selected.</div>
          ) : (
            <>
              <div className="row">
                <div style={{ fontWeight: 1000 }}>Edit court</div>
                <div className="spacer" />
                <button className="btn btn-danger btn-small" onClick={() => remove(draft.id)}>Delete</button>
                <button className="btn btn-primary btn-small" onClick={save}>Save</button>
              </div>

              <div className="row" style={{ marginTop: 10 }}>
                <input className="input" value={draft.name} onChange={(e)=>update("name", e.target.value)} placeholder="Name" />
                <input className="input" value={draft.city} onChange={(e)=>update("city", e.target.value)} placeholder="City" style={{ width: 220 }} />
              </div>

              <div className="row" style={{ marginTop: 10 }}>
                <select className="input" style={{ width: 220 }} value={draft.island} onChange={(e)=>update("island", e.target.value)}>
                  {["Oʻahu","Maui","Hawaiʻi (Big Island)","Kauaʻi"].map(x => <option key={x} value={x}>{x}</option>)}
                </select>
                <input className="input" value={draft.address} onChange={(e)=>update("address", e.target.value)} placeholder="Address" />
              </div>

              <div className="row" style={{ marginTop: 10 }}>
                <input className="input" type="number" value={draft.lat} onChange={(e)=>update("lat", Number(e.target.value))} placeholder="Lat" />
                <input className="input" type="number" value={draft.lng} onChange={(e)=>update("lng", Number(e.target.value))} placeholder="Lng" />
                <input className="input" type="number" value={draft.courts} onChange={(e)=>update("courts", Number(e.target.value))} placeholder="# courts" />
              </div>

              <div className="row" style={{ marginTop: 10 }}>
                <label className="chip">
                  <input type="checkbox" checked={!!draft.lights} onChange={(e)=>update("lights", e.target.checked)} />
                  Lights
                </label>
                <label className="chip">
                  <input type="checkbox" checked={!!draft.covered} onChange={(e)=>update("covered", e.target.checked)} />
                  Covered
                </label>
              </div>

              <div style={{ marginTop: 12, fontWeight: 1000 }}>Open play schedule</div>
              <div className="p">Edit the first schedule row (simple MVP).</div>

              {draft.openPlay?.[0] && (
                <div className="row" style={{ marginTop: 10 }}>
                  <select
                    className="input"
                    style={{ width: 140 }}
                    value={draft.openPlay[0].day}
                    onChange={(e)=>{
                      const next = [...draft.openPlay];
                      next[0] = { ...next[0], day: e.target.value };
                      update("openPlay", next);
                    }}
                  >
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(x => <option key={x} value={x}>{x}</option>)}
                  </select>

                  <input
                    className="input"
                    style={{ width: 160 }}
                    value={draft.openPlay[0].start}
                    onChange={(e)=>{
                      const next = [...draft.openPlay];
                      next[0] = { ...next[0], start: e.target.value };
                      update("openPlay", next);
                    }}
                    placeholder="Start (e.g. 5:30 PM)"
                  />

                  <input
                    className="input"
                    style={{ width: 160 }}
                    value={draft.openPlay[0].end}
                    onChange={(e)=>{
                      const next = [...draft.openPlay];
                      next[0] = { ...next[0], end: e.target.value };
                      update("openPlay", next);
                    }}
                    placeholder="End (e.g. 8:30 PM)"
                  />

                  <input
                    className="input"
                    value={draft.openPlay[0].level}
                    onChange={(e)=>{
                      const next = [...draft.openPlay];
                      next[0] = { ...next[0], level: e.target.value };
                      update("openPlay", next);
                    }}
                    placeholder="Level"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
