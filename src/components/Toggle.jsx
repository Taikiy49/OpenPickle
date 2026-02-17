import clsx from "clsx";

export default function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 select-none"
      aria-pressed={checked}
    >
      <span
        className={clsx(
          "relative inline-flex h-6 w-11 items-center rounded-full transition border",
          checked
            ? "bg-indigo-500 border-indigo-500 shadow-glow"
            : "bg-slate-200 border-slate-200"
        )}
      >
        <span
          className={clsx(
            "inline-block h-5 w-5 transform rounded-full bg-white transition shadow",
            checked ? "translate-x-5" : "translate-x-1"
          )}
        />
      </span>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </button>
  );
}
