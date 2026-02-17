export default function FilterBar({
  island, setIsland,
  skill, setSkill,
  openNowOnly, setOpenNowOnly,
}) {
  return (
    <div className="row" style={{ marginTop: 10 }}>
      <select className="input" style={{ width: 220 }} value={island} onChange={(e)=>setIsland(e.target.value)}>
        {["All","Oʻahu","Maui","Hawaiʻi (Big Island)","Kauaʻi"].map(x => <option key={x} value={x}>{x}</option>)}
      </select>

      <select className="input" style={{ width: 220 }} value={skill} onChange={(e)=>setSkill(e.target.value)}>
        {["All","Beginner","Intermediate","Advanced"].map(x => <option key={x} value={x}>{x}</option>)}
      </select>

      <label className="chip" style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={openNowOnly}
          onChange={(e)=>setOpenNowOnly(e.target.checked)}
        />
        Open now only
      </label>
    </div>
  );
}
