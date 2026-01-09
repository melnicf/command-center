import { create } from "zustand";

interface ScreensaverState {
  isActive: boolean;
  idleTimeout: number; // in milliseconds
  lastActivity: number;
  location: string;
  timezone: string;
  activateScreensaver: () => void;
  deactivateScreensaver: () => void;
  updateLastActivity: () => void;
  setIdleTimeout: (timeout: number) => void;
  setLocation: (location: string, timezone: string) => void;
}

// Default idle timeout: 2 minutes (120000ms) - can be adjusted
const DEFAULT_IDLE_TIMEOUT = 2 * 60 * 1000;

// Try to get user's timezone and approximate location
function getDefaultTimezone(): string {
  if (typeof window === "undefined") return "UTC";
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

function getLocationFromTimezone(timezone: string): string {
  // Extract a readable location from timezone
  const parts = timezone.split("/");
  if (parts.length >= 2) {
    return parts[parts.length - 1].replace(/_/g, " ");
  }
  return timezone;
}

const defaultTimezone = getDefaultTimezone();
const defaultLocation = getLocationFromTimezone(defaultTimezone);

export const useScreensaverStore = create<ScreensaverState>((set) => ({
  isActive: false,
  idleTimeout: DEFAULT_IDLE_TIMEOUT,
  lastActivity: Date.now(),
  location: defaultLocation,
  timezone: defaultTimezone,
  activateScreensaver: () => set({ isActive: true }),
  deactivateScreensaver: () => set({ isActive: false, lastActivity: Date.now() }),
  updateLastActivity: () => set({ lastActivity: Date.now() }),
  setIdleTimeout: (timeout: number) => set({ idleTimeout: timeout }),
  setLocation: (location: string, timezone: string) => set({ location, timezone }),
}));

// Individual selector hooks for better performance (avoids object creation)
export const useScreensaverActive = () => useScreensaverStore((state) => state.isActive);
export const useScreensaverLocationName = () => useScreensaverStore((state) => state.location);
export const useScreensaverTimezone = () => useScreensaverStore((state) => state.timezone);
