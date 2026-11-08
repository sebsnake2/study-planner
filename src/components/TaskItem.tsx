import { useTaskContext } from "../hooks/useTaskContext";

import type { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onEdit }: TaskItemProps) {
  const { toggleTask, requestDelete, pendingDeleteId } = useTaskContext();

  const isPendingDelete = pendingDeleteId === task.id;

  return (
    <div
      className={`card mb-3 shadow-sm ${task.completed ? "opacity-75" : ""} ${
        isPendingDelete ? "border-danger opacity-50" : ""
      }`}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between gap-3">
          <div>
            <h3
              className={`h5 ${
                task.completed ? "text-decoration-line-through" : ""
              }`}
            >
              {task.title}
            </h3>

            <p className="mb-2">{task.description}</p>

            <div className="d-flex gap-2 flex-wrap">
              <span className="badge text-bg-secondary">{task.category}</span>

              <span
                className={`badge ${
                  task.priority === "high"
                    ? "text-bg-danger"
                    : task.priority === "medium"
                      ? "text-bg-warning"
                      : "text-bg-success"
                }`}
              >
                {task.priority}
              </span>

              {isPendingDelete && (
                <span className="badge text-bg-danger">Pending deletion</span>
              )}
            </div>
          </div>

          <div className="d-flex gap-2 align-items-start flex-wrap">
            <button
              type="button"
              className={`btn btn-sm ${
                task.completed ? "btn-outline-secondary" : "btn-outline-success"
              }`}
              disabled={isPendingDelete}
              onClick={() => toggleTask(task.id)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              disabled={isPendingDelete}
              onClick={() => onEdit(task)}
            >
              Edit
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              disabled={isPendingDelete}
              onClick={() => requestDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
