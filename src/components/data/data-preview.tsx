"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { BarChart3, Users, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockSummary, mockIndustryBreakdown, formatNumber } from "@/data/analytics";
import type { AnalyticsSummary, IndustryBreakdown } from "@/types/analytics";

interface DataPreviewProps {
  className?: string;
}

// Mini sparkline-like bar chart
function MiniBarChart({ data }: { data: IndustryBreakdown[] }) {
  const maxValue = Math.max(...data.map((d) => d.attendees));
  
  return (
    <div className="flex items-end gap-1 h-16">
      {data.slice(0, 5).map((item, index) => {
        const height = (item.attendees / maxValue) * 100;
        const colors = [
          "bg-purple-500",
          "bg-purple-400",
          "bg-fuchsia-500",
          "bg-emerald-500",
          "bg-sky-500",
        ];
        return (
          <div
            key={item.industry}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <div
              className={cn(
                "w-full rounded-t transition-all duration-500",
                colors[index % colors.length]
              )}
              style={{ height: `${height}%`, opacity: 0.8 }}
            />
            <span className="text-[9px] text-white/40 truncate w-full text-center">
              {item.industry.slice(0, 4)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function StatItem({
  label,
  value,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  trend?: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
      <div className="p-1.5 rounded-md bg-purple-500/20">
        <Icon className="h-3.5 w-3.5 text-purple-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/50 truncate">{label}</p>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-white">{value}</span>
          {trend !== undefined && (
            <span
              className={cn(
                "flex items-center text-[10px]",
                isPositive && "text-emerald-400",
                isNegative && "text-red-400"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
              ) : isNegative ? (
                <TrendingDown className="h-2.5 w-2.5 mr-0.5" />
              ) : null}
              {isPositive && "+"}
              {trend.toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function DataPreview({ className }: DataPreviewProps) {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [industryData, setIndustryData] = useState<IndustryBreakdown[]>([]);

  useEffect(() => {
    setSummary(mockSummary);
    setIndustryData(mockIndustryBreakdown);
  }, []);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  if (!summary) return null;

  return (
    <div
      className={cn(
        "bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden pointer-events-auto",
        className
      )}
      onClick={stopPropagation}
    >
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-purple-400" />
        <span className="text-sm font-medium text-white/80">Analytics</span>
      </div>

      <div className="p-3 space-y-3">
        {/* Key Metrics */}
        <StatItem
          label="Total Attendees"
          value={formatNumber(summary.totalAttendees)}
          trend={summary.attendeeTrend}
          icon={Users}
        />
        <StatItem
          label="Engagement Score"
          value={`${summary.averageEngagementScore.toFixed(1)}/100`}
          trend={summary.engagementTrend}
          icon={Activity}
        />

        {/* Mini Chart */}
        <div className="pt-2">
          <p className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">
            By Industry
          </p>
          <MiniBarChart data={industryData} />
        </div>
      </div>
    </div>
  );
}
