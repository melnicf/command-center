"use client";

import * as React from "react";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { FullscreenToggle } from "@/components/shared/fullscreen-toggle";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/stores/sidebar-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <header className="shrink-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left side - Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/INVNT logo.png"
            alt="INVNT"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-xl font-bold gradient-primary-text">
            Command Center
          </span>
        </div>

        {/* Center - Search (placeholder for Cmd+K) */}
        <div className="hidden md:flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-64 justify-start gap-2 text-muted-foreground border-border/50 bg-background/50"
                >
                  <Search className="h-4 w-4" />
                  <span className="text-sm">Search...</span>
                  <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick search (⌘K)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <FullscreenToggle />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSidebar}
                  className="border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-primary/30 transition-all duration-200"
                >
                  <Menu className="h-[1.2rem] w-[1.2rem] text-primary" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open sidebar (⌘/)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
