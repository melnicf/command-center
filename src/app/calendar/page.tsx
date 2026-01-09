"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ProtectedRoute } from "@/components/auth";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarDays,
  Plus,
  Clock,
  MapPin,
  Video,
  Trash2,
  ListTodo,
  Circle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCalendarStore, type CalendarEvent, type Todo } from "@/stores/calendar-store";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const eventTypeColors = {
  meeting: "bg-primary/20 text-primary border-primary/30",
  task: "bg-warning/20 text-warning border-warning/30",
  reminder: "bg-info/20 text-info border-info/30",
  event: "bg-success/20 text-success border-success/30",
};

const eventTypeIcons = {
  meeting: Video,
  task: CalendarDays,
  reminder: Clock,
  event: CalendarDays,
};

const priorityColors = {
  low: "bg-muted-foreground",
  medium: "bg-warning",
  high: "bg-destructive",
};

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

interface EventCardProps {
  event: CalendarEvent;
  onDelete: (id: string) => void;
  showDate?: boolean;
}

function EventCard({ event, onDelete, showDate = false }: EventCardProps) {
  const Icon = eventTypeIcons[event.type];
  const eventDate = new Date(event.date);

  return (
    <div
      className={cn(
        "p-3 rounded-lg border transition-all duration-200 hover:shadow-md group",
        eventTypeColors[event.type]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{event.title}</h4>
          {showDate && (
            <div className="flex items-center gap-1.5 mt-1 text-xs opacity-80">
              <CalendarDays className="h-3 w-3" />
              <span>
                {eventDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 mt-1 text-xs opacity-80">
            <Clock className="h-3 w-3" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5 mt-1 text-xs opacity-80">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          onClick={() => onDelete(event.id)}
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>
    </div>
  );
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-accent/50 group border border-border/50",
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
            className={cn("h-2 w-2 rounded-full shrink-0", priorityColors[todo.priority])}
          />
          <span
            className={cn(
              "text-sm",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.title}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1 ml-4">
          <span className={cn(
            "text-xs px-1.5 py-0.5 rounded-full",
            todo.priority === "high" && "bg-destructive/10 text-destructive",
            todo.priority === "medium" && "bg-warning/10 text-warning",
            todo.priority === "low" && "bg-muted text-muted-foreground"
          )}>
            {priorityLabels[todo.priority]}
          </span>
          {todo.dueDate && (
            <span className="text-xs text-muted-foreground">
              Due{" "}
              {new Date(todo.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        onClick={() => onDelete(todo.id)}
      >
        <Trash2 className="h-3.5 w-3.5 text-destructive" />
      </Button>
    </div>
  );
}

function AddEventDialog({ defaultDate }: { defaultDate?: string }) {
  const [open, setOpen] = React.useState(false);
  const { addEvent } = useCalendarStore();
  const [formData, setFormData] = React.useState({
    title: "",
    date: defaultDate || format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "10:00",
    type: "meeting" as CalendarEvent["type"],
    location: "",
    description: "",
  });

  // Update date when defaultDate changes
  React.useEffect(() => {
    if (defaultDate) {
      setFormData(prev => ({ ...prev, date: defaultDate }));
    }
  }, [defaultDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addEvent({
      title: formData.title,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      type: formData.type,
      location: formData.location || undefined,
      description: formData.description || undefined,
    });

    setFormData({
      title: "",
      date: defaultDate || format(new Date(), "yyyy-MM-dd"),
      startTime: "09:00",
      endTime: "10:00",
      type: "meeting",
      location: "",
      description: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            New Event
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Event title..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as CalendarEvent["type"],
                  })
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="meeting">Meeting</option>
                <option value="task">Task</option>
                <option value="reminder">Reminder</option>
                <option value="event">Event</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location (optional)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Meeting room, Zoom link..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Event details..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddTodoDialog() {
  const [open, setOpen] = React.useState(false);
  const { addTodo } = useCalendarStore();
  const [formData, setFormData] = React.useState({
    title: "",
    priority: "medium" as Todo["priority"],
    dueDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addTodo({
      title: formData.title,
      completed: false,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
    });

    setFormData({
      title: "",
      priority: "medium",
      dueDate: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-primary" />
            New Task
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="todoTitle">Title</Label>
            <Input
              id="todoTitle"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Task title..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as Todo["priority"],
                  })
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date (optional)</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function CalendarPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );

  const {
    events,
    todos,
    deleteEvent,
    deleteTodo,
    toggleTodo,
  } = useCalendarStore();

  // Get events for selected date
  const selectedDateStr = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : "";
  const selectedDateEvents = events.filter(
    (event) => event.date === selectedDateStr
  );

  // Sort todos: incomplete first, then by priority
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const pendingCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  // Get dates that have events for calendar highlighting
  const eventDates = events.map((e) => new Date(e.date));

  return (
    <ProtectedRoute>
      <AppShell>
        <div className="h-full overflow-auto">
          <div className="container mx-auto px-6 py-10 max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/")}
                className="h-10 w-10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">
                  Planner
                </h1>
                <p className="text-muted-foreground">
                  Manage your schedule and to-do list
                </p>
              </div>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Column: Schedule (Calendar + Events) */}
              <div className="lg:col-span-3 space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-primary" />
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    Schedule
                  </h2>
                </div>

                {/* Calendar + Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Calendar */}
                  <Card className="border-primary/20">
                    <CardContent className="p-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border-0 w-full"
                        modifiers={{
                          hasEvent: eventDates,
                        }}
                        modifiersClassNames={{
                          hasEvent:
                            "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary",
                        }}
                      />
                    </CardContent>
                  </Card>

                  {/* Events for Selected Date */}
                  <Card className="border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">
                            {selectedDate ? (
                              format(selectedDate, "EEEE, MMMM d")
                            ) : (
                              "Select a date"
                            )}
                          </CardTitle>
                          <CardDescription>
                            {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? "s" : ""} scheduled
                          </CardDescription>
                        </div>
                        <AddEventDialog defaultDate={selectedDateStr} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {selectedDateEvents.length > 0 ? (
                        <ScrollArea className="h-[280px]">
                          <div className="space-y-2 pr-4">
                            {selectedDateEvents
                              .sort((a, b) => a.startTime.localeCompare(b.startTime))
                              .map((event) => (
                                <EventCard
                                  key={event.id}
                                  event={event}
                                  onDelete={deleteEvent}
                                />
                              ))}
                          </div>
                        </ScrollArea>
                      ) : (
                        <div className="h-[280px] flex flex-col items-center justify-center text-muted-foreground">
                          <CalendarDays className="h-10 w-10 mb-2 opacity-30" />
                          <p className="text-sm">No events for this date</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* All Upcoming Events */}
                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      All Upcoming Events
                      <span className="text-sm font-normal text-muted-foreground">
                        ({events.length} total)
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {events.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {events
                          .sort((a, b) => {
                            if (a.date !== b.date) return a.date.localeCompare(b.date);
                            return a.startTime.localeCompare(b.startTime);
                          })
                          .map((event) => (
                            <EventCard
                              key={event.id}
                              event={event}
                              onDelete={deleteEvent}
                              showDate
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        <CalendarDays className="h-10 w-10 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No events scheduled</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Tasks (Independent) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-amber-500" />
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <ListTodo className="h-5 w-5 text-amber-500" />
                    Tasks
                  </h2>
                </div>

                {/* Tasks Card */}
                <Card className="border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted">
                            <Circle className="h-3 w-3" />
                            <span>{pendingCount} pending</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/10 text-success">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>{completedCount} done</span>
                          </div>
                        </div>
                      </div>
                      <AddTodoDialog />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {sortedTodos.length > 0 ? (
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-2 pr-4">
                          {/* Pending Tasks */}
                          {sortedTodos.filter(t => !t.completed).length > 0 && (
                            <div className="space-y-2">
                              {sortedTodos
                                .filter(t => !t.completed)
                                .map((todo) => (
                                  <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggle={toggleTodo}
                                    onDelete={deleteTodo}
                                  />
                                ))}
                            </div>
                          )}
                          
                          {/* Completed Tasks */}
                          {sortedTodos.filter(t => t.completed).length > 0 && (
                            <>
                              <Separator className="my-4" />
                              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                Completed
                              </p>
                              <div className="space-y-2">
                                {sortedTodos
                                  .filter(t => t.completed)
                                  .map((todo) => (
                                    <TodoItem
                                      key={todo.id}
                                      todo={todo}
                                      onToggle={toggleTodo}
                                      onDelete={deleteTodo}
                                    />
                                  ))}
                              </div>
                            </>
                          )}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                        <ListTodo className="h-12 w-12 mb-3 opacity-30" />
                        <p className="font-medium">No tasks yet</p>
                        <p className="text-sm mt-1">Add tasks to track your to-dos</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
