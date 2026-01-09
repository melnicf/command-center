"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores";

/**
 * Custom hook for authentication
 * Provides easy access to auth state and actions
 */
export function useAuth() {
  const {
    user,
    token,
    isLoading,
    isInitialized,
    error,
    login,
    signUp,
    logout,
    clearError,
    initialize,
  } = useAuthStore();

  // Initialize auth on mount
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  return {
    // State
    user,
    token,
    isLoading,
    isInitialized,
    isAuthenticated: !!user,
    error,

    // Actions
    login,
    signUp,
    logout,
    clearError,
  };
}
