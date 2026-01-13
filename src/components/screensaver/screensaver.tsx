"use client";

import * as React from "react";
import { Suspense, useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { CalendarDays, Clock, MapPin, Video, ListTodo, Circle, CheckCircle2, BarChart3 } from "lucide-react";
import { Earth } from "./earth";
import { FloatingBadger } from "./floating-objects";
import { useScreensaverStore, useScreensaverActive, useScreensaverLocationName, useScreensaverTimezone } from "@/stores/screensaver-store";
import { useUser, useCalendarStore, type CalendarEvent, type Todo } from "@/stores";
import { useGreeting } from "@/hooks/use-greeting";
import { mockSummary, mockIndustryBreakdown, formatNumber } from "@/data/analytics";
import type { AnalyticsSummary, IndustryBreakdown } from "@/types/analytics";
import { cn } from "@/lib/utils";

interface TimeDisplayProps {
  timezone: string;
  location: string;
}

function TimeDisplay({ timezone, location }: TimeDisplayProps) {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [timezoneAbbr, setTimezoneAbbr] = useState<string>("");
  const { greeting, emoji } = useGreeting();
  const user = useUser();
  
  const userName = user?.firstName || "there";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: timezone,
        })
      );
      
      // Format date
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: timezone,
        })
      );
      
      // Get timezone abbreviation
      const tzAbbr = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        timeZoneName: "short",
      }).split(" ").pop() || timezone;
      setTimezoneAbbr(tzAbbr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="absolute top-8 left-8 flex flex-col z-10 pointer-events-none select-none">
      <div className="text-left space-y-2">
        {/* Greeting */}
        <div className="flex items-center gap-2 text-2xl text-white/80 font-light">
          <span>{emoji}</span>
          <span>{greeting}, <span className="text-purple-400">{userName}</span></span>
        </div>
        
        {/* Location */}
        <div className="text-sm font-light tracking-widest text-white/60 uppercase mt-4">
          {location}
        </div>
        
        {/* Time */}
        <div className="text-7xl font-extralight tracking-tight text-white tabular-nums">
          {time}
        </div>
        
        {/* Date and Timezone */}
        <div className="flex items-center gap-3 text-base text-white/50 font-light">
          <span>{date}</span>
          <span className="text-white/30">•</span>
          <span className="text-primary/80">{timezoneAbbr}</span>
        </div>
      </div>
    </div>
  );
}

function LogoDisplay() {
  return (
    <div className="absolute bottom-8 left-8 z-10 pointer-events-none select-none">
      <img 
        src="/INVNT logo.png" 
        alt="INVNT" 
        className="w-[250px] h-auto animate-float-subtle"
      />
    </div>
  );
}

const dailyQuotes = [
  "Every day is a chance to create something that moves people.",
  "Your passion is the spark — let it ignite everything you do.",
  "Great things happen when we dare to think bigger together.",
  "Be bold. Be curious. Be the change you want to see.",
  "Today, let's make impossible feel inevitable.",
  "The best ideas come when we stop fearing failure.",
  "Dream wildly. Execute relentlessly.",
  "You have the power to turn moments into memories.",
  "Challenge convention. Embrace the unexpected.",
  "Show up fully — the world needs what only you can give.",
  "Innovation starts with the courage to ask 'what if?'",
  "Let your work speak louder than your doubts.",
  "Together, we don't just imagine the future — we build it.",
  "Stay hungry for impact, not just success.",
  "Your creativity is your superpower. Use it wisely.",
  "Make today count. Tomorrow will thank you.",
  "The magic is in the details — and in the people.",
  "Push boundaries. Break molds. Create legends.",
  "Every interaction is an opportunity to inspire.",
  "Believe in the work. Believe in each other.",
  "Excellence isn't a goal — it's a habit.",
  "Let curiosity lead the way.",
  "The only limit is the one we accept.",
  "Create with intention. Lead with heart.",
  "Today's effort becomes tomorrow's legacy.",
  "When we lift each other, we all rise.",
  "Don't wait for the perfect moment — make it.",
  "Your energy sets the tone. Make it electric.",
  "Small acts of brilliance add up to big impact.",
  "Stay fearless. Stay focused. Stay you.",
  "Let's make something extraordinary — together.",
];

function QuoteDisplay() {
  // Pick a random quote on mount
  const [todaysQuote] = useState(() => 
    dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]
  );

  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none max-w-lg text-center animate-float-subtle">
      <blockquote className="relative px-8">
        <span className="absolute -left-2 -top-4 text-4xl text-purple-500/30 font-serif">&ldquo;</span>
        <p className="text-lg md:text-xl text-white/80 font-light italic leading-relaxed">
          {todaysQuote}
        </p>
        <span className="absolute -right-2 -bottom-4 text-4xl text-purple-500/30 font-serif">&rdquo;</span>
      </blockquote>
      <footer className="mt-3 text-sm text-purple-400/70 tracking-wide">
        — Kristina
      </footer>
    </div>
  );
}

// Event type styles for screensaver
const eventTypeColors = {
  meeting: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  task: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  reminder: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  event: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const eventTypeIcons = {
  meeting: Video,
  task: CalendarDays,
  reminder: Clock,
  event: CalendarDays,
};

const priorityDots = {
  low: "bg-white/40",
  medium: "bg-amber-400",
  high: "bg-red-400",
};

// Mini bar chart component for screensaver data preview
function MiniBarChart({ data }: { data: IndustryBreakdown[] }) {
  if (!data || data.length === 0) return null;
  
  const maxValue = Math.max(...data.map((d) => d.attendees));
  const maxHeight = 40; // pixels
  const colors = [
    "bg-purple-500",
    "bg-purple-400",
    "bg-fuchsia-500",
    "bg-emerald-500",
    "bg-sky-500",
  ];
  
  return (
    <div className="flex items-end gap-1.5" style={{ height: `${maxHeight + 16}px` }}>
      {data.slice(0, 5).map((item, index) => {
        const barHeight = Math.max(4, (item.attendees / maxValue) * maxHeight);
        return (
          <div
            key={item.industry}
            className="flex-1 flex flex-col items-center justify-end"
          >
            <div
              className={cn(
                "w-full rounded-t transition-all duration-500",
                colors[index % colors.length]
              )}
              style={{ height: `${barHeight}px`, opacity: 0.8 }}
            />
            <span className="text-[8px] text-white/40 truncate w-full text-center mt-1">
              {item.industry.slice(0, 3)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ScreensaverSidebar() {
  const { getTodayEvents, getPendingTodos, getCompletedTodos, todos: allTodos } = useCalendarStore();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [industryData, setIndustryData] = useState<IndustryBreakdown[]>([]);

  // Subscribe to store changes
  const storeEvents = useCalendarStore((state) => state.events);

  useEffect(() => {
    setEvents(getTodayEvents());
    setSummary(mockSummary);
    setIndustryData(mockIndustryBreakdown);
  }, [getTodayEvents, storeEvents]);

  const pendingTodos = getPendingTodos();
  const completedCount = getCompletedTodos().length;

  // Sort todos: incomplete first, then by priority
  const sortedTodos = [...pendingTodos].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }).slice(0, 5); // Show only top 5

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-8 w-80 z-10 pointer-events-none select-none space-y-3">
      {/* Analytics Preview Section */}
      {summary && (
        <div 
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden pointer-events-auto"
          onClick={stopPropagation}
        >
          <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-white/80">Analytics</span>
          </div>
          
          <div className="p-3 space-y-2.5">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-white/5">
                <p className="text-[10px] text-white/50">Attendees</p>
                <p className="text-lg font-semibold text-white">{formatNumber(summary.totalAttendees)}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <p className="text-[10px] text-white/50">Engagement</p>
                <p className="text-lg font-semibold text-white">{summary.averageEngagementScore.toFixed(0)}<span className="text-xs text-white/50">/100</span></p>
              </div>
            </div>
            
            {/* Mini Chart */}
            <div>
              <p className="text-[9px] text-white/40 mb-1.5 uppercase tracking-wider">By Industry</p>
              <MiniBarChart data={industryData} />
            </div>
          </div>
        </div>
      )}

      {/* Calendar Section */}
      <div 
        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden pointer-events-auto"
        onClick={stopPropagation}
      >
        <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium text-white/80">Today&apos;s Schedule</span>
          <span className="ml-auto text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
            {events.length}
          </span>
        </div>
        
        <div className="p-3 space-y-2 max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {events.length > 0 ? (
            events.map((event) => {
              const Icon = eventTypeIcons[event.type];
              return (
                <div
                  key={event.id}
                  className={cn(
                    "p-2 rounded-lg border",
                    eventTypeColors[event.type]
                  )}
                >
                  <div className="flex items-start gap-2">
                    <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs opacity-80">
                        <Clock className="h-3 w-3" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1.5 mt-0.5 text-xs opacity-70">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-3 text-center text-white/40">
              <CalendarDays className="h-5 w-5 mx-auto mb-1 opacity-50" />
              <p className="text-xs">No events today</p>
            </div>
          )}
        </div>
      </div>

      {/* Tasks Section */}
      <div 
        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden pointer-events-auto"
        onClick={stopPropagation}
      >
        <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
          <ListTodo className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium text-white/80">Tasks</span>
          <div className="ml-auto flex items-center gap-2 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <Circle className="h-3 w-3" />
              {pendingTodos.length}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              {completedCount}
            </span>
          </div>
        </div>
        
        <div className="p-3 space-y-1.5 max-h-[140px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {sortedTodos.length > 0 ? (
            sortedTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5"
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full shrink-0",
                    priorityDots[todo.priority]
                  )}
                />
                <span className="text-sm text-white/80 truncate flex-1">
                  {todo.title}
                </span>
                {todo.dueDate && (
                  <span className="text-xs text-white/40 shrink-0">
                    {new Date(todo.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="py-3 text-center text-white/40">
              <ListTodo className="h-5 w-5 mx-auto mb-1 opacity-50" />
              <p className="text-xs">All tasks completed!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

export function Screensaver() {
  const isActive = useScreensaverActive();
  const location = useScreensaverLocationName();
  const timezone = useScreensaverTimezone();
  const deactivateScreensaver = useScreensaverStore((s) => s.deactivateScreensaver);
  
  // Track if this is the initial mount - if already active, show immediately
  const isInitialMount = React.useRef(true);
  const [isVisible, setIsVisible] = useState(isActive);
  const [isMounted, setIsMounted] = useState(isActive);

  // Handle mount animation
  useEffect(() => {
    if (isActive) {
      setIsMounted(true);
      
      // If this is the initial mount and already active, show immediately (no fade)
      if (isInitialMount.current) {
        isInitialMount.current = false;
        setIsVisible(true);
        return;
      }
      
      // Otherwise, small delay for mount before fade in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      isInitialMount.current = false;
      setIsVisible(false);
      // Wait for fade out before unmount
      const timer = setTimeout(() => setIsMounted(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  // Handle any user interaction to dismiss
  const handleInteraction = useCallback(() => {
    if (isActive) {
      deactivateScreensaver();
    }
  }, [isActive, deactivateScreensaver]);

  // Listen for any keyboard or mouse events
  useEffect(() => {
    if (!isActive) return;

    const events = ["mousedown", "keydown", "touchstart"];
    
    // Slight delay to prevent immediate dismissal
    const timer = setTimeout(() => {
      events.forEach((event) => {
        window.addEventListener(event, handleInteraction, { once: true, passive: true });
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      events.forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, [isActive, handleInteraction]);

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 bg-black transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      onClick={handleInteraction}
    >
      {/* Inspirational Quote */}
      <QuoteDisplay />
      
      {/* Time and Location Display */}
      <TimeDisplay timezone={timezone} location={location} />
      
      {/* INVNT Logo bottom left */}
      <LogoDisplay />
      
      {/* Sidebar with Calendar and Tasks */}
      <ScreensaverSidebar />
      
      {/* 3D Earth Canvas */}
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          className="absolute! inset-0"
          gl={{ antialias: true, alpha: true }}
        >
          {/* Ambient light for base illumination */}
          <ambientLight intensity={0.4} />
          
          {/* Main sun light */}
          <directionalLight
            position={[5, 3, 5]}
            intensity={2}
            color="#fff5e6"
          />
          
          {/* Fill light from opposite side for visibility */}
          <directionalLight
            position={[-3, -1, -3]}
            intensity={0.5}
            color="#4a90d9"
          />
          
          {/* Top fill light */}
          <pointLight
            position={[0, 8, 0]}
            intensity={0.6}
            color="#ffffff"
          />
          
          {/* Stars background */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          
          {/* Earth */}
          <Earth radius={2} />
          
          {/* Bowie Badger flying around */}
          <FloatingBadger />
          
          {/* Subtle auto-rotation for camera */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.15}
          />
        </Canvas>
      </Suspense>
      
      {/* Dismiss hint */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-sm text-white/30 font-light tracking-wide">
          Press any key or move mouse to exit
        </p>
      </div>
    </div>
  );
}
