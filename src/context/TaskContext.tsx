import { useEffect, useReducer, type ReactNode } from "react";

import { initialTasks } from "../data/initialTasks";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { taskReducer } from "../reducers/taskReducer";

import type { Task, TaskFilter, TaskState, ToastMessage } from "../types/task";

import { TaskContext, type TaskContextValue } from "./task-context";

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const taskStorage = useLocalStorage<Task[]>(
    "study-planner-tasks",
    initialTasks,
  );

  const filterStorage = useLocalStorage<TaskFilter>(
    "study-planner-filter",
    "all",
  );

  const [state, dispatch] = useReducer(
    taskReducer,
    undefined,
    (): TaskState => {
      const savedTasks = taskStorage.read().map((task) => ({
        ...task,
        pendingDelete: false,
      }));

      return {
        tasks: savedTasks,
        filter: filterStorage.read(),
        search: "",
        toast: null,
        pendingDeleteId: null,
      };
    },
  );

  useEffect(() => {
    const tasksToSave = state.tasks.map((task) => ({
      ...task,
      pendingDelete: false,
    }));

    taskStorage.write(tasksToSave);
  }, [state.tasks, taskStorage]);

  useEffect(() => {
    filterStorage.write(state.filter);
  }, [state.filter, filterStorage]);

  useEffect(() => {
    const activeCount = state.tasks.filter((task) => !task.completed).length;

    document.title = `Study Planner — ${activeCount} active tasks`;
  }, [state.tasks]);

  useEffect(() => {
    if (state.pendingDeleteId === null) {
      return;
    }

    const taskId = state.pendingDeleteId;

    const timer = window.setTimeout(() => {
      dispatch({
        type: "confirmDelete",
        payload: taskId,
      });

      showToast("Task deleted.", "success");
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [state.pendingDeleteId]);

  useEffect(() => {
    if (!state.toast || state.pendingDeleteId !== null) {
      return;
    }

    const timer = window.setTimeout(() => {
      dispatch({
        type: "hideToast",
      });
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [state.toast, state.pendingDeleteId]);

  function showToast(text: string, type: ToastMessage["type"]) {
    dispatch({
      type: "showToast",
      payload: {
        id: Date.now(),
        text,
        type,
      },
    });
  }

  function hideToast() {
    dispatch({
      type: "hideToast",
    });
  }

  function setFilter(filter: TaskFilter) {
    dispatch({
      type: "setFilter",
      payload: filter,
    });
  }

  function setSearch(search: string) {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }

  function addTask(task: Task) {
    dispatch({
      type: "add",
      payload: task,
    });

    showToast("Task created successfully.", "success");
  }

  function updateTask(task: Task) {
    dispatch({
      type: "update",
      payload: task,
    });

    showToast("Task updated successfully.", "success");
  }

  function toggleTask(id: number) {
    dispatch({
      type: "toggle",
      payload: id,
    });
  }

  function requestDelete(id: number) {
    if (state.pendingDeleteId !== null) {
      showToast("Finish or undo the current deletion first.", "error");

      return;
    }

    dispatch({
      type: "requestDelete",
      payload: id,
    });

    showToast("Task will be deleted in 5 seconds.", "info");
  }

  function undoDelete() {
    dispatch({
      type: "undoDelete",
    });

    showToast("Deletion cancelled.", "info");
  }

  function resetTasks() {
    dispatch({
      type: "reset",
      payload: initialTasks,
    });

    showToast("Tasks reset to initial data.", "info");
  }

  const value: TaskContextValue = {
    tasks: state.tasks,
    filter: state.filter,
    search: state.search,
    toast: state.toast,
    pendingDeleteId: state.pendingDeleteId,

    setFilter,
    setSearch,

    addTask,
    updateTask,
    toggleTask,

    requestDelete,
    undoDelete,

    resetTasks,
    hideToast,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
