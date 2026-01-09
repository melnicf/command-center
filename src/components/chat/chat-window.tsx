"use client";

import * as React from "react";
import Image from "next/image";
import { X, Trash2, Sparkles, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  useChatStore, 
  useChatMessages, 
  useChatIsTyping,
  useChatSuggestions 
} from "@/stores";
import { ChatMessage, TypingIndicator } from "./chat-message";
import { ChatInput } from "./chat-input";

interface ChatWindowProps {
  className?: string;
}

export function ChatWindow({ className }: ChatWindowProps) {
  const messages = useChatMessages();
  const isTyping = useChatIsTyping();
  const suggestions = useChatSuggestions();
  const { closeChat, sendMessage, clearMessages } = useChatStore();
  
  const [suggestionsExpanded, setSuggestionsExpanded] = React.useState(true);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  // Track message IDs that existed when component mounted (shouldn't animate)
  const initialMessageIds = React.useRef<Set<string> | null>(null);
  
  // On first render, capture existing message IDs
  React.useEffect(() => {
    if (initialMessageIds.current === null) {
      initialMessageIds.current = new Set(messages.map(m => m.id));
    }
  }, []); // Only run once on mount

  // Check if a message is new (added after component mounted)
  const isNewMessage = React.useCallback((messageId: string) => {
    if (initialMessageIds.current === null) return false;
    return !initialMessageIds.current.has(messageId);
  }, []);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Scroll to bottom during typewriter effect
  const handleTypingScroll = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  }, []);

  // Collapse suggestions when a new AI message arrives
  React.useEffect(() => {
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setSuggestionsExpanded(false);
      }
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  const handleSuggestionClick = async (suggestion: string) => {
    await sendMessage(suggestion);
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-[420px] h-[600px] max-h-[80vh]",
        "flex flex-col",
        "rounded-2xl border border-border/50",
        "bg-background/95 backdrop-blur-xl",
        "shadow-2xl shadow-primary/10",
        "animate-in fade-in-0 slide-in-from-bottom-[600px] duration-500",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden shadow-md border-2 border-primary/30 animate-bowie-float">
            <Image
              src="/bowie badger.webp"
              alt="Bowie Badger"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Bowie Badger</h3>
            <p className="text-xs text-muted-foreground">Ask me about INVNT</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearMessages}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Clear chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear conversation</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeChat}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Close</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 overflow-hidden" ref={scrollAreaRef}>
        <div className="flex flex-col overflow-hidden">
          {messages.map((message, index) => {
            const isLatest = index === messages.length - 1;
            const shouldAnimate = isLatest && isNewMessage(message.id);
            
            return (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isLatest={shouldAnimate}
                onTyping={shouldAnimate ? handleTypingScroll : undefined}
              />
            );
          })}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 p-4 animate-in fade-in-0 duration-200">
              <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <div className="rounded-2xl rounded-bl-md bg-muted/50 border border-border/50 px-4 py-3">
                <TypingIndicator />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Suggested Questions - Collapsible */}
      {suggestions.length > 0 && !isTyping && (
        <div className="border-t border-border/50 bg-muted/20">
          <button
            onClick={() => setSuggestionsExpanded(!suggestionsExpanded)}
            className="w-full px-4 py-2 flex items-center justify-between hover:bg-muted/30 transition-colors"
          >
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              Suggested questions
            </span>
            {suggestionsExpanded ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronUp className="h-3 w-3 text-muted-foreground" />
            )}
          </button>
          
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 ease-in-out",
              suggestionsExpanded ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    "text-xs px-2.5 py-1.5 rounded-lg",
                    "bg-primary/10 text-primary hover:bg-primary/20",
                    "border border-primary/20 hover:border-primary/40",
                    "transition-all duration-200",
                    "truncate max-w-[200px]"
                  )}
                  title={suggestion}
                >
                  {suggestion.length > 35 ? suggestion.slice(0, 35) + '...' : suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <ChatInput 
        onSend={handleSendMessage} 
        isDisabled={isTyping}
        placeholder="Ask me about INVNT..."
      />
    </div>
  );
}
