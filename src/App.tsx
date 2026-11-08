import { useState } from "react";

import { Header } from "./components/Header";
import { TaskFilters } from "./components/TaskFilters";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";
import { Toast } from "./components/Toast";
import { useTaskContext } from "./hooks/useTaskContext";

import type { Task } from "./types/task";

function App() {
  const { search, setSearch, resetTasks } = useTaskContext();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <main className="container py-5">
      <Header />

      <TaskStats />

      <TaskForm
        key={editingTask?.id ?? "new"}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
        onFinishEdit={() => setEditingTask(null)}
      />

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button
          type="button"
          className="btn btn-outline-secondary text-nowrap"
          onClick={resetTasks}
        >
          Reset data
        </button>
      </div>

      <TaskFilters />

      <TaskList onEdit={(task) => setEditingTask(task)} />

      <Toast />
    </main>
  );
}

export default App;
