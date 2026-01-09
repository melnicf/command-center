"use client";

import * as React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { ProtectedRoute } from "@/components/auth";
import { AppsGrid } from "@/components/apps";
import { HoverImageText } from "@/components/shared/hover-image-text";
import { getSpaceBySlug } from "@/data/spaces";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { App } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SpaceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const space = getSpaceBySlug(slug);

  const [selectedApp, setSelectedApp] = React.useState<App | null>(null);

  // Handle case where space doesn't exist
  if (!space) {
    notFound();
  }

  const IconComponent = space.iconComponent;

  const handleAppClick = (app: App) => {
    if (app.url) {
      // If the app has a URL, open it in a new tab
      window.open(app.url, "_blank", "noopener,noreferrer");
    } else {
      // Otherwise show app details modal
      setSelectedApp(app);
    }
  };

  return (
    <ProtectedRoute>
      <AppShell>
        <div className="h-full flex flex-col overflow-hidden">
          {/* Sticky Header */}
          <div className="shrink-0 bg-background/95 backdrop-blur-sm border-b border-border/50 z-10">
            <div className="container mx-auto px-6 py-4 max-w-7xl">
              {/* Back navigation */}
              <div className="mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="group -ml-2 text-muted-foreground hover:text-foreground"
                >
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Spaces
                  </Link>
                </Button>
              </div>

              {/* Space Header */}
              <div className="flex items-center gap-4">
                {/* Space Icon */}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center shrink-0",
                    "rounded-xl transition-all duration-300"
                  )}
                  style={{
                    backgroundColor: `${space.color}15`,
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      className="h-6 w-6"
                      style={{ color: space.color }}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold tracking-tight">
                    {space.name}
                  </h1>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {space.description}
                  </p>
                </div>

                {/* Apps count */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium shrink-0"
                  style={{
                    backgroundColor:
                      space.apps.length > 0 ? `${space.color}12` : "var(--muted)",
                    color:
                      space.apps.length > 0
                        ? space.color
                        : "var(--muted-foreground)",
                  }}
                >
                  <span>{space.apps.length}</span>
                  <span className="opacity-70">
                    {space.apps.length === 1 ? "app" : "apps"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-8 max-w-7xl">

              {/* Long Description with hover images */}
              {space.longDescription && (
                <div className="mb-10 max-w-3xl">
                  <HoverImageText
                    text={space.longDescription}
                    hoverWords={space.hoverWords || []}
                    accentColor={space.color}
                    className="text-base"
                  />
                </div>
              )}

              {/* Apps Grid */}
              <AppsGrid
                apps={space.apps}
                spaceColor={space.color}
                onAppClick={handleAppClick}
              />
            </div>
          </div>
        </div>

        {/* App Details Modal */}
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-4">
                {selectedApp && (
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
                    style={{
                      backgroundColor: `${selectedApp.color || space.color}15`,
                    }}
                  >
                    {selectedApp.iconComponent ? (
                      <selectedApp.iconComponent
                        className="h-6 w-6"
                        style={{ color: selectedApp.color || space.color }}
                      />
                    ) : (
                      <div
                        className="h-6 w-6 rounded"
                        style={{
                          backgroundColor: selectedApp.color || space.color,
                        }}
                      />
                    )}
                  </div>
                )}
                <div>
                  <DialogTitle>{selectedApp?.name}</DialogTitle>
                  {selectedApp?.description && (
                    <DialogDescription className="mt-1">
                      {selectedApp.description}
                    </DialogDescription>
                  )}
                </div>
              </div>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                This app integration is coming soon. Stay tuned for updates!
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </AppShell>
    </ProtectedRoute>
  );
}
