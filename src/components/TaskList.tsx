import { useTaskContext } from "../hooks/useTaskContext";
import { TaskItem } from "./TaskItem";

import type { Task } from "../types/task";

interface TaskListProps {
  onEdit: (task: Task) => void;
}

export function TaskList({ onEdit }: TaskListProps) {
  const { tasks, filter, search } = useTaskContext();

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "completed"
        ? task.completed
        : filter === "active"
          ? !task.completed
          : true;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (tasks.length === 0) {
    return (
      <div className="alert alert-info">
        No tasks yet. Add your first learning task.
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="alert alert-secondary">
        No tasks match your search or filter.
      </div>
    );
  }

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
}
