"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useSidebarStore, useUser } from "@/stores";
import { UserGreeting } from "./user-greeting";
import { SidebarCalendar } from "./sidebar-calendar";
import { SidebarTodos } from "./sidebar-todos";

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebarStore();
  const user = useUser();

  // Get user's first name or default
  const userName = user?.firstName || "User";

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSidebar()}>
      <SheetContent
        side="right"
        className="w-[380px] sm:w-[420px] sm:max-w-[420px] p-0 border-l border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="flex flex-col h-full">
          {/* Header with Greeting */}
          <SheetHeader className="p-6 pb-4">
            <SheetTitle className="sr-only">Sidebar</SheetTitle>
            <UserGreeting userName={userName} />
          </SheetHeader>

          <Separator className="bg-border/50" />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Calendar Section */}
              <SidebarCalendar />

              <Separator className="bg-border/50" />

              {/* Todos Section */}
              <SidebarTodos />
            </div>
          </div>

          {/* Footer */}
          <Separator className="bg-border/50" />
          <div className="p-4 text-center">
            <p className="text-xs text-muted-foreground">
              Press{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">
                ⌘/
              </kbd>{" "}
              to toggle sidebar
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
