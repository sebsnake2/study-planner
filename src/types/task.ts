export type TaskPriority = "low" | "medium" | "high";

export type TaskFilter = "all" | "active" | "completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  category: string;
}
