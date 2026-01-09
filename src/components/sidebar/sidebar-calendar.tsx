"use client";

import * as React from "react";
import { CalendarDays, Clock, MapPin, Video } from "lucide-react";
import { getTodayEvents, type CalendarEvent } from "@/data/events";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface EventCardProps {
  event: CalendarEvent;
}

function EventCard({ event }: EventCardProps) {
  const Icon = eventTypeIcons[event.type];

  return (
    <div
      className={cn(
        "p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-md",
        eventTypeColors[event.type]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{event.title}</h4>
          <div className="flex items-center gap-2 mt-1 text-xs opacity-80">
            <Clock className="h-3 w-3" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 mt-1 text-xs opacity-80">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SidebarCalendar() {
  const [todayEvents, setTodayEvents] = React.useState<CalendarEvent[]>([]);

  React.useEffect(() => {
    setTodayEvents(getTodayEvents());
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          Today&apos;s Schedule
        </h3>
        <span className="text-xs text-muted-foreground">
          {todayEvents.length} events
        </span>
      </div>

      {todayEvents.length > 0 ? (
        <ScrollArea className="h-[180px]">
          <div className="space-y-2 p-1 pr-3">
            {todayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="py-8 text-center text-muted-foreground">
          <CalendarDays className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No events scheduled for today</p>
        </div>
      )}
    </div>
  );
}
