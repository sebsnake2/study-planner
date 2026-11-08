import { useTaskContext } from "../hooks/useTaskContext";

import type { TaskFilter } from "../types/task";

export function TaskFilters() {
  const { filter, setFilter } = useTaskContext();

  const filters: TaskFilter[] = ["all", "active", "completed"];

  return (
    <div className="d-flex gap-2 mb-4">
      {filters.map((item) => (
        <button
          key={item}
          type="button"
          className={`btn ${
            filter === item ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}
