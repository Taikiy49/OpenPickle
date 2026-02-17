import clsx from "clsx";

export default function Pill({ tone = "neutral", children }) {
  return (
    <span className={clsx("pill", tone === "good" && "good", tone === "warn" && "warn", tone === "cool" && "cool")}>
      {children}
    </span>
  );
}
