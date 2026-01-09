"use client";

import * as React from "react";
import { useSidebarStore } from "@/stores/sidebar-store";

export function useKeyboardShortcuts() {
  const { toggleSidebar } = useSidebarStore();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K - Open search (placeholder - can be extended)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // TODO: Open search modal when implemented
        console.log("Search triggered (Cmd+K)");
      }

      // Cmd/Ctrl + / - Toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        toggleSidebar();
      }

      // Cmd/Ctrl + B - Toggle sidebar (alternative)
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }

      // ESC - Close sidebar (only when sidebar is open)
      if (e.key === "Escape") {
        // Sidebar will close via Sheet's built-in ESC handling
        // This is handled by the Sheet component automatically
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
}
