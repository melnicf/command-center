"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, LogOut, User, Settings, MonitorPlay, BarChart3, Sun, Moon, Monitor, Maximize, Minimize } from "lucide-react";
import { useTheme } from "next-themes";
import { ProfileDialog } from "@/components/layout/profile-dialog";
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
  const { setTheme, theme } = useTheme();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Prevent hydration mismatch for theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Fullscreen state tracking
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
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

        {/* Center - Quick actions: Screensaver | Themes | Fullscreen */}
        <div className="flex items-center gap-1">
          {/* Screensaver trigger */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={activateScreensaver}
                  className="h-8 w-8 hover:bg-accent/50 transition-all duration-200"
                >
                  <MonitorPlay className="h-[1.1rem] w-[1.1rem] text-violet-500 dark:text-violet-400" />
                  <span className="sr-only">Start screensaver</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Screensaver (⌘⇧S)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="h-5 w-px bg-border/60 mx-1.5" />

          {/* Theme toggles */}
          {mounted && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme("light")}
                      className={`h-8 w-8 hover:bg-accent/50 transition-all duration-200 ${
                        theme === "light" ? "bg-accent/50" : ""
                      }`}
                    >
                      <Sun className={`h-[1.1rem] w-[1.1rem] ${
                        theme === "light" ? "text-amber-500" : "text-muted-foreground"
                      }`} />
                      <span className="sr-only">Light theme</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Light theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme("dark")}
                      className={`h-8 w-8 hover:bg-accent/50 transition-all duration-200 ${
                        theme === "dark" ? "bg-accent/50" : ""
                      }`}
                    >
                      <Moon className={`h-[1.1rem] w-[1.1rem] ${
                        theme === "dark" ? "text-blue-500" : "text-muted-foreground"
                      }`} />
                      <span className="sr-only">Dark theme</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dark theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme("system")}
                      className={`h-8 w-8 hover:bg-accent/50 transition-all duration-200 ${
                        theme === "system" ? "bg-accent/50" : ""
                      }`}
                    >
                      <Monitor className={`h-[1.1rem] w-[1.1rem] ${
                        theme === "system" ? "text-primary" : "text-muted-foreground"
                      }`} />
                      <span className="sr-only">System theme</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>System theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}

          <div className="h-5 w-px bg-border/60 mx-1.5" />

          {/* Fullscreen toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="h-8 w-8 hover:bg-accent/50 transition-all duration-200"
                >
                  {isFullscreen ? (
                    <Minimize className="h-[1.1rem] w-[1.1rem] text-emerald-500" />
                  ) : (
                    <Maximize className="h-[1.1rem] w-[1.1rem] text-muted-foreground hover:text-emerald-500" />
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
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Data Analytics */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push("/data")}
                  className="border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-primary/30 transition-all duration-200"
                >
                  <BarChart3 className="h-[1.2rem] w-[1.2rem] text-primary" />
                  <span className="sr-only">View analytics</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Event Analytics</p>
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
                    {user.avatar && (
                      <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                    )}
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
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
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
                  <Bell className="h-[1.2rem] w-[1.2rem] text-primary" />
                  <span className="sr-only">Pending events</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pending events (⌘/)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Profile Dialog */}
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </header>
  );
}
