import { useState } from "react";

import type { Task, TaskPriority } from "../types/task";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || "General",
      priority,
      completed: false,
    };

    onAddTask(newTask);

    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("medium");
    setError("");
  }

  return (
    <form className="card shadow-sm mb-4" onSubmit={handleSubmit}>
      <div className="card-body">
        <h2 className="h4 mb-3">Add new task</h2>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>

          <input
            id="title"
            className={`form-control ${error ? "is-invalid" : ""}`}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder="Enter task title"
          />

          {error && <div className="invalid-feedback">{error}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>

          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Short description"
          />
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="category" className="form-label">
              Category
            </label>

            <input
              id="category"
              className="form-control"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="React, TypeScript..."
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>

            <select
              id="priority"
              className="form-select"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as TaskPriority)
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add task
        </button>
      </div>
    </form>
  );
}
