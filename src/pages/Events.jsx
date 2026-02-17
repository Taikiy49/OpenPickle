import { useMemo, useState } from "react";
import { loadEvents, addEvent, deleteEvent } from "../store/eventsStore";
import { pushToast } from "../components/ToastHost";

export default function Events() {
  const [setRefresh] = useState(0);
  const events = useMemo(() => loadEvents(), []);

  const [title, setTitle] = useState("Community Round Robin");
  const [island, setIsland] = useState("Oʻahu");
  const [date, setDate] = useState("2026-03-15");
  const [place, setPlace] = useState("Honolulu");
  const [details, setDetails] = useState("Bring paddle + water.");

  return (
    <div className="container">
      <div className="card">
        <div className="h1">Events</div>
        <div className="p">Clinics, tournaments, meetups (local for now).</div>
      </div>

      <div style={{ height: 14 }} />

      <div className="card">
        <div style={{ fontWeight: 1000 }}>Add event (admin-ish)</div>
        <div className="row" style={{ marginTop: 10 }}>
          <input className="input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" />
          <select className="input" style={{ width: 220 }} value={island} onChange={(e)=>setIsland(e.target.value)}>
            {["Oʻahu","Maui","Hawaiʻi (Big Island)","Kauaʻi"].map(x => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <input className="input" style={{ width: 220 }} type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
          <input className="input" value={place} onChange={(e)=>setPlace(e.target.value)} placeholder="Place" />
        </div>
        <div style={{ marginTop: 10 }}>
          <input className="input" value={details} onChange={(e)=>setDetails(e.target.value)} placeholder="Details" />
        </div>

        <div className="row" style={{ marginTop: 12, justifyContent: "flex-end" }}>
          <button
            className="btn btn-primary"
            onClick={() => {
              addEvent({ title, island, date, place, details });
              pushToast({ title: "Event added 📅", msg: title });
              setRefresh(x => x + 1);
            }}
          >
            Add
          </button>
        </div>
      </div>

      <div style={{ height: 14 }} />

      {events.map(e => (
        <div key={e.id} className="card" style={{ marginBottom: 12 }}>
          <div className="row" style={{ alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 auto" }}>
              <div style={{ fontWeight: 1000 }}>{e.title}</div>
              <div className="p" style={{ marginTop: 6 }}>
                {e.date} • {e.island} • {e.place}
              </div>
              <div className="p" style={{ marginTop: 6 }}>{e.details}</div>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteEvent(e.id);
                pushToast({ title: "Event deleted", msg: e.title });
                setRefresh(x => x + 1);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
