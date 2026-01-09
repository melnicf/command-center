"use client";

import * as React from "react";
import { Space } from "@/types";
import { SpaceTile } from "./space-tile";
import { cn } from "@/lib/utils";

interface SpacesGridProps {
  spaces: Space[];
  className?: string;
}

export function SpacesGrid({ spaces, className }: SpacesGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
        className
      )}
    >
      {spaces.map((space) => (
        <SpaceTile key={space.id} space={space} />
      ))}
    </div>
  );
}
