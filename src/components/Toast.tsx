import { useTaskContext } from "../hooks/useTaskContext";

export function Toast() {
  const { toast, pendingDeleteId, undoDelete, hideToast } = useTaskContext();

  if (!toast) {
    return null;
  }

  const canUndo = pendingDeleteId !== null;

  return (
    <div
      className="position-fixed bottom-0 end-0 m-4"
      style={{
        width: "360px",
        zIndex: 1050,
      }}
    >
      <div
        className={`alert shadow-lg mb-0 ${
          toast.type === "success"
            ? "alert-success"
            : toast.type === "error"
              ? "alert-danger"
              : "alert-dark"
        }`}
      >
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <strong>{toast.text}</strong>

            {canUndo && (
              <div className="small mt-1">Undo cancels the deletion.</div>
            )}
          </div>

          {canUndo ? (
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={undoDelete}
            >
              Undo
            </button>
          ) : (
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={hideToast}
            />
          )}
        </div>

        {canUndo && (
          <div className="progress mt-3">
            <div
              key={toast.id}
              className="progress-bar bg-danger delete-progress"
            />
          </div>
        )}
      </div>
    </div>
  );
}
