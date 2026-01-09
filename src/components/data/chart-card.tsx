"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export function ChartCard({ title, description, children, className, actions }: ChartCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        "bg-card/50 backdrop-blur-sm border border-border/50",
        "hover:border-primary/20 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
