"use client";

import * as React from "react";
import Link from "next/link";
import { Space } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface SpaceTileProps {
  space: Space;
  className?: string;
}

export function SpaceTile({ space, className }: SpaceTileProps) {
  const IconComponent = space.iconComponent;
  const appCount = space.apps.length;
  const cardRef = React.useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link
      ref={cardRef}
      href={`/spaces/${space.slug}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "group relative flex flex-col overflow-hidden",
        "rounded-2xl border border-border/50",
        "bg-card p-6",
        "transition-all duration-300 ease-out",
        "hover:border-border/80",
        "hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      {/* Spotlight effect following cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovering
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${space.color}15, transparent 40%)`
            : "none",
        }}
      />

      {/* Subtle border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovering
            ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${space.color}25, transparent 40%)`
            : "none",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Top row: Icon + App count */}
      <div className="relative flex items-start justify-between mb-4">
        {/* Icon */}
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center",
            "rounded-xl transition-all duration-300",
            "group-hover:scale-105"
          )}
          style={{
            backgroundColor: `${space.color}15`,
          }}
        >
          {IconComponent && (
            <IconComponent
              className="h-7 w-7 transition-transform duration-300"
              style={{ color: space.color }}
            />
          )}
        </div>

        {/* App count badge */}
        <div
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
            "transition-colors duration-300"
          )}
          style={{
            backgroundColor: appCount > 0 ? `${space.color}12` : "var(--muted)",
            color: appCount > 0 ? space.color : "var(--muted-foreground)",
          }}
        >
          <span>{appCount}</span>
          <span className="text-xs opacity-70">{appCount === 1 ? "app" : "apps"}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="relative text-lg font-semibold text-foreground mb-2 transition-colors duration-300">
        {space.name}
      </h3>

      {/* Description */}
      <p className="relative text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
        {space.description}
      </p>

      {/* Bottom action hint */}
      <div className="relative flex items-center gap-2 text-sm font-medium text-muted-foreground/70 transition-all duration-300 group-hover:text-foreground">
        <span>Open space</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
