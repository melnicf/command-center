"use client";

import * as React from "react";
import { Suspense, useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { CalendarDays, Clock, MapPin, Video, ListTodo, Circle, CheckCircle2, Coins, Award, Sparkles, Star, Trophy, Zap, Heart, Flame, Crown, Gift } from "lucide-react";
import { Earth } from "./earth";
import { FloatingBadger } from "./floating-objects";
import { useScreensaverStore, useScreensaverActive, useScreensaverLocationName, useScreensaverTimezone } from "@/stores/screensaver-store";
import { useUser, useCalendarStore, type CalendarEvent, type Todo } from "@/stores";
import { useGreeting } from "@/hooks/use-greeting";
import { cn } from "@/lib/utils";

// Boey Badger Bucks - Swag Currency System
interface SwagBadge {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: "star" | "trophy" | "zap" | "heart" | "flame" | "crown" | "gift" | "sparkles";
  color: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const allBadges: SwagBadge[] = [
  { id: "early-bird", name: "Early Bird", description: "First one in the office", price: 50, icon: "star", color: "text-amber-400", rarity: "common" },
  { id: "team-player", name: "Team Player", description: "Helped 10 colleagues", price: 100, icon: "heart", color: "text-pink-400", rarity: "common" },
  { id: "idea-machine", name: "Idea Machine", description: "Pitched 5 creative concepts", price: 150, icon: "zap", color: "text-yellow-400", rarity: "rare" },
  { id: "event-guru", name: "Event Guru", description: "Led a successful event", price: 200, icon: "trophy", color: "text-emerald-400", rarity: "rare" },
  { id: "culture-champion", name: "Culture Champion", description: "Embodies INVNT values", price: 300, icon: "flame", color: "text-orange-400", rarity: "epic" },
  { id: "innovation-star", name: "Innovation Star", description: "Brought something new to life", price: 400, icon: "sparkles", color: "text-purple-400", rarity: "epic" },
  { id: "legend", name: "INVNT Legend", description: "The ultimate achiever", price: 1000, icon: "crown", color: "text-yellow-300", rarity: "legendary" },
  { id: "surprise-box", name: "Mystery Box", description: "What's inside?", price: 75, icon: "gift", color: "text-cyan-400", rarity: "common" },
];

// Mock user data - acquired badges and balance
// Note: "legend" (INVNT Legend) is NOT in acquiredBadgeIds so it appears in the store
const mockUserBadgerBucks = {
  balance: 425,
  acquiredBadgeIds: ["early-bird", "team-player", "surprise-box"], // Only common badges acquired
};

// Swaggy rarity styles with gradients and glows
const rarityStyles = {
  common: "border-slate-400/30 bg-gradient-to-br from-slate-500/20 to-slate-600/10",
  rare: "border-blue-400/50 bg-gradient-to-br from-blue-500/25 to-cyan-500/15 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
  epic: "border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/15 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
  legendary: "border-yellow-400/60 bg-gradient-to-br from-yellow-500/30 to-amber-500/20 shadow-[0_0_25px_rgba(251,191,36,0.5)] animate-pulse",
};

const rarityGlow = {
  common: "",
  rare: "drop-shadow-[0_0_4px_rgba(59,130,246,0.6)]",
  epic: "drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]",
  legendary: "drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-[spin_4s_linear_infinite]",
};

const rarityLabels = {
  common: { text: "Common", color: "text-slate-400" },
  rare: { text: "Rare", color: "text-blue-400" },
  epic: { text: "Epic", color: "text-purple-400" },
  legendary: { text: "Legendary", color: "text-yellow-400" },
};

const BadgeIcon = ({ icon, className, rarity = "common" }: { icon: SwagBadge["icon"]; className?: string; rarity?: SwagBadge["rarity"] }) => {
  const icons = {
    star: Star,
    trophy: Trophy,
    zap: Zap,
    heart: Heart,
    flame: Flame,
    crown: Crown,
    gift: Gift,
    sparkles: Sparkles,
  };
  const IconComponent = icons[icon];
  return <IconComponent className={cn(className, rarityGlow[rarity])} />;
};

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
  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none max-w-lg text-center animate-float-subtle">
      <blockquote className="relative px-8">
        <span className="absolute -left-2 -top-4 text-4xl text-purple-500/30 font-serif">&ldquo;</span>
        <p className="text-lg md:text-xl text-white/80 font-light italic leading-relaxed">
          We are leading the creative revolution for brands worldwide
        </p>
        <span className="absolute -right-2 -bottom-4 text-4xl text-purple-500/30 font-serif">&rdquo;</span>
      </blockquote>
      <footer className="mt-3 text-sm text-purple-400/70 tracking-wide">
        — Kristina McCoobery, CEO
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

// Boey Badger Bucks Display Component - Compact SWAGGY Edition
function BadgerBucksDisplay({ isExpanded, onHoverChange }: { isExpanded: boolean; onHoverChange: (hovered: boolean) => void }) {
  const [balance] = useState(mockUserBadgerBucks.balance);
  const acquiredBadges = allBadges.filter((b) => mockUserBadgerBucks.acquiredBadgeIds.includes(b.id));
  const availableBadges = allBadges.filter((b) => !mockUserBadgerBucks.acquiredBadgeIds.includes(b.id));
  
  // Find legendary badge for featured section
  const legendaryBadge = availableBadges.find((b) => b.rarity === "legendary");
  const regularShopBadges = availableBadges.filter((b) => b.rarity !== "legendary");
  
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div 
      className={cn(
        "relative bg-gradient-to-br from-purple-900/40 via-black/50 to-amber-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 overflow-hidden pointer-events-auto shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-300",
        isExpanded && "shadow-[0_0_60px_rgba(168,85,247,0.25)]"
      )}
      onClick={stopPropagation}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {/* Animated shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
      
      {/* Compact Header with Balance */}
      <div className="relative px-3 py-2 border-b border-white/10 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Coins className="h-4 w-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <Sparkles className="h-2 w-2 text-amber-200 absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>
          <span className="text-xs font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
            Badger Bucks
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/30 to-yellow-500/20 px-2 py-1 rounded-lg border border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
          <Coins className="h-3 w-3 text-amber-300" />
          <span className="text-sm font-bold text-amber-200">{balance}</span>
        </div>
      </div>
      
      <div className="p-2.5 space-y-2.5">
        {/* Acquired Badges - Compact Icon Row */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Award className="h-3 w-3 text-emerald-400" />
            <p className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">
              Collected
            </p>
            <span className="text-[9px] text-emerald-400/70 ml-auto">{acquiredBadges.length}/{allBadges.length}</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 px-0.5">
            {acquiredBadges.length > 0 ? (
              acquiredBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={cn(
                    "relative p-1.5 rounded-lg border flex items-center gap-1.5 transition-all hover:brightness-125",
                    rarityStyles[badge.rarity]
                  )}
                  title={`${badge.name}: ${badge.description}`}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center",
                    badge.rarity === "legendary" ? "bg-yellow-400/30" :
                    badge.rarity === "epic" ? "bg-purple-400/30" :
                    badge.rarity === "rare" ? "bg-blue-400/30" : "bg-white/10"
                  )}>
                    <BadgeIcon icon={badge.icon} rarity={badge.rarity} className={cn("h-3 w-3", badge.color)} />
                  </div>
                  <span className="text-[9px] font-medium text-white/80">{badge.name}</span>
                </div>
              ))
            ) : (
              <p className="text-[9px] text-white/40 italic py-1">No badges yet!</p>
            )}
          </div>
        </div>
        
        {/* Swag Shop - Expandable List */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Gift className="h-3 w-3 text-fuchsia-400" />
            <p className="text-[10px] font-semibold text-fuchsia-300 uppercase tracking-wider">
              Shop
            </p>
            <Sparkles className="h-2.5 w-2.5 text-fuchsia-400/50 animate-pulse" />
            {!isExpanded && regularShopBadges.length > 2 && (
              <span className="text-[8px] text-white/40 ml-auto">hover to expand</span>
            )}
          </div>
          
          {/* Featured Legendary Badge - INVNT Legend */}
          {legendaryBadge && (
            <div className={cn(
              "relative rounded-xl border-2 border-yellow-400/50 bg-gradient-to-r from-yellow-500/20 via-amber-500/10 to-yellow-500/20 mb-1.5 transition-all duration-300",
              isExpanded ? "p-2 shadow-[0_0_20px_rgba(251,191,36,0.3)]" : "p-1.5"
            )}>
              {isExpanded && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-[shimmer_2s_infinite] rounded-xl pointer-events-none" />
              )}
              <div className="flex items-center gap-2 relative">
                <div className="relative shrink-0">
                  {isExpanded && <div className="absolute inset-0 bg-yellow-400/40 blur-md rounded-full animate-pulse" />}
                  <div className={cn(
                    "relative rounded-full bg-gradient-to-br from-yellow-400/40 to-amber-600/40 flex items-center justify-center transition-all duration-300",
                    isExpanded ? "w-8 h-8" : "w-5 h-5"
                  )}>
                    <Crown className={cn(
                      "text-yellow-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] transition-all duration-300",
                      isExpanded ? "h-4 w-4 animate-pulse" : "h-2.5 w-2.5"
                    )} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className={cn(
                      "font-bold text-yellow-200 transition-all duration-300",
                      isExpanded ? "text-[11px]" : "text-[10px]"
                    )}>{legendaryBadge.name}</p>
                    {isExpanded && (
                      <span className="text-[7px] font-bold uppercase px-1 py-0.5 rounded bg-yellow-500/30 text-yellow-300">
                        Legendary
                      </span>
                    )}
                  </div>
                  {isExpanded && (
                    <p className="text-[8px] text-yellow-100/50">{legendaryBadge.description}</p>
                  )}
                </div>
                <div className={cn(
                  "flex items-center gap-0.5 rounded-lg font-bold shrink-0 transition-all duration-300",
                  isExpanded ? "px-2 py-1 text-[10px] gap-1" : "px-1.5 py-0.5 text-[9px]",
                  balance >= legendaryBadge.price 
                    ? "bg-gradient-to-r from-yellow-500/40 to-amber-500/30 text-yellow-200 border border-yellow-400/50 shadow-[0_0_12px_rgba(251,191,36,0.4)]" 
                    : "bg-white/5 text-white/30 border border-white/10"
                )}>
                  <Coins className={cn(
                    "transition-all duration-300",
                    isExpanded ? "h-3 w-3" : "h-2.5 w-2.5",
                    balance >= legendaryBadge.price ? "text-yellow-300" : "text-white/30"
                  )} />
                  {legendaryBadge.price}
                </div>
              </div>
            </div>
          )}
          
          {/* Regular Shop Items */}
          <div className={cn(
            "space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent px-0.5 transition-all duration-300",
            isExpanded ? "max-h-[200px]" : "max-h-[70px]"
          )}>
            {regularShopBadges.slice(0, isExpanded ? regularShopBadges.length : 2).map((badge) => {
              const canAfford = balance >= badge.price;
              return (
                <div
                  key={badge.id}
                  className={cn(
                    "relative p-1.5 rounded-lg border flex items-center gap-2 transition-all hover:brightness-110",
                    rarityStyles[badge.rarity],
                    canAfford ? "cursor-pointer" : "opacity-40"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                    badge.rarity === "epic" ? "bg-purple-400/30" :
                    badge.rarity === "rare" ? "bg-blue-400/30" : "bg-white/10"
                  )}>
                    <BadgeIcon icon={badge.icon} rarity={badge.rarity} className={cn("h-2.5 w-2.5", badge.color)} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium text-white/80 truncate">{badge.name}</p>
                    {isExpanded && (
                      <p className="text-[8px] text-white/40 truncate">{badge.description}</p>
                    )}
                  </div>
                  
                  <div className={cn(
                    "flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0",
                    canAfford 
                      ? "bg-amber-500/30 text-amber-200 border border-amber-400/30" 
                      : "bg-white/5 text-white/30"
                  )}>
                    <Coins className="h-2.5 w-2.5" />
                    {badge.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreensaverSidebar() {
  const { getTodayEvents, getPendingTodos, getCompletedTodos, todos: allTodos } = useCalendarStore();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isShopExpanded, setIsShopExpanded] = useState(false);

  // Subscribe to store changes
  const storeEvents = useCalendarStore((state) => state.events);

  useEffect(() => {
    setEvents(getTodayEvents());
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
    <div className="absolute bottom-24 right-8 w-80 z-10 pointer-events-none select-none flex flex-col-reverse gap-3">
      {/* Boey Badger Bucks - Swag Currency Section - Anchored at bottom */}
      <BadgerBucksDisplay isExpanded={isShopExpanded} onHoverChange={setIsShopExpanded} />

      {/* Tasks Section - Collapses when shop is expanded */}
      <div 
        className={cn(
          "bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden pointer-events-auto transition-all duration-300",
          isShopExpanded && "opacity-60"
        )}
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
        
        <div className={cn(
          "overflow-hidden transition-all duration-300",
          isShopExpanded ? "max-h-0 p-0" : "max-h-[140px] p-3"
        )}>
          <div className="space-y-1.5 max-h-[116px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
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

      {/* Calendar Section - Collapses when shop is expanded */}
      <div 
        className={cn(
          "bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden pointer-events-auto transition-all duration-300",
          isShopExpanded && "opacity-60"
        )}
        onClick={stopPropagation}
      >
        <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium text-white/80">Today&apos;s Schedule</span>
          <span className="ml-auto text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
            {events.length}
          </span>
        </div>
        
        <div className={cn(
          "overflow-hidden transition-all duration-300",
          isShopExpanded ? "max-h-0 p-0" : "max-h-[160px] p-3"
        )}>
          <div className="space-y-2 max-h-[136px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
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
