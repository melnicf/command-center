"use client";

import * as React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import type { CompanyDataPoint } from "@/types/analytics";
import { chartColorsHex } from "@/data/analytics";

interface CompanyScatterChartProps {
  data: CompanyDataPoint[];
  className?: string;
}

const INDUSTRY_COLORS_DARK: Record<string, string> = {
  Technology: chartColorsHex.dark.chart1,
  Finance: chartColorsHex.dark.chart4,
  Healthcare: chartColorsHex.dark.chart5,
  Retail: chartColorsHex.dark.chart6,
  Manufacturing: chartColorsHex.dark.chart3,
  Entertainment: chartColorsHex.dark.chart2,
  Other: "#71717A",
};

const INDUSTRY_COLORS_LIGHT: Record<string, string> = {
  Technology: chartColorsHex.light.chart1,
  Finance: chartColorsHex.light.chart4,
  Healthcare: chartColorsHex.light.chart5,
  Retail: chartColorsHex.light.chart6,
  Manufacturing: chartColorsHex.light.chart3,
  Entertainment: chartColorsHex.light.chart2,
  Other: "#71717A",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: CompanyDataPoint;
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg min-w-[180px]">
        <p className="font-semibold text-foreground mb-2">{data.company}</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sentiment:</span>
            <span className="text-primary font-medium">{data.sentimentScore}/100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dwell Time:</span>
            <span className="font-medium">{data.dwellTime} min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Employees:</span>
            <span className="font-medium">{data.employees.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Industry:</span>
            <span className="font-medium">{data.industry}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: CompanyDataPoint;
  isDark?: boolean;
}

function CustomDot({ cx, cy, payload, isDark }: CustomDotProps) {
  if (!cx || !cy || !payload) return null;
  
  const colors = isDark ? INDUSTRY_COLORS_DARK : INDUSTRY_COLORS_LIGHT;
  const color = colors[payload.industry] || colors.Other;
  const size = Math.sqrt(payload.employees / 10000) * 20 + 6;
  
  return (
    <circle
      cx={cx}
      cy={cy}
      r={size}
      fill={color}
      fillOpacity={0.7}
      stroke={color}
      strokeWidth={2}
      className="transition-all duration-200 hover:fill-opacity-100"
    />
  );
}

// Custom legend component
function CustomLegend({ industries, colors }: { industries: string[]; colors: Record<string, string> }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-4">
      {industries.map((industry) => (
        <div key={industry} className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors[industry] || colors.Other }}
          />
          <span className="text-xs text-muted-foreground">{industry}</span>
        </div>
      ))}
    </div>
  );
}

export function CompanyScatterChart({ data, className }: CompanyScatterChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const textColor = isDark ? "#A1A1AA" : "#71717A";
  const gridColor = isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(124, 58, 237, 0.1)";
  const cursorStroke = isDark ? "rgba(139, 92, 246, 0.5)" : "rgba(124, 58, 237, 0.4)";
  const colors = isDark ? INDUSTRY_COLORS_DARK : INDUSTRY_COLORS_LIGHT;

  // Group data by industry for legend
  const industries = [...new Set(data.map((d) => d.industry))];

  return (
    <div className={cn("w-full", className)}>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              type="number"
              dataKey="sentimentScore"
              name="Sentiment Score"
              domain={[0, 100]}
              tick={{ fill: textColor, fontSize: 12 }}
              tickLine={{ stroke: textColor }}
              axisLine={{ stroke: gridColor }}
              label={{
                value: "Sentiment Score (1-100)",
                position: "insideBottom",
                offset: -10,
                fill: textColor,
                fontSize: 12,
              }}
            />
            <YAxis
              type="number"
              dataKey="dwellTime"
              name="Dwell Time"
              domain={[0, 80]}
              tick={{ fill: textColor, fontSize: 12 }}
              tickLine={{ stroke: textColor }}
              axisLine={{ stroke: gridColor }}
              label={{
                value: "Dwell Time (min)",
                angle: -90,
                position: "insideLeft",
                fill: textColor,
                fontSize: 12,
              }}
            />
            <ZAxis
              type="number"
              dataKey="employees"
              range={[50, 400]}
              name="Employees"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3", stroke: cursorStroke }} />
            <Scatter
              name="Companies"
              data={data}
              shape={(props: CustomDotProps) => <CustomDot {...props} isDark={isDark} />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend industries={industries} colors={colors} />
    </div>
  );
}
