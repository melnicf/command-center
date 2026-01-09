"use client";

import * as React from "react";
import { Info, Keyboard, Sparkles, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShortcutItem {
  keys: string[];
  description: string;
}

const keyboardShortcuts: ShortcutItem[] = [
  { keys: ["⌘", "K"], description: "Open search" },
  { keys: ["⌘", "/"], description: "Toggle notifications sidebar" },
  { keys: ["⌘", "B"], description: "Toggle sidebar (alternative)" },
  { keys: ["⌘", "⇧", "S"], description: "Activate screensaver" },
  { keys: ["ESC"], description: "Close dialogs / Exit screensaver" },
  { keys: ["F11"], description: "Toggle fullscreen" },
];

const features = [
  {
    icon: Globe,
    title: "Interactive 3D Spaces",
    description: "Explore virtual event spaces with full 3D navigation",
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description: "Track engagement and metrics across all events",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Assistant",
    description: "Get help with chat-based AI support (⌘ + J)",
  },
];

function KeyboardKey({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

export function InfoDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-primary/30 transition-all duration-200"
              >
                <Info className="h-[1.2rem] w-[1.2rem] text-primary" />
                <span className="sr-only">Info & Shortcuts</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Info & Shortcuts</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Command Center Info
          </DialogTitle>
          <DialogDescription>
            Your hub for managing and exploring virtual event spaces.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Keyboard Shortcuts Section */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-sm font-medium">
              <Keyboard className="h-4 w-4 text-muted-foreground" />
              Keyboard Shortcuts
            </h4>
            <div className="space-y-2">
              {keyboardShortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        <KeyboardKey>{key}</KeyboardKey>
                        {keyIndex < shortcut.keys.length - 1 && (
                          <span className="text-muted-foreground text-xs">+</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Features Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Features</h4>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium leading-none">
                      {feature.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Version Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>INVNT Command Center</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
