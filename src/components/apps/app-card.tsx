"use client";

import * as React from "react";
import Image from "next/image";
import { App } from "@/types";
import { cn } from "@/lib/utils";
import { ExternalLink, Box } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type AppViewMode = "icons" | "compact" | "default" | "large";

interface AppCardProps {
  app: App;
  spaceColor?: string;
  onClick?: (app: App) => void;
  viewMode?: AppViewMode;
  className?: string;
}

export function AppCard({ app, spaceColor, onClick, viewMode = "default", className }: AppCardProps) {
  const cardRef = React.useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = () => {
    if (onClick) {
      onClick(app);
    } else if (app.url) {
      window.open(app.url, "_blank", "noopener,noreferrer");
    }
  };

  const accentColor = app.color || spaceColor || "#8B5CF6";

  // View mode configurations
  const config = {
    icons: {
      padding: "p-3",
      iconSize: "h-12 w-12",
      iconInner: "h-6 w-6",
      rounded: "rounded-xl",
      showName: false,
      showDescription: false,
    },
    compact: {
      padding: "p-4",
      iconSize: "h-12 w-12",
      iconInner: "h-6 w-6",
      rounded: "rounded-xl",
      showName: true,
      showDescription: false,
    },
    default: {
      padding: "p-6",
      iconSize: "h-16 w-16",
      iconInner: "h-8 w-8",
      rounded: "rounded-2xl",
      showName: true,
      showDescription: true,
    },
    large: {
      padding: "p-8",
      iconSize: "h-20 w-20",
      iconInner: "h-10 w-10",
      rounded: "rounded-2xl",
      showName: true,
      showDescription: true,
    },
  }[viewMode];

  const cardContent = (
    <button
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "group relative flex flex-col items-center text-center overflow-hidden",
        config.rounded,
        "border border-border/50",
        "bg-card",
        config.padding,
        "transition-all duration-300 ease-out",
        "hover:border-border/80",
        "hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "cursor-pointer w-full",
        className
      )}
    >
      {/* Spotlight effect following cursor */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        )}
        style={{
          background: isHovering
            ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${accentColor}15, transparent 40%)`
            : "none",
        }}
      />

      {/* Subtle border glow on hover */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          config.rounded
        )}
        style={{
          background: isHovering
            ? `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, ${accentColor}25, transparent 40%)`
            : "none",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* External link indicator */}
      {app.url && viewMode !== "icons" && (
        <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ExternalLink 
            className="h-4 w-4 text-muted-foreground/70" 
          />
        </div>
      )}

      {/* App Icon */}
      <div
        className={cn(
          "relative flex items-center justify-center",
          config.iconSize,
          config.rounded,
          config.showName && "mb-3",
          "overflow-hidden",
          "transition-all duration-300",
          "group-hover:scale-110 group-hover:shadow-lg"
        )}
        style={{
          backgroundColor: !app.icon || imageError ? `${accentColor}15` : "transparent",
          boxShadow: isHovering ? `0 8px 24px ${accentColor}20` : "none",
        }}
      >
        {app.icon && app.icon.trim() !== "" && !imageError ? (
          <Image
            src={app.icon}
            alt={app.name}
            fill
            className="object-contain p-1"
            onError={() => setImageError(true)}
          />
        ) : app.iconComponent ? (
          <app.iconComponent
            className={config.iconInner}
            style={{ color: accentColor }}
          />
        ) : (
          <Box
            className={config.iconInner}
            style={{ color: accentColor }}
          />
        )}
      </div>

      {/* App Name */}
      {config.showName && (
        <h3 className={cn(
          "relative font-semibold text-foreground transition-colors duration-300 line-clamp-1",
          viewMode === "large" ? "text-base mb-2" : "text-sm mb-1"
        )}>
          {app.name}
        </h3>
      )}

      {/* App Description */}
      {config.showDescription && app.description && (
        <p className={cn(
          "relative text-muted-foreground",
          viewMode === "large" ? "text-sm line-clamp-3" : "text-xs line-clamp-2"
        )}>
          {app.description}
        </p>
      )}
    </button>
  );

  // For icons-only mode, wrap in tooltip
  if (viewMode === "icons") {
    return (
      <Tooltip disableHoverableContent>
        <TooltipTrigger asChild>
          {cardContent}
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{app.name}</p>
          {app.description && (
            <p className="text-xs text-muted-foreground max-w-[200px]">{app.description}</p>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return cardContent;
}
