import { Space } from "@/types";
import {
  Palette,
  Factory,
  DollarSign,
  Users,
  Heart,
  Lightbulb,
  Monitor,
  Bot,
  Building2,
  Figma,
  Briefcase,
  Globe,
  Sparkles,
} from "lucide-react";

export const spaces: Space[] = [
  {
    id: "creative",
    name: "Creative",
    slug: "creative",
    description: "Design, ideation, and creative production tools",
    iconComponent: Palette,
    color: "#EC4899", // Pink
    gradient: "from-pink-500 to-rose-500",
    apps: [
      {
        id: "keynote",
        name: "Keynote",
        slug: "keynote",
        description: "Create stunning presentations",
        icon: "/icons/apps/keynote.png",
        color: "#007AFF",
      },
      {
        id: "midjourney",
        name: "MidJourney",
        slug: "midjourney",
        description: "AI-powered image generation",
        icon: "/icons/apps/midjourney.png",
        color: "#000000",
      },
      {
        id: "leonardo-ai",
        name: "Leonardo AI",
        slug: "leonardo-ai",
        description: "AI art and asset generation",
        icon: "/icons/apps/leonardo ai.jpg",
        color: "#6366F1",
      },
      {
        id: "google-slides",
        name: "Google Slides",
        slug: "google-slides",
        description: "Collaborative presentations",
        icon: "/icons/apps/google slides.png",
        color: "#FBBC04",
      },
      {
        id: "adobe-firefly",
        name: "Adobe Firefly",
        slug: "adobe-firefly",
        description: "Generative AI for creative workflows",
        icon: "/icons/apps/adobe firefly.png",
        color: "#FF61F6",
      },
      {
        id: "runway",
        name: "Runway",
        slug: "runway",
        description: "AI video and image editing",
        icon: "/icons/apps/runway.png",
        color: "#00D4AA",
      },
      {
        id: "adobe-creative-cloud",
        name: "Adobe Creative Cloud",
        slug: "adobe-creative-cloud",
        description: "Complete creative suite",
        icon: "/icons/apps/adobe creative.png",
        color: "#FF0000",
      },
      {
        id: "stable-diffusion",
        name: "Stable Diffusion",
        slug: "stable-diffusion",
        description: "Open-source AI image generation",
        icon: "/icons/apps/stable diffusion.png",
        color: "#8B5CF6",
      },
      {
        id: "figma",
        name: "Figma",
        slug: "figma",
        description: "Collaborative design tool",
        icon: "/icons/apps/Figma Logo.png",
        color: "#F24E1E",
      },
    ],
  },
  {
    id: "production",
    name: "Production",
    slug: "production",
    description: "Event production and 3D design tools",
    iconComponent: Factory,
    color: "#F97316", // Orange
    gradient: "from-orange-500 to-amber-500",
    apps: [
      {
        id: "sketchup",
        name: "SketchUp",
        slug: "sketchup",
        description: "3D modeling software",
        icon: "/icons/apps/SketchUp Logo.png",
        color: "#005F9E",
      },
      {
        id: "autocad",
        name: "AutoCAD",
        slug: "autocad",
        description: "2D and 3D CAD design",
        icon: "/icons/apps/autocad.jpeg",
        color: "#E51937",
      },
      {
        id: "eventcad",
        name: "Event CAD",
        slug: "eventcad",
        description: "Event-specific CAD solutions",
        icon: "/icons/apps/eventcad.png",
        color: "#2563EB",
      },
      {
        id: "vectorworks",
        name: "VectorWorks",
        slug: "vectorworks",
        description: "BIM and CAD software",
        icon: "/icons/apps/Vectorworks Logo.png",
        color: "#000000",
      },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    slug: "finance",
    description: "Financial management and accounting tools",
    iconComponent: DollarSign,
    color: "#10B981", // Emerald
    gradient: "from-emerald-500 to-teal-500",
    apps: [
      {
        id: "xero",
        name: "Xero",
        slug: "xero",
        description: "Cloud accounting software",
        icon: "/icons/apps/xero.svg",
        color: "#13B5EA",
      },
      {
        id: "netsuite",
        name: "NetSuite",
        slug: "netsuite",
        description: "ERP and business management",
        icon: "/icons/apps/netsuite.png",
        color: "#1B3D6D",
      },
      {
        id: "sap-concur",
        name: "SAP Concur",
        slug: "sap-concur",
        description: "Travel and expense management",
        icon: "/icons/apps/SAP Concur Logo.jpg",
        color: "#0072C6",
      },
      {
        id: "procim",
        name: "ProCim",
        slug: "procim",
        description: "Project cost management",
        icon: "/icons/apps/pro cim.png",
        color: "#4F46E5",
      },
    ],
  },
  {
    id: "hr",
    name: "HR",
    slug: "hr",
    description: "Human resources and compliance tools",
    iconComponent: Users,
    color: "#8B5CF6", // Violet
    gradient: "from-violet-500 to-purple-500",
    apps: [
      {
        id: "easy-llama",
        name: "Easy Llama",
        slug: "easy-llama",
        description: "Compliance training platform",
        icon: "/icons/apps/EasyLlama Logo.jpeg",
        color: "#FF6B35",
      },
      {
        id: "faq",
        name: "FAQ",
        slug: "faq",
        description: "Internal knowledge base",
        icon: "/icons/apps/faq logo.webp",
        color: "#6366F1",
      },
      {
        id: "handbook",
        name: "Handbook",
        slug: "handbook",
        description: "Employee handbook and policies",
        icon: "/icons/apps/handbook.png",
        color: "#3B82F6",
      },
    ],
  },
  {
    id: "people-culture",
    name: "People & Culture",
    slug: "people-culture",
    description: "Team engagement and culture initiatives",
    iconComponent: Heart,
    color: "#EF4444", // Red
    gradient: "from-red-500 to-rose-500",
    apps: [],
  },
  {
    id: "innovation",
    name: "Innovation",
    slug: "innovation",
    description: "Research, development, and new ideas",
    iconComponent: Lightbulb,
    color: "#FBBF24", // Amber
    gradient: "from-amber-400 to-yellow-500",
    apps: [],
  },
  {
    id: "it",
    name: "IT",
    slug: "it",
    description: "Information technology and infrastructure",
    iconComponent: Monitor,
    color: "#06B6D4", // Cyan
    gradient: "from-cyan-500 to-blue-500",
    apps: [],
  },
  {
    id: "ai",
    name: "AI",
    slug: "ai",
    description: "Artificial intelligence tools and resources",
    iconComponent: Bot,
    color: "#A855F7", // Purple
    gradient: "from-purple-500 to-indigo-500",
    apps: [],
  },
  {
    id: "offices",
    name: "Offices",
    slug: "offices",
    description: "Office locations and facilities",
    iconComponent: Building2,
    color: "#64748B", // Slate
    gradient: "from-slate-500 to-gray-500",
    apps: [],
  },
  {
    id: "design",
    name: "Design",
    slug: "design",
    description: "Design systems and brand resources",
    iconComponent: Figma,
    color: "#F24E1E", // Figma orange
    gradient: "from-orange-500 to-red-500",
    apps: [],
  },
  {
    id: "freelance",
    name: "Freelance",
    slug: "freelance",
    description: "Freelancer management and resources",
    iconComponent: Briefcase,
    color: "#14B8A6", // Teal
    gradient: "from-teal-500 to-emerald-500",
    apps: [],
  },
  {
    id: "digital",
    name: "Digital",
    slug: "digital",
    description: "Digital marketing and online presence",
    iconComponent: Globe,
    color: "#3B82F6", // Blue
    gradient: "from-blue-500 to-indigo-500",
    apps: [],
  },
  {
    id: "wellbeing",
    name: "Wellbeing / Time Office",
    slug: "wellbeing",
    description: "Employee wellness and time management",
    iconComponent: Sparkles,
    color: "#22C55E", // Green
    gradient: "from-green-500 to-emerald-500",
    apps: [],
  },
];

// Helper functions
export function getSpaceBySlug(slug: string): Space | undefined {
  return spaces.find((space) => space.slug === slug);
}

export function getSpaceById(id: string): Space | undefined {
  return spaces.find((space) => space.id === id);
}

export function getAllSpaces(): Space[] {
  return spaces;
}

export function getSpacesWithApps(): Space[] {
  return spaces.filter((space) => space.apps.length > 0);
}
