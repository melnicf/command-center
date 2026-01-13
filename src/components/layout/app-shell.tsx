"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Header } from "./header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Chat } from "@/components/chat";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useIdleDetection } from "@/hooks/use-idle-detection";
import { useScreensaverActive } from "@/stores/screensaver-store";
import { cn } from "@/lib/utils";

// Instant black overlay shown while Screensaver loads
function ScreensaverPlaceholder() {
  const isActive = useScreensaverActive();
  if (!isActive) return null;
  return <div className="fixed inset-0 z-100 bg-black" />;
}

// Dynamically import Screensaver to avoid SSR issues with Three.js
const Screensaver = dynamic(
  () => import("@/components/screensaver").then((mod) => mod.Screensaver),
  { ssr: false }
);

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  /** Screensaver idle timeout in milliseconds (default: 2 minutes) */
  screensaverTimeout?: number;
  /** Whether to enable screensaver (default: true) */
  enableScreensaver?: boolean;
}

export function AppShell({ 
  children, 
  className,
  screensaverTimeout = 2 * 60 * 1000, // 2 minutes default
  enableScreensaver = true,
}: AppShellProps) {
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();
  
  // Initialize idle detection for screensaver
  useIdleDetection({
    timeout: screensaverTimeout,
    enabled: enableScreensaver,
  });

  return (
    <div className={cn("h-dvh flex flex-col bg-background overflow-hidden", className)}>
      <Header />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      <Sidebar />
      <Chat />
      {enableScreensaver && (
        <>
          <ScreensaverPlaceholder />
          <Screensaver />
        </>
      )}
    </div>
  );
}
