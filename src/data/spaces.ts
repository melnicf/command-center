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
    longDescription: "Welcome to the Creative space, your hub for design excellence and visual storytelling. Here you'll find powerful tools like Figma for collaborative interface design, MidJourney for AI-powered imagery, and the complete Adobe suite for professional production. Whether you're crafting presentations in Keynote or generating stunning visuals with Runway, this space empowers your creative vision.",
    hoverWords: [
      { word: "Figma", image: "/icons/apps/Figma Logo.png", alt: "Figma design tool" },
      { word: "MidJourney", image: "/icons/apps/midjourney.png", alt: "MidJourney AI" },
      { word: "Adobe", image: "/icons/apps/adobe creative.png", alt: "Adobe Creative Cloud" },
      { word: "Keynote", image: "/icons/apps/keynote.png", alt: "Apple Keynote" },
      { word: "Runway", image: "/icons/apps/runway.png", alt: "Runway AI video" },
    ],
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
    longDescription: "The Production space is where ideas become reality. Our team leverages industry-leading CAD software including AutoCAD for precise technical drawings, SketchUp for rapid 3D modeling, and VectorWorks for comprehensive BIM workflows. From initial concept to final installation, these tools ensure every event is executed with precision.",
    hoverWords: [
      { word: "AutoCAD", image: "/icons/apps/autocad.jpeg", alt: "AutoCAD software" },
      { word: "SketchUp", image: "/icons/apps/SketchUp Logo.png", alt: "SketchUp 3D" },
      { word: "VectorWorks", image: "/icons/apps/Vectorworks Logo.png", alt: "VectorWorks BIM" },
    ],
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
    longDescription: "The Finance space centralizes all financial operations and reporting. Access Xero for cloud-based accounting, NetSuite for enterprise resource planning, and Concur for seamless expense management. ProCim helps track project costs in real-time, ensuring every budget stays on target and every dollar is accounted for.",
    hoverWords: [
      { word: "Xero", image: "/icons/apps/xero.svg", alt: "Xero accounting" },
      { word: "NetSuite", image: "/icons/apps/netsuite.png", alt: "NetSuite ERP" },
      { word: "Concur", image: "/icons/apps/SAP Concur Logo.jpg", alt: "SAP Concur" },
      { word: "ProCim", image: "/icons/apps/pro cim.png", alt: "ProCim" },
    ],
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
    longDescription: "The HR space is your destination for all things people-related. Complete compliance training through Llama, find answers in our comprehensive FAQ knowledge base, and reference company policies in the Handbook. We're committed to making human resources accessible and straightforward for everyone.",
    hoverWords: [
      { word: "Llama", image: "/icons/apps/EasyLlama Logo.jpeg", alt: "Easy Llama training" },
      { word: "FAQ", image: "/icons/apps/faq logo.webp", alt: "FAQ knowledge base" },
      { word: "Handbook", image: "/icons/apps/handbook.png", alt: "Employee handbook" },
    ],
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
    longDescription: "People & Culture is the heart of our organization. This space celebrates our team through engagement initiatives, recognition programs, and community building. From company events to professional development opportunities, we foster an environment where everyone can thrive and grow together.",
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
    longDescription: "The Innovation space is where tomorrow's ideas take shape today. This is our laboratory for experimentation, research, and breakthrough thinking. Whether exploring emerging technologies or reimagining existing processes, this space encourages bold ideas and creative problem-solving.",
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
    longDescription: "The IT space manages our digital infrastructure and technical support. From network security to hardware provisioning, our technology team ensures seamless operations across all offices. Submit support tickets, access system documentation, and stay updated on maintenance schedules.",
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
    longDescription: "The AI space is your gateway to artificial intelligence and machine learning tools. Explore generative AI for content creation, leverage automation for repetitive tasks, and discover how intelligent systems can enhance your workflow. This space bridges cutting-edge technology with practical applications.",
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
    longDescription: "The Offices space connects you to all our global locations. Find office directories, book meeting rooms, and access facility information. Whether you're visiting a new location or managing your home office setup, this space has everything you need to stay connected.",
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
    longDescription: "The Design space houses our brand guidelines, design systems, and visual assets. Access logo files, color palettes, typography standards, and template libraries. This is the definitive source for maintaining brand consistency across all touchpoints and communications.",
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
    longDescription: "The Freelance space streamlines collaboration with our extended network of talent. Manage contractor onboarding, track project assignments, and handle invoicing workflows. This space ensures smooth operations with our valued freelance partners around the world.",
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
    longDescription: "The Digital space powers our online presence and marketing initiatives. From social media management to analytics dashboards, this space provides tools for digital engagement, content distribution, and performance tracking across all digital channels.",
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
    longDescription: "The Wellbeing space prioritizes your health and work-life balance. Access mental health resources, track time off requests, and discover wellness programs. From meditation guides to fitness challenges, we support your journey to a healthier, more balanced professional life.",
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
