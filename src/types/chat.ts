// Chat types and interfaces for the AI chatbot

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: ChatMessageMetadata;
}

export interface ChatMessageMetadata {
  // Source references for the response
  sources?: string[];
  // Confidence level of the response
  confidence?: 'high' | 'medium' | 'low';
  // Categories/topics matched
  topics?: string[];
  // Whether this is a fallback response
  isFallback?: boolean;
}

export interface ChatConversation {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  title?: string;
}

export interface ChatIntent {
  id: string;
  patterns: string[];
  responses: string[];
  topics: string[];
  priority?: number;
}

export interface KnowledgeEntity {
  id: string;
  type: EntityType;
  name: string;
  description?: string;
  attributes: Record<string, unknown>;
  relatedEntities?: string[];
}

export type EntityType = 
  | 'company'
  | 'service'
  | 'office'
  | 'leader'
  | 'case_study'
  | 'client'
  | 'capability'
  | 'region';

export interface CaseStudy {
  id: string;
  name: string;
  client: string;
  description: string;
  metrics: CaseStudyMetric[];
  capabilities: string[];
  year?: number;
  region?: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  type: 'impressions' | 'reach' | 'revenue' | 'roi' | 'visits' | 'placements' | 'other';
}

export interface Office {
  city: string;
  country: string;
  region: 'North America' | 'EMEA' | 'APAC' | 'South Asia';
  address: string;
  isHQ?: boolean;
}

export interface Leader {
  name: string;
  title: string;
  department?: string;
}

// Chat service response
export interface ChatResponse {
  message: ChatMessage;
  suggestedQuestions?: string[];
}

// Chat input props
export interface ChatInputData {
  message: string;
  conversationId?: string;
}
