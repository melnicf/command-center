// Mock analytics data for Phase 9: Data Analytics Section

import type {
  AnalyticsData,
  AnalyticsSummary,
  IndustryBreakdown,
  SeniorityBreakdown,
  CompanyDataPoint,
} from "@/types/analytics";

// Theme-aware colors (mapped to CSS variables)
export const chartColors = {
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  glow: "hsl(var(--glow))",
  neon: "hsl(var(--neon))",
  success: "hsl(var(--success))",
  info: "hsl(var(--info))",
  warning: "hsl(var(--warning))",
  chart1: "hsl(var(--chart-1))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
  chart5: "hsl(var(--chart-5))",
};

// Fixed hex colors for charts (matching theme)
export const chartColorsHex = {
  dark: {
    chart1: "#8B5CF6",
    chart2: "#A855F7",
    chart3: "#D946EF",
    chart4: "#10B981",
    chart5: "#0EA5E9",
    chart6: "#F59E0B",
  },
  light: {
    chart1: "#7C3AED",
    chart2: "#A855F7",
    chart3: "#D946EF",
    chart4: "#10B981",
    chart5: "#0EA5E9",
    chart6: "#F59E0B",
  },
};

export const mockSummary: AnalyticsSummary = {
  totalAttendees: 12847,
  averageEngagementScore: 78.5,
  engagementTrend: 12.3, // +12.3% from last period
  attendeeTrend: 8.7, // +8.7% from last period
};

export const mockIndustryBreakdown: IndustryBreakdown[] = [
  { industry: "Technology", attendees: 3854, percentage: 30 },
  { industry: "Finance", attendees: 2184, percentage: 17 },
  { industry: "Healthcare", attendees: 1927, percentage: 15 },
  { industry: "Manufacturing", attendees: 1542, percentage: 12 },
  { industry: "Retail", attendees: 1285, percentage: 10 },
  { industry: "Entertainment", attendees: 1028, percentage: 8 },
  { industry: "Other", attendees: 1027, percentage: 8 },
];

export const mockSeniorityBreakdown: SeniorityBreakdown[] = [
  { level: "C-Suite", attendees: 1542, percentage: 12 },
  { level: "VP / Director", attendees: 2441, percentage: 19 },
  { level: "Manager", attendees: 3340, percentage: 26 },
  { level: "Senior IC", attendees: 2827, percentage: 22 },
  { level: "Mid-Level", attendees: 1799, percentage: 14 },
  { level: "Entry Level", attendees: 898, percentage: 7 },
];

export const mockCompanyData: CompanyDataPoint[] = [
  { company: "Acme Corp", dwellTime: 45, sentimentScore: 85, employees: 8500, industry: "Technology" },
  { company: "GlobalTech", dwellTime: 62, sentimentScore: 92, employees: 10000, industry: "Technology" },
  { company: "FinanceFirst", dwellTime: 38, sentimentScore: 71, employees: 4200, industry: "Finance" },
  { company: "HealthPlus", dwellTime: 55, sentimentScore: 88, employees: 6800, industry: "Healthcare" },
  { company: "RetailMax", dwellTime: 28, sentimentScore: 65, employees: 3100, industry: "Retail" },
  { company: "MediaWorks", dwellTime: 72, sentimentScore: 94, employees: 2400, industry: "Entertainment" },
  { company: "TechStart", dwellTime: 48, sentimentScore: 79, employees: 850, industry: "Technology" },
  { company: "BankSecure", dwellTime: 35, sentimentScore: 68, employees: 5600, industry: "Finance" },
  { company: "MediCare Inc", dwellTime: 58, sentimentScore: 82, employees: 7200, industry: "Healthcare" },
  { company: "CloudNine", dwellTime: 67, sentimentScore: 91, employees: 1800, industry: "Technology" },
  { company: "DataDriven", dwellTime: 52, sentimentScore: 86, employees: 3500, industry: "Technology" },
  { company: "GreenEnergy", dwellTime: 41, sentimentScore: 77, employees: 2900, industry: "Manufacturing" },
  { company: "SmartRetail", dwellTime: 33, sentimentScore: 72, employees: 4800, industry: "Retail" },
  { company: "InnovateCo", dwellTime: 59, sentimentScore: 89, employees: 1200, industry: "Technology" },
  { company: "SecureBank", dwellTime: 44, sentimentScore: 75, employees: 9200, industry: "Finance" },
  { company: "FutureMedia", dwellTime: 65, sentimentScore: 93, employees: 1500, industry: "Entertainment" },
  { company: "AutoMakers", dwellTime: 37, sentimentScore: 69, employees: 8100, industry: "Manufacturing" },
  { company: "PharmaCorp", dwellTime: 54, sentimentScore: 84, employees: 5400, industry: "Healthcare" },
  { company: "DigitalFirst", dwellTime: 71, sentimentScore: 95, employees: 950, industry: "Technology" },
  { company: "TradeGlobal", dwellTime: 42, sentimentScore: 76, employees: 6100, industry: "Finance" },
  { company: "BuildRight", dwellTime: 31, sentimentScore: 63, employees: 7800, industry: "Manufacturing" },
  { company: "StyleBrands", dwellTime: 49, sentimentScore: 81, employees: 2200, industry: "Retail" },
  { company: "WellnessPlus", dwellTime: 56, sentimentScore: 87, employees: 1100, industry: "Healthcare" },
  { company: "StreamMedia", dwellTime: 68, sentimentScore: 90, employees: 3200, industry: "Entertainment" },
  { company: "CyberSafe", dwellTime: 46, sentimentScore: 78, employees: 1600, industry: "Technology" },
];

export const mockAnalyticsData: AnalyticsData = {
  summary: mockSummary,
  industryBreakdown: mockIndustryBreakdown,
  seniorityBreakdown: mockSeniorityBreakdown,
  companyData: mockCompanyData,
  lastUpdated: new Date(),
};

// Helper function to get analytics data
export function getAnalyticsData(): AnalyticsData {
  return {
    ...mockAnalyticsData,
    lastUpdated: new Date(),
  };
}

// Helper to format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Helper to get bubble size for scatter plot (normalized)
export function getBubbleSize(employees: number, maxEmployees: number = 10000): number {
  const minSize = 50;
  const maxSize = 400;
  const normalized = Math.min(employees, maxEmployees) / maxEmployees;
  return minSize + normalized * (maxSize - minSize);
}
