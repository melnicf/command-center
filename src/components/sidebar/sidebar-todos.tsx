"use client";

import * as React from "react";
import { CheckCircle2, Circle, ListTodo, Plus } from "lucide-react";
import { useCalendarStore, type Todo } from "@/stores/calendar-store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const priorityColors = {
  low: "text-muted-foreground",
  medium: "text-warning",
  high: "text-destructive",
};

const priorityDots = {
  low: "bg-muted-foreground",
  medium: "bg-warning",
  high: "bg-destructive",
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-accent/50 group",
        todo.completed && "opacity-60"
      )}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              priorityDots[todo.priority]
            )}
          />
          <span
            className={cn(
              "text-sm truncate",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.title}
          </span>
        </div>
        {todo.dueDate && !todo.completed && (
          <span className="text-xs text-muted-foreground ml-3.5">
            Due{" "}
            {new Date(todo.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  );
}

export function SidebarTodos() {
  const router = useRouter();
  const { todos, toggleTodo, getPendingTodos, getCompletedTodos } = useCalendarStore();

  const pendingCount = getPendingTodos().length;
  const completedCount = getCompletedTodos().length;

  // Sort: incomplete first, then by priority
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <ListTodo className="h-4 w-4 text-primary" />
          Tasks
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Circle className="h-3 w-3" />
            {pendingCount}
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-success" />
            {completedCount}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => router.push("/calendar")}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {todos.length > 0 ? (
        <ScrollArea className="h-[200px] pr-2">
          <div className="space-y-1">
            {sortedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="py-8 text-center text-muted-foreground">
          <ListTodo className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No tasks yet</p>
          <Button
            variant="link"
            size="sm"
            className="text-primary mt-1"
            onClick={() => router.push("/calendar")}
          >
            Add a task
          </Button>
        </div>
      )}
    </div>
  );
}
