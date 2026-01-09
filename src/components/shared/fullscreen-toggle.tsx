"use client";

import * as React from "react";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  // Keyboard shortcut: F11 or Cmd/Ctrl + Shift + F
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F11" ||
        ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "f")
      ) {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFullscreen}
            className="border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-primary/30 transition-all duration-200"
          >
            {isFullscreen ? (
              <Minimize className="h-[1.2rem] w-[1.2rem] text-primary" />
            ) : (
              <Maximize className="h-[1.2rem] w-[1.2rem] text-primary" />
            )}
            <span className="sr-only">
              {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFullscreen ? "Exit fullscreen (ESC)" : "Fullscreen (F11)"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
