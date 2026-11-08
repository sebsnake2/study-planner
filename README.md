# Study Planner

Study Planner is a React + TypeScript application developed as part of Laboratory Works №8–9.

The project started as a simple task planner and was extended with centralized state management, Context API, `useReducer`, persistence, custom hooks, side effects, task editing, toast notifications, and undoable deletion.

## Technologies

- React 19
- TypeScript
- Vite
- Bootstrap
- ESLint

## Features

- Display study tasks
- Add new tasks
- Edit existing tasks
- Mark tasks as completed or active
- Search tasks by title
- Filter tasks by:
  - All
  - Active
  - Completed
- Display task statistics:
  - Total
  - Completed
  - Active
- Reset tasks to initial data
- Persist tasks in `localStorage`
- Persist the active filter
- Toast notifications
- Undoable task deletion with a 5-second timer
- Visual countdown for pending deletion
- Browser tab title synchronized with the number of active tasks
- Form validation for required task titles
- Visual distinction for completed and pending-deletion tasks

## Task model

Each task contains:

- `id`
- `title`
- `description`
- `completed`
- `priority`
- `category`
- optional `pendingDelete`

Available priorities:

- `low`
- `medium`
- `high`

## State management

The main application state is managed with React `useReducer`.

The reducer handles actions such as:

- `add`
- `toggle`
- `update`
- `setFilter`
- `setSearch`
- `requestDelete`
- `undoDelete`
- `confirmDelete`
- `reset`
- `showToast`
- `hideToast`

Components do not modify task state directly. State changes are performed through reducer actions.

## Context API

`TaskContext` and `TaskProvider` provide shared application state and actions to components without passing the same props through multiple component levels.

Components access the shared state through the custom hook:

```ts
useTaskContext();
```

## Custom hooks

The project contains reusable custom hooks:

### `useTaskContext`

Provides safe access to `TaskContext`.

### `useLocalStorage`

Encapsulates reusable logic for reading and writing JSON data in browser `localStorage`.

## Persistence

Tasks are stored in:

```text
study-planner-tasks
```

The active filter is stored in:

```text
study-planner-filter
```

When the page is reloaded, saved data is restored automatically.

If stored JSON cannot be parsed, the application falls back to the initial task data.

## Side effects

`useEffect` is used only for side effects, including:

- synchronizing tasks with `localStorage`
- synchronizing the active filter with `localStorage`
- updating the browser tab title
- controlling the Undoable Delete timer
- automatically hiding toast notifications
- cleaning up timers with `clearTimeout`

Derived values such as filtered tasks and task statistics are calculated during rendering and are not stored as separate state.

## Undoable Delete

Task deletion is not immediate.

When the user presses **Delete**:

1. The task enters a pending deletion state.
2. A toast notification is displayed.
3. A 5-second countdown starts.
4. The user can press **Undo** to cancel deletion.
5. If the timer finishes, the task is permanently removed.

Only one pending deletion is supported at a time.

Pending deletion is not persisted between page reloads.

## Project structure

```text
src/
├── components/
│   ├── Header.tsx
│   ├── TaskFilters.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   ├── TaskStats.tsx
│   └── Toast.tsx
│
├── context/
│   ├── task-context.ts
│   └── TaskContext.tsx
│
├── hooks/
│   ├── useLocalStorage.ts
│   └── useTaskContext.ts
│
├── reducers/
│   └── taskReducer.ts
│
├── data/
│   └── initialTasks.ts
│
├── types/
│   └── task.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

## React concepts demonstrated

The application demonstrates:

- Functional components
- JSX / TSX
- Props
- Callback functions
- `useState`
- `useReducer`
- Context API
- `useContext`
- `useEffect`
- Custom hooks
- Event handling
- Conditional rendering
- Rendering lists with `map`
- Stable `key` values
- Immutable state updates
- Derived state
- Browser API synchronization
- Effect cleanup

## Installation

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

## Laboratory branches

Laboratory Work №8:

```text
feature/react-fundamentals
```

Laboratory Work №9:

```text
feature/state-effects
```

## Author

Sebastian Burla
