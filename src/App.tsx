import { useState } from "react";

import { Header } from "./components/Header";
import { TaskFilters } from "./components/TaskFilters";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";
import { initialTasks } from "./data/initialTasks";

import type { Task, TaskFilter } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [filter, setFilter] = useState<TaskFilter>("all");

  const [search, setSearch] = useState("");

  function addTask(task: Task) {
    setTasks((currentTasks) => [...currentTasks, task]);
  }

  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  }

  function deleteTask(id: number) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

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

  const completedCount = tasks.filter((task) => task.completed).length;

  const activeCount = tasks.length - completedCount;

  return (
    <main className="container py-5">
      <Header />

      <TaskStats
        total={tasks.length}
        completed={completedCount}
        active={activeCount}
      />

      <TaskForm onAddTask={addTask} />

      <div className="mb-3">
        <label htmlFor="search" className="form-label">
          Search tasks
        </label>

        <input
          id="search"
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <TaskFilters filter={filter} onFilterChange={setFilter} />

      <TaskList
        tasks={filteredTasks}
        hasAnyTasks={tasks.length > 0}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </main>
  );
}

export default App;
