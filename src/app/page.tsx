"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ProtectedRoute } from "@/components/auth";
import { SpacesGrid } from "@/components/spaces";
import { spaces } from "@/data";

export default function Home() {
  return (
    <ProtectedRoute>
      <AppShell>
        <div className="h-full overflow-auto">
          <div className="container mx-auto px-6 py-10 max-w-7xl">
            {/* Welcome Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Spaces
              </h1>
              <p className="text-muted-foreground text-lg">
                Select a space to access tools and applications
              </p>
            </div>

            {/* Spaces Grid */}
            <SpacesGrid spaces={spaces} />
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
