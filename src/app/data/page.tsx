"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { ProtectedRoute } from "@/components/auth";
import { Button } from "@/components/ui/button";
import {
  SummaryCards,
  IndustryChart,
  SeniorityChart,
  CompanyScatterChart,
  ChartCard,
} from "@/components/data";
import { getAnalyticsData } from "@/data/analytics";

export default function DataPage() {
  const [data, setData] = React.useState(() => getAnalyticsData());
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setData(getAnalyticsData());
      setIsRefreshing(false);
    }, 500);
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

              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    Event Analytics
                  </h1>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    Attendee insights and engagement metrics
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    Last updated:{" "}
                    {data.lastUpdated.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                    />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-8 max-w-7xl">
              {/* Summary Cards */}
              <SummaryCards summary={data.summary} className="mb-8" />

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Industry Breakdown */}
                <ChartCard
                  title="Attendees by Industry"
                  description="Distribution of attendees across company industries"
                >
                  <IndustryChart data={data.industryBreakdown} variant="bar" />
                </ChartCard>

                {/* Seniority Breakdown */}
                <ChartCard
                  title="Attendees by Seniority"
                  description="Distribution of attendees across seniority levels"
                >
                  <SeniorityChart data={data.seniorityBreakdown} variant="bar" />
                </ChartCard>
              </div>

              {/* Scatter Plot - Full Width */}
              <ChartCard
                title="Company Engagement Analysis"
                description="Dwell time vs sentiment score by company (bubble size = employee count, up to 10K)"
              >
                <CompanyScatterChart data={data.companyData} />
              </ChartCard>
            </div>
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
