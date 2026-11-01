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
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "active") {
      return !task.completed;
    }

    return true;
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
