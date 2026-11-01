import type { TaskFilter } from "../types/task";

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export function TaskFilters({ filter, onFilterChange }: TaskFiltersProps) {
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
          onClick={() => onFilterChange(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}
