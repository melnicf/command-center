// Analytics data types for Phase 9: Data Analytics Section

export interface AnalyticsSummary {
  totalAttendees: number;
  averageEngagementScore: number;
  engagementTrend: number; // percentage change from previous period
  attendeeTrend: number; // percentage change from previous period
}

export interface IndustryBreakdown {
  [key: string]: string | number | undefined;
  industry: string;
  attendees: number;
  percentage: number;
  color?: string;
}

export interface SeniorityBreakdown {
  [key: string]: string | number | undefined;
  level: string;
  attendees: number;
  percentage: number;
  color?: string;
}

export interface CompanyDataPoint {
  [key: string]: string | number;
  company: string;
  dwellTime: number; // in minutes
  sentimentScore: number; // 1-100
  employees: number; // number of employees (for bubble size)
  industry: string;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  industryBreakdown: IndustryBreakdown[];
  seniorityBreakdown: SeniorityBreakdown[];
  companyData: CompanyDataPoint[];
  lastUpdated: Date;
}
