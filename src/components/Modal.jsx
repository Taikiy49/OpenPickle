export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal" role="dialog" aria-modal="true">
        <div className="row">
          <div className="modal-title">{title}</div>
          <div className="spacer" />
          <button className="btn btn-small" onClick={onClose}>Close</button>
        </div>
        <div className="hr" />
        {children}
      </div>
    </>
  );
}
