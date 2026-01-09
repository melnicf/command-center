import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string; // ISO date string for persistence
  type: "meeting" | "task" | "reminder" | "event";
  location?: string;
  description?: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string; // ISO date string for persistence
  createdAt: string;
}

interface CalendarState {
  events: CalendarEvent[];
  todos: Todo[];
  // Event actions
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  // Todo actions
  addTodo: (todo: Omit<Todo, "id" | "createdAt">) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  // Getters
  getTodayEvents: () => CalendarEvent[];
  getUpcomingEvents: (limit?: number) => CalendarEvent[];
  getPendingTodos: () => Todo[];
  getCompletedTodos: () => Todo[];
}

// Helper to generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Initial sample data
const getInitialEvents = (): CalendarEvent[] => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  
  return [
    {
      id: generateId(),
      title: "Team Standup",
      startTime: "09:00",
      endTime: "09:30",
      date: todayStr,
      type: "meeting",
      location: "Zoom",
      description: "Daily team sync-up",
    },
    {
      id: generateId(),
      title: "Project Review",
      startTime: "11:00",
      endTime: "12:00",
      date: todayStr,
      type: "meeting",
      location: "Conference Room A",
      description: "Quarterly project progress review",
    },
  ];
};

const getInitialTodos = (): Todo[] => {
  const today = new Date();
  const todayStr = today.toISOString();
  const tomorrowStr = new Date(today.getTime() + 86400000).toISOString();

  return [
    {
      id: generateId(),
      title: "Review design mockups",
      completed: false,
      priority: "high",
      dueDate: todayStr,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: generateId(),
      title: "Prepare presentation slides",
      completed: false,
      priority: "high",
      dueDate: tomorrowStr,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: generateId(),
      title: "Update project documentation",
      completed: true,
      priority: "medium",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
    },
  ];
};

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      events: getInitialEvents(),
      todos: getInitialTodos(),

      // Event actions
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: generateId() }],
        })),

      updateEvent: (id, eventUpdate) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...eventUpdate } : event
          ),
        })),

      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),

      // Todo actions
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { ...todo, id: generateId(), createdAt: new Date().toISOString() },
          ],
        })),

      updateTodo: (id, todoUpdate) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...todoUpdate } : todo
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      // Getters
      getTodayEvents: () => {
        const today = new Date().toISOString().split("T")[0];
        return get()
          .events.filter((event) => event.date === today)
          .sort((a, b) => a.startTime.localeCompare(b.startTime));
      },

      getUpcomingEvents: (limit = 5) => {
        const today = new Date().toISOString().split("T")[0];
        return get()
          .events.filter((event) => event.date >= today)
          .sort((a, b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            return a.startTime.localeCompare(b.startTime);
          })
          .slice(0, limit);
      },

      getPendingTodos: () => {
        return get().todos.filter((todo) => !todo.completed);
      },

      getCompletedTodos: () => {
        return get().todos.filter((todo) => todo.completed);
      },
    }),
    {
      name: "calendar-storage",
    }
  )
);
