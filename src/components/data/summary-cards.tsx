"use client";

import * as React from "react";
import { Users, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnalyticsSummary } from "@/types/analytics";
import { formatNumber } from "@/data/analytics";

interface SummaryCardsProps {
  summary: AnalyticsSummary;
  className?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  suffix?: string;
  className?: string;
}

function StatCard({ title, value, trend, icon, suffix, className }: StatCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        "bg-card/50 backdrop-blur-sm border border-border/50",
        "hover:border-primary/30 transition-all duration-300",
        "group",
        className
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
        
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold tracking-tight">
            {value}
          </span>
          {suffix && (
            <span className="text-lg text-muted-foreground mb-1">{suffix}</span>
          )}
        </div>
        
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-3">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : isNegative ? (
              <TrendingDown className="h-4 w-4 text-destructive" />
            ) : null}
            <span
              className={cn(
                "text-sm font-medium",
                isPositive && "text-success",
                isNegative && "text-destructive",
                !isPositive && !isNegative && "text-muted-foreground"
              )}
            >
              {isPositive && "+"}
              {trend.toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function SummaryCards({ summary, className }: SummaryCardsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      <StatCard
        title="Total Attendees"
        value={formatNumber(summary.totalAttendees)}
        trend={summary.attendeeTrend}
        icon={<Users className="h-5 w-5" />}
      />
      <StatCard
        title="Avg Engagement Score"
        value={summary.averageEngagementScore.toFixed(1)}
        trend={summary.engagementTrend}
        icon={<Activity className="h-5 w-5" />}
        suffix="/ 100"
      />
    </div>
  );
}
