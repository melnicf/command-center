export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
  type: "meeting" | "task" | "reminder" | "event";
  location?: string;
  description?: string;
}

// Generate mock events for today and upcoming days
function generateMockEvents(): CalendarEvent[] {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  return [
    {
      id: "1",
      title: "Team Standup",
      startTime: "09:00",
      endTime: "09:30",
      date: today,
      type: "meeting",
      location: "Zoom",
      description: "Daily team sync-up",
    },
    {
      id: "2",
      title: "Project Review",
      startTime: "11:00",
      endTime: "12:00",
      date: today,
      type: "meeting",
      location: "Conference Room A",
      description: "Quarterly project progress review",
    },
    {
      id: "3",
      title: "Design Sprint Planning",
      startTime: "14:00",
      endTime: "15:30",
      date: today,
      type: "meeting",
      location: "Design Lab",
    },
    {
      id: "4",
      title: "Submit Quarterly Report",
      startTime: "17:00",
      endTime: "17:30",
      date: today,
      type: "task",
      description: "Finance report deadline",
    },
    {
      id: "5",
      title: "Creative Kickoff",
      startTime: "10:00",
      endTime: "11:30",
      date: tomorrow,
      type: "meeting",
      location: "Creative Studio",
    },
    {
      id: "6",
      title: "Client Presentation",
      startTime: "15:00",
      endTime: "16:00",
      date: tomorrow,
      type: "event",
      location: "Main Boardroom",
    },
    {
      id: "7",
      title: "Innovation Workshop",
      startTime: "09:30",
      endTime: "12:00",
      date: dayAfter,
      type: "event",
      location: "Innovation Hub",
    },
  ];
}

export const mockEvents = generateMockEvents();

export function getTodayEvents(): CalendarEvent[] {
  const today = new Date();
  return mockEvents.filter(
    (event) => event.date.toDateString() === today.toDateString()
  );
}

export function getUpcomingEvents(limit: number = 5): CalendarEvent[] {
  const now = new Date();
  return mockEvents
    .filter((event) => event.date >= now)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, limit);
}
