import { useEffect, useState } from "react";

let pushToastFn = null;

export function pushToast(t) {
  if (pushToastFn) pushToastFn(t);
}

export default function ToastHost() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    pushToastFn = (t) => {
      const id = `${Date.now()}_${Math.random()}`;
      setToasts((prev) => [{ id, ...t }, ...prev].slice(0, 4));
      setTimeout(() => {
        setToasts((prev) => prev.filter(x => x.id !== id));
      }, t?.ms || 2400);
    };
    return () => { pushToastFn = null; };
  }, []);

  return (
    <div className="toast-host">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <div className="toast-title">{t.title || "Hey!"}</div>
          {t.msg && <div className="toast-msg">{t.msg}</div>}
        </div>
      ))}
    </div>
  );
}
