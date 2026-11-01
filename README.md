# Study Planner

Study Planner is a simple React application created for Laboratory Work №8.

The project demonstrates the fundamentals of React development using components, JSX, props, state, events, conditional rendering, and lists.

## Technologies

- React 19
- TypeScript
- Vite
- Bootstrap
- ESLint

## Features

- Display a list of study tasks
- Add new tasks
- Mark tasks as completed or active
- Delete tasks
- Filter tasks by:
  - All
  - Active
  - Completed
- Display task statistics:
  - Total tasks
  - Completed tasks
  - Active tasks
- Form validation for the task title
- Visual distinction for completed tasks

## Task model

Each task contains:

- `id`
- `title`
- `description`
- `completed`
- `priority`
- `category`

Available priorities:

- `low`
- `medium`
- `high`

## Project structure

```text
src/
├── components/
│   ├── Header.tsx
│   ├── TaskFilters.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   └── TaskStats.tsx
├── data/
│   └── initialTasks.ts
├── types/
│   └── task.ts
├── App.tsx
├── index.css
└── main.tsx
```

## React concepts used

The project demonstrates:

- Functional components
- JSX / TSX
- Props
- Callback functions
- `useState`
- Event handling
- Conditional rendering
- Rendering lists with `map`
- Stable `key` values
- Immutable state updates using `map`, `filter`, and spread syntax

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

## Git branch

```text
feature/react-fundamentals
```

## Author

Sebastian Burla
