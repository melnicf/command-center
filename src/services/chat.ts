// Mock chat service with pattern matching for INVNT knowledge base

import type { ChatMessage, ChatResponse, ChatIntent } from '@/types/chat';
import { 
  chatIntents, 
  fallbackResponses, 
  greetingMessage, 
  suggestedQuestions 
} from '@/data/chatResponses';

// Simulated typing delay (ms per character)
const TYPING_DELAY_PER_CHAR = 15;
const MIN_DELAY = 500;
const MAX_DELAY = 2500;

// Generate a unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Calculate typing delay based on response length
function calculateDelay(responseLength: number): number {
  const delay = Math.min(MAX_DELAY, Math.max(MIN_DELAY, responseLength * TYPING_DELAY_PER_CHAR));
  return delay;
}

// Normalize text for matching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .trim();
}

// Calculate match score for a pattern against input
function calculateMatchScore(input: string, pattern: string): number {
  const normalizedInput = normalizeText(input);
  const normalizedPattern = normalizeText(pattern);
  
  // Exact match
  if (normalizedInput === normalizedPattern) {
    return 100;
  }
  
  // Input contains the entire pattern
  if (normalizedInput.includes(normalizedPattern)) {
    return 80 + (normalizedPattern.length / normalizedInput.length) * 20;
  }
  
  // Pattern contains the entire input
  if (normalizedPattern.includes(normalizedInput)) {
    return 60 + (normalizedInput.length / normalizedPattern.length) * 20;
  }
  
  // Word-based matching
  const inputWords = normalizedInput.split(' ');
  const patternWords = normalizedPattern.split(' ');
  
  let matchedWords = 0;
  for (const inputWord of inputWords) {
    for (const patternWord of patternWords) {
      if (inputWord === patternWord || 
          inputWord.includes(patternWord) || 
          patternWord.includes(inputWord)) {
        matchedWords++;
        break;
      }
    }
  }
  
  if (matchedWords > 0) {
    return (matchedWords / Math.max(inputWords.length, patternWords.length)) * 60;
  }
  
  return 0;
}

// Find the best matching intent for user input
function findBestIntent(input: string): { intent: ChatIntent | null; score: number } {
  let bestIntent: ChatIntent | null = null;
  let bestScore = 0;
  
  for (const intent of chatIntents) {
    for (const pattern of intent.patterns) {
      const score = calculateMatchScore(input, pattern);
      
      // Apply priority bonus
      const priorityBonus = (intent.priority || 5) * 2;
      const adjustedScore = score + priorityBonus;
      
      if (adjustedScore > bestScore && score > 30) { // Minimum threshold
        bestScore = adjustedScore;
        bestIntent = intent;
      }
    }
  }
  
  return { intent: bestIntent, score: bestScore };
}

// Get a random item from an array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Get suggested questions based on topics
function getSuggestedQuestions(topics?: string[]): string[] {
  // Return a subset of suggested questions
  const shuffled = [...suggestedQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export const chatService = {
  /**
   * Get the greeting message for new conversations
   */
  getGreeting(): ChatMessage {
    return {
      id: generateId(),
      role: 'assistant',
      content: greetingMessage,
      timestamp: new Date(),
      metadata: {
        topics: ['greeting', 'welcome'],
        confidence: 'high',
        isFallback: false
      }
    };
  },

  /**
   * Process a user message and generate a response
   */
  async sendMessage(userMessage: string): Promise<ChatResponse> {
    // Find the best matching intent
    const { intent, score } = findBestIntent(userMessage);
    
    let responseContent: string;
    let topics: string[] = [];
    let isFallback = false;
    let confidence: 'high' | 'medium' | 'low' = 'high';
    
    if (intent && score > 40) {
      // Use the matched intent's response
      responseContent = getRandomItem(intent.responses);
      topics = intent.topics;
      
      if (score > 70) {
        confidence = 'high';
      } else if (score > 50) {
        confidence = 'medium';
      } else {
        confidence = 'low';
      }
    } else {
      // Use fallback response
      responseContent = getRandomItem(fallbackResponses);
      isFallback = true;
      confidence = 'low';
    }
    
    // Calculate delay for typing simulation
    const delay = calculateDelay(responseContent.length);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, delay));
    
    const message: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      metadata: {
        topics,
        confidence,
        isFallback
      }
    };
    
    return {
      message,
      suggestedQuestions: getSuggestedQuestions(topics)
    };
  },

  /**
   * Get typing delay estimate for UI feedback
   */
  getTypingDelay(messageLength: number): number {
    return calculateDelay(messageLength);
  },

  /**
   * Get all suggested questions
   */
  getSuggestedQuestions(): string[] {
    return suggestedQuestions;
  },

  /**
   * Create a user message object
   */
  createUserMessage(content: string): ChatMessage {
    return {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date()
    };
  }
};

export default chatService;
