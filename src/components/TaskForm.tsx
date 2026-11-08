import { useState, type FormEvent } from "react";

import { useTaskContext } from "../hooks/useTaskContext";

import type { Task, TaskPriority } from "../types/task";

interface TaskFormProps {
  editingTask: Task | null;
  onCancelEdit: () => void;
  onFinishEdit: () => void;
}

export function TaskForm({
  editingTask,
  onCancelEdit,
  onFinishEdit,
}: TaskFormProps) {
  const { addTask, updateTask } = useTaskContext();

  const [title, setTitle] = useState(editingTask?.title ?? "");

  const [description, setDescription] = useState(
    editingTask?.description ?? "",
  );

  const [category, setCategory] = useState(editingTask?.category ?? "");

  const [priority, setPriority] = useState<TaskPriority>(
    editingTask?.priority ?? "medium",
  );

  const [error, setError] = useState("");

  function resetForm() {
    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("medium");
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (editingTask) {
      updateTask({
        ...editingTask,
        title: title.trim(),
        description: description.trim(),
        category: category.trim() || "General",
        priority,
      });

      resetForm();
      onFinishEdit();

      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority,
      category: category.trim() || "General",
    };

    addTask(newTask);
    resetForm();
  }

  function handleCancel() {
    resetForm();
    onCancelEdit();
  }

  return (
    <form className="card shadow-sm mb-4" onSubmit={handleSubmit}>
      <div className="card-body">
        <h2 className="h4 mb-3">
          {editingTask ? "Edit task" : "Add new task"}
        </h2>

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

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editingTask ? "Save changes" : "Add task"}
          </button>

          {editingTask && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
