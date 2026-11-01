import type { Task } from "../types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  hasAnyTasks: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskList({
  tasks,
  hasAnyTasks,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (!hasAnyTasks) {
    return (
      <div className="alert alert-info">
        No tasks yet. Add your first learning task.
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="alert alert-secondary">
        No tasks match your search or filter.
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
