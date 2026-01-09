"use client";

import * as React from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useChatStore, useChatIsOpen } from "@/stores";

interface ChatToggleProps {
  className?: string;
}

export function ChatToggle({ className }: ChatToggleProps) {
  const isOpen = useChatIsOpen();
  const { openChat } = useChatStore();
  const [isHovered, setIsHovered] = React.useState(false);

  // Calculate transform based on state
  const getTransform = () => {
    if (isOpen) {
      // Slide down and hide when chat is open
      return 'translateY(100px)';
    }
    if (isHovered) {
      // Slide up when hovered
      return 'translateY(-140px)';
    }
    // Default peeking position
    return 'translateY(0)';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={openChat}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isOpen}
            className={cn(
              "fixed right-6 bottom-[-140px] z-40",
              "cursor-pointer",
              "drop-shadow-lg",
              !isHovered && !isOpen && "animate-bowie-peek",
              isOpen && "pointer-events-none",
              className
            )}
            style={{
              transform: getTransform(),
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <div className="relative animate-bowie-pulse">
              <Image
                src="/bowie badger.webp"
                alt="Bowie Badger"
                width={90}
                height={90}
                className="object-contain"
                priority
              />
              {/* Notification dot */}
              {!isOpen && (
                <span className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background animate-pulse" />
              )}
            </div>
            <span className="sr-only">Open Bowie Badger chat</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={10}>
          <p>Ask Bowie</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
