import type { Task } from "../types/task";

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "React Components",
    description: "Learn the basic principles of React components",
    completed: false,
    priority: "high",
    category: "React",
  },
  {
    id: 2,
    title: "TypeScript Exercises",
    description: "Complete practical TypeScript exercises",
    completed: true,
    priority: "medium",
    category: "TypeScript",
  },
  {
    id: 3,
    title: "JSX Practice",
    description: "Practice rendering elements with JSX",
    completed: false,
    priority: "low",
    category: "React",
  },
];
