"use client";

import * as React from "react";

interface GreetingInfo {
  greeting: string;
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
  emoji: string;
}

export function useGreeting(): GreetingInfo {
  const [greetingInfo, setGreetingInfo] = React.useState<GreetingInfo>({
    greeting: "Good day",
    timeOfDay: "morning",
    emoji: "👋",
  });

  React.useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreetingInfo({
          greeting: "Good morning",
          timeOfDay: "morning",
          emoji: "☀️",
        });
      } else if (hour >= 12 && hour < 17) {
        setGreetingInfo({
          greeting: "Good afternoon",
          timeOfDay: "afternoon",
          emoji: "🌤️",
        });
      } else if (hour >= 17 && hour < 21) {
        setGreetingInfo({
          greeting: "Good evening",
          timeOfDay: "evening",
          emoji: "🌅",
        });
      } else {
        setGreetingInfo({
          greeting: "Good night",
          timeOfDay: "night",
          emoji: "🌙",
        });
      }
    };

    updateGreeting();
    
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return greetingInfo;
}
