import { useTaskContext } from "../hooks/useTaskContext";

export function TaskStats() {
  const { tasks } = useTaskContext();

  const completed = tasks.filter((task) => task.completed).length;

  const active = tasks.length - completed;

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h2 className="h5">Total</h2>

            <strong className="fs-3">{tasks.length}</strong>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h2 className="h5">Completed</h2>

            <strong className="fs-3">{completed}</strong>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h2 className="h5">Active</h2>

            <strong className="fs-3">{active}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
