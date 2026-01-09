"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import type { SeniorityBreakdown } from "@/types/analytics";
import { chartColorsHex } from "@/data/analytics";

interface SeniorityChartProps {
  data: SeniorityBreakdown[];
  variant?: "bar" | "pie";
  className?: string;
}

const COLORS_DARK = [
  chartColorsHex.dark.chart1,
  chartColorsHex.dark.chart2,
  chartColorsHex.dark.chart3,
  chartColorsHex.dark.chart4,
  chartColorsHex.dark.chart5,
  chartColorsHex.dark.chart6,
];

const COLORS_LIGHT = [
  chartColorsHex.light.chart1,
  chartColorsHex.light.chart2,
  chartColorsHex.light.chart3,
  chartColorsHex.light.chart4,
  chartColorsHex.light.chart5,
  chartColorsHex.light.chart6,
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: SeniorityBreakdown;
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground">{data.level}</p>
        <p className="text-sm text-muted-foreground">
          {data.attendees.toLocaleString()} attendees
        </p>
        <p className="text-sm text-primary">{data.percentage}%</p>
      </div>
    );
  }
  return null;
}

export function SeniorityChart({ data, variant = "bar", className }: SeniorityChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT;
  const textColor = isDark ? "#A1A1AA" : "#71717A";
  const gridColor = isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(124, 58, 237, 0.1)";
  const cursorColor = isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(124, 58, 237, 0.1)";

  if (variant === "pie") {
    return (
      <div className={cn("w-full h-[300px]", className)}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="attendees"
              nameKey="level"
              label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={{ stroke: textColor, strokeWidth: 1 }}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => <span style={{ color: textColor }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="level"
            tick={{ fill: textColor, fontSize: 11 }}
            tickLine={{ stroke: textColor }}
            axisLine={{ stroke: gridColor }}
            angle={-25}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: textColor, fontSize: 12 }}
            tickLine={{ stroke: textColor }}
            axisLine={{ stroke: gridColor }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: cursorColor }} />
          <Bar dataKey="attendees" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
