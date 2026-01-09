// Chat store with Zustand - manages chat conversation state

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ChatMessage } from '@/types/chat';
import { chatService } from '@/services/chat';

interface ChatState {
  // State
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  suggestedQuestions: string[];
  hasInitialized: boolean;
  
  // Actions
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  initialize: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // Initial state
      messages: [],
      isOpen: false,
      isTyping: false,
      suggestedQuestions: [],
      hasInitialized: false,

      // Open chat window
      openChat: () => {
        const { hasInitialized, initialize } = get();
        if (!hasInitialized) {
          initialize();
        }
        set({ isOpen: true });
      },

      // Close chat window
      closeChat: () => {
        set({ isOpen: false });
      },

      // Toggle chat window
      toggleChat: () => {
        const { isOpen, hasInitialized, initialize } = get();
        if (!isOpen && !hasInitialized) {
          initialize();
        }
        set({ isOpen: !isOpen });
      },

      // Initialize chat with greeting
      initialize: () => {
        const { messages } = get();
        
        // Only add greeting if no messages exist
        if (messages.length === 0) {
          const greeting = chatService.getGreeting();
          const suggestions = chatService.getSuggestedQuestions();
          
          set({
            messages: [greeting],
            suggestedQuestions: suggestions.slice(0, 3),
            hasInitialized: true
          });
        } else {
          set({ hasInitialized: true });
        }
      },

      // Send a message
      sendMessage: async (content: string) => {
        const trimmedContent = content.trim();
        if (!trimmedContent) return;

        // Create user message
        const userMessage = chatService.createUserMessage(trimmedContent);
        
        // Add user message and set typing
        set((state) => ({
          messages: [...state.messages, userMessage],
          isTyping: true,
          suggestedQuestions: [] // Clear suggestions while typing
        }));

        try {
          // Get AI response
          const response = await chatService.sendMessage(trimmedContent);
          
          // Add assistant message
          set((state) => ({
            messages: [...state.messages, response.message],
            isTyping: false,
            suggestedQuestions: response.suggestedQuestions || []
          }));
        } catch (error) {
          console.error('Failed to get chat response:', error);
          
          // Add error message
          const errorMessage: ChatMessage = {
            id: Math.random().toString(36).substring(2) + Date.now().toString(36),
            role: 'assistant',
            content: "I'm sorry, I encountered an error processing your request. Please try again.",
            timestamp: new Date(),
            metadata: {
              isFallback: true,
              confidence: 'low'
            }
          };
          
          set((state) => ({
            messages: [...state.messages, errorMessage],
            isTyping: false,
            suggestedQuestions: chatService.getSuggestedQuestions().slice(0, 3)
          }));
        }
      },

      // Clear all messages
      clearMessages: () => {
        const greeting = chatService.getGreeting();
        const suggestions = chatService.getSuggestedQuestions();
        
        set({
          messages: [greeting],
          suggestedQuestions: suggestions.slice(0, 3),
          isTyping: false
        });
      }
    }),
    {
      name: 'invnt-chat',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        messages: state.messages.map(msg => ({
          ...msg,
          // Ensure timestamp is serializable
          timestamp: msg.timestamp instanceof Date 
            ? msg.timestamp.toISOString() 
            : msg.timestamp
        })),
        hasInitialized: state.hasInitialized
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert timestamp strings back to Date objects
          state.messages = state.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        }
      }
    }
  )
);

// Selector hooks for common patterns
export const useChatMessages = () => useChatStore((state) => state.messages);
export const useChatIsOpen = () => useChatStore((state) => state.isOpen);
export const useChatIsTyping = () => useChatStore((state) => state.isTyping);
export const useChatSuggestions = () => useChatStore((state) => state.suggestedQuestions);
