"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, Search, LogOut, User, Settings, MonitorPlay } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { FullscreenToggle } from "@/components/shared/fullscreen-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebarStore, useAuthStore, useScreensaverStore } from "@/stores";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  const router = useRouter();
  const { toggleSidebar } = useSidebarStore();
  const { user, logout } = useAuthStore();
  const { activateScreensaver } = useScreensaverStore();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user) return "U";
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

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
          
          {/* Screensaver trigger */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={activateScreensaver}
                  className="border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-primary/30 transition-all duration-200"
                >
                  <MonitorPlay className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Start screensaver</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Screensaver (⌘⇧S)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* User menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-8 w-8 border border-border/50">
                    <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

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
