import { useEffect, useState } from "react";
import { getDarkMode, setDarkMode } from "../store/settingsStore";
import { pushToast } from "../components/ToastHost";

export default function Settings() {
  const [dark, setDark] = useState(getDarkMode());

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    setDarkMode(dark);
  }, [dark]);

  return (
    <div className="container">
      <div className="card">
        <div className="h1">Settings</div>
        <div className="p">Make it feel like an app you’d actually keep.</div>
      </div>

      <div style={{ height: 14 }} />

      <div className="card">
        <div className="row">
          <div style={{ fontWeight: 1000 }}>Dark mode</div>
          <div className="spacer" />
          <button
            className={`btn ${dark ? "btn-primary" : ""}`}
            onClick={() => {
              setDark(v => !v);
              pushToast({ title: "Theme updated ✨" });
            }}
          >
            {dark ? "On" : "Off"}
          </button>
        </div>

        <div className="p" style={{ marginTop: 8 }}>
          This is stored in localStorage. Later you can sync per-user.
        </div>
      </div>
    </div>
  );
}
