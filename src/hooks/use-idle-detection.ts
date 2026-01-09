"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScreensaverStore } from "@/stores/screensaver-store";

interface UseIdleDetectionOptions {
  /** Timeout in milliseconds before screensaver activates (default: 2 minutes) */
  timeout?: number;
  /** Events to track as user activity */
  events?: string[];
  /** Whether idle detection is enabled */
  enabled?: boolean;
}

const DEFAULT_EVENTS = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
  "wheel",
  "resize",
];

export function useIdleDetection({
  timeout = 2 * 60 * 1000, // 2 minutes default
  events = DEFAULT_EVENTS,
  enabled = true,
}: UseIdleDetectionOptions = {}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActive = useScreensaverStore((s) => s.isActive);
  const activateScreensaver = useScreensaverStore((s) => s.activateScreensaver);
  const updateLastActivity = useScreensaverStore((s) => s.updateLastActivity);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Don't set a new timer if screensaver is already active
    if (isActive) return;

    updateLastActivity();

    timeoutRef.current = setTimeout(() => {
      activateScreensaver();
    }, timeout);
  }, [timeout, isActive, activateScreensaver, updateLastActivity]);

  useEffect(() => {
    if (!enabled) return;

    // Set initial timer
    resetTimer();

    // Add event listeners
    const handleActivity = () => {
      if (!isActive) {
        resetTimer();
      }
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [enabled, events, resetTimer, isActive]);

  // Reset timer when screensaver is deactivated
  useEffect(() => {
    if (!isActive && enabled) {
      resetTimer();
    }
  }, [isActive, enabled, resetTimer]);
}
