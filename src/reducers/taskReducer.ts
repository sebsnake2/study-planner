import type { TaskAction, TaskState } from "../types/task";

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "add":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "toggle":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                completed: !task.completed,
              }
            : task,
        ),
      };

    case "update":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };

    case "setFilter":
      return {
        ...state,
        filter: action.payload,
      };

    case "setSearch":
      return {
        ...state,
        search: action.payload,
      };

    case "requestDelete":
      return {
        ...state,
        pendingDeleteId: action.payload,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                pendingDelete: true,
              }
            : task,
        ),
      };

    case "undoDelete":
      return {
        ...state,
        pendingDeleteId: null,
        tasks: state.tasks.map((task) => ({
          ...task,
          pendingDelete: false,
        })),
      };

    case "confirmDelete":
      return {
        ...state,
        pendingDeleteId: null,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "reset":
      return {
        ...state,
        tasks: action.payload,
      };

    case "showToast":
      return {
        ...state,
        toast: action.payload,
      };

    case "hideToast":
      return {
        ...state,
        toast: null,
      };

    default:
      return state;
  }
}
