"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuthStore } from "@/stores";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

export function ProtectedRoute({ 
  children, 
  fallbackUrl = "/login" 
}: ProtectedRouteProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const initialize = useAuthStore((state) => state.initialize);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Wait for hydration first
      if (!_hasHydrated) {
        return;
      }
      
      // Initialize auth state from persisted storage
      if (!isInitialized) {
        await initialize();
      }
      
      setIsReady(true);
    };

    checkAuth();
  }, [initialize, isInitialized, _hasHydrated]);

  useEffect(() => {
    // Redirect to login if not authenticated after everything is ready
    if (isReady && isInitialized && _hasHydrated && !user && !isLoading) {
      router.push(fallbackUrl);
    }
  }, [user, isLoading, isReady, isInitialized, _hasHydrated, router, fallbackUrl]);

  // Show loading state while checking authentication
  if (!_hasHydrated || !isInitialized || isLoading || !isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!user) {
    return null;
  }

  return <>{children}</>;
}
