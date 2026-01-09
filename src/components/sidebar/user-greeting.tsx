"use client";

import * as React from "react";
import { useGreeting } from "@/hooks/use-greeting";

interface UserGreetingProps {
  userName?: string;
}

export function UserGreeting({ userName = "User" }: UserGreetingProps) {
  const { greeting, emoji } = useGreeting();
  const [currentTime, setCurrentTime] = React.useState<string>("");
  const [currentDate, setCurrentDate] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <h2 className="text-xl font-semibold">
          {greeting}, <span className="gradient-primary-text">{userName}</span>
        </h2>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium">{currentTime}</span>
        <span className="text-border">•</span>
        <span>{currentDate}</span>
      </div>
    </div>
  );
}
