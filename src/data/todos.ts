export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  createdAt: Date;
}

export const mockTodos: Todo[] = [
  {
    id: "1",
    title: "Review design mockups",
    completed: false,
    priority: "high",
    dueDate: new Date(),
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: "2",
    title: "Prepare presentation slides",
    completed: false,
    priority: "high",
    dueDate: new Date(Date.now() + 86400000),
    createdAt: new Date(Date.now() - 172800000),
  },
  {
    id: "3",
    title: "Update project documentation",
    completed: true,
    priority: "medium",
    createdAt: new Date(Date.now() - 259200000),
  },
  {
    id: "4",
    title: "Schedule team sync",
    completed: false,
    priority: "medium",
    dueDate: new Date(Date.now() + 172800000),
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: "5",
    title: "Review pull requests",
    completed: false,
    priority: "low",
    createdAt: new Date(Date.now() - 43200000),
  },
  {
    id: "6",
    title: "Send weekly report",
    completed: true,
    priority: "medium",
    createdAt: new Date(Date.now() - 345600000),
  },
];

export function getPendingTodos(): Todo[] {
  return mockTodos.filter((todo) => !todo.completed);
}

export function getCompletedTodos(): Todo[] {
  return mockTodos.filter((todo) => todo.completed);
}

export function getTodosByPriority(priority: Todo["priority"]): Todo[] {
  return mockTodos.filter((todo) => todo.priority === priority);
}
