import { LucideIcon } from "lucide-react";

export interface App {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string; // Path to icon image
  iconComponent?: LucideIcon; // Fallback Lucide icon
  url?: string; // External link if applicable
  color?: string; // Brand color for the app
}

export interface Space {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string; // Path to icon image
  iconComponent?: LucideIcon; // Fallback Lucide icon
  color: string; // Brand/accent color for the space
  gradient?: string; // Optional gradient background
  apps: App[];
}

// Space category for grouping (optional, for future use)
export type SpaceCategory = 
  | "creative"
  | "operations"
  | "business"
  | "technology"
  | "wellness";
