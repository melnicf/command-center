"use client";

import * as React from "react";
import { App } from "@/types";
import { AppCard, AppViewMode } from "./app-card";
import { cn } from "@/lib/utils";
import { Search, X, Package, Grid3X3, LayoutGrid, Square, Maximize } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppsGridProps {
  apps: App[];
  spaceColor?: string;
  onAppClick?: (app: App) => void;
  showSearch?: boolean;
  className?: string;
}

const viewModes: { mode: AppViewMode; icon: React.ElementType; label: string }[] = [
  { mode: "icons", icon: Grid3X3, label: "Icons only" },
  { mode: "compact", icon: LayoutGrid, label: "Compact" },
  { mode: "default", icon: Square, label: "Default" },
  { mode: "large", icon: Maximize, label: "Large" },
];

export function AppsGrid({ 
  apps, 
  spaceColor, 
  onAppClick, 
  showSearch = true,
  className 
}: AppsGridProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState<AppViewMode>("default");
  
  const filteredApps = React.useMemo(() => {
    if (!searchQuery.trim()) return apps;
    
    const query = searchQuery.toLowerCase();
    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.description?.toLowerCase().includes(query)
    );
  }, [apps, searchQuery]);

  const clearSearch = () => setSearchQuery("");

  // Grid columns based on view mode
  const gridCols = {
    icons: "grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12",
    compact: "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8",
    default: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
    large: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[viewMode];

  // Empty state for no apps
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div 
          className="flex h-20 w-20 items-center justify-center rounded-2xl mb-6"
          style={{ backgroundColor: `${spaceColor || "#8B5CF6"}15` }}
        >
          <Package 
            className="h-10 w-10" 
            style={{ color: spaceColor || "#8B5CF6" }}
          />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No apps yet
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Apps for this space will appear here once they are added.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search and View Toggle Row */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search bar */}
        {showSearch && apps.length > 3 && (
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        )}

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
          {viewModes.map(({ mode, icon: Icon, label }) => (
            <Tooltip key={mode} disableHoverableContent>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "p-2 rounded-md transition-all duration-200",
                    viewMode === mode
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Results count when searching */}
      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          {filteredApps.length === 0
            ? "No apps found"
            : `${filteredApps.length} ${filteredApps.length === 1 ? "app" : "apps"} found`}
        </p>
      )}

      {/* Apps grid */}
      {filteredApps.length > 0 ? (
        <div
          className={cn(
            "grid gap-4",
            gridCols
          )}
        >
          {filteredApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              spaceColor={spaceColor}
              onClick={onAppClick}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : searchQuery ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No results found
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms
          </p>
          <Button variant="outline" size="sm" onClick={clearSearch}>
            Clear search
          </Button>
        </div>
      ) : null}
    </div>
  );
}
