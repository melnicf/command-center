"use client";

import * as React from "react";
import { Header } from "./header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <div className={cn("h-dvh flex flex-col bg-background overflow-hidden", className)}>
      <Header />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      <Sidebar />
    </div>
  );
}
