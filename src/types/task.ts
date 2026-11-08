export type TaskPriority = "low" | "medium" | "high";

export type TaskFilter = "all" | "active" | "completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  category: string;
  pendingDelete?: boolean;
}

export interface ToastMessage {
  id: number;
  text: string;
  type: "success" | "error" | "info";
}

export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  search: string;
  toast: ToastMessage | null;
  pendingDeleteId: number | null;
}

export type TaskAction =
  | {
      type: "add";
      payload: Task;
    }
  | {
      type: "toggle";
      payload: number;
    }
  | {
      type: "update";
      payload: Task;
    }
  | {
      type: "setFilter";
      payload: TaskFilter;
    }
  | {
      type: "setSearch";
      payload: string;
    }
  | {
      type: "requestDelete";
      payload: number;
    }
  | {
      type: "undoDelete";
    }
  | {
      type: "confirmDelete";
      payload: number;
    }
  | {
      type: "reset";
      payload: Task[];
    }
  | {
      type: "showToast";
      payload: ToastMessage;
    }
  | {
      type: "hideToast";
    };
