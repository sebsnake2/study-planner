import { createContext } from "react";

import type { Task, TaskFilter, ToastMessage } from "../types/task";

export interface TaskContextValue {
  tasks: Task[];
  filter: TaskFilter;
  search: string;
  toast: ToastMessage | null;
  pendingDeleteId: number | null;

  setFilter: (filter: TaskFilter) => void;
  setSearch: (search: string) => void;

  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleTask: (id: number) => void;

  requestDelete: (id: number) => void;
  undoDelete: () => void;

  resetTasks: () => void;
  hideToast: () => void;
}

export const TaskContext = createContext<TaskContextValue | null>(null);
