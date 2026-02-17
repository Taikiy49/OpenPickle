export default function SegmentedControl({ value, onChange, options = ["Map","List"] }) {
  return (
    <div className="segment">
      {options.map(opt => (
        <button
          key={opt}
          className={value === opt ? "active" : ""}
          onClick={() => onChange(opt)}
          type="button"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
