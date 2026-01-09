"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
  isTyping?: boolean;
  isLatest?: boolean; // Whether this is the latest message (for typewriter effect)
  onTyping?: () => void; // Callback when typewriter is updating
}

// Typewriter hook for streaming text effect
function useTypewriter(
  text: string, 
  enabled: boolean, 
  speed: number = 15,
  onUpdate?: () => void
) {
  const [displayedText, setDisplayedText] = React.useState(enabled ? '' : text);
  const [isComplete, setIsComplete] = React.useState(!enabled);
  
  React.useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }
    
    setDisplayedText('');
    setIsComplete(false);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        // Add characters in chunks for better performance
        const chunkSize = Math.min(3, text.length - currentIndex);
        setDisplayedText(text.slice(0, currentIndex + chunkSize));
        currentIndex += chunkSize;
        
        // Trigger scroll callback
        onUpdate?.();
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, enabled, speed, onUpdate]);
  
  return { displayedText, isComplete };
}

// Parse markdown-like formatting in messages
function formatMessage(content: string): React.ReactNode {
  // Split by code blocks, bold, and other formatting
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  
  // Simple markdown parser for bold, bullet points, and emojis
  const lines = content.split('\n');
  
  return (
    <div className="space-y-2 wrap-break-word overflow-hidden">
      {lines.map((line, lineIndex) => {
        // Check for headers (bold lines starting with **)
        if (line.startsWith('**') && line.endsWith('**')) {
          const text = line.slice(2, -2);
          return (
            <p key={lineIndex} className="font-semibold text-foreground wrap-break-word">
              {text}
            </p>
          );
        }
        
        // Check for bullet points
        if (line.startsWith('- ') || line.startsWith('• ')) {
          const text = line.slice(2);
          return (
            <div key={lineIndex} className="flex gap-2 pl-2">
              <span className="text-primary shrink-0">•</span>
              <span className="wrap-break-word min-w-0">{formatInlineText(text)}</span>
            </div>
          );
        }
        
        // Check for emoji bullet points (like 🎯 **text**)
        const emojiMatch = line.match(/^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])\s*\*\*(.+)\*\*$/u);
        if (emojiMatch) {
          return (
            <div key={lineIndex} className="flex gap-2">
              <span className="shrink-0">{emojiMatch[1]}</span>
              <span className="font-semibold wrap-break-word min-w-0">{emojiMatch[2]}</span>
            </div>
          );
        }
        
        // Regular line with inline formatting
        if (line.trim()) {
          return (
            <p key={lineIndex} className="wrap-break-word">
              {formatInlineText(line)}
            </p>
          );
        }
        
        // Empty line
        return <div key={lineIndex} className="h-2" />;
      })}
    </div>
  );
}

// Format inline text (bold, italic, code)
function formatInlineText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Match **bold**, *italic*, `code`, and _underline_
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(_(.+?)_)/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    if (match[2]) {
      // Bold
      parts.push(<strong key={match.index} className="font-semibold">{match[2]}</strong>);
    } else if (match[4]) {
      // Italic
      parts.push(<em key={match.index}>{match[4]}</em>);
    } else if (match[6]) {
      // Code
      parts.push(
        <code key={match.index} className="px-1 py-0.5 rounded bg-muted text-xs font-mono">
          {match[6]}
        </code>
      );
    } else if (match[8]) {
      // Underline (used for suggestions)
      parts.push(<span key={match.index} className="italic text-muted-foreground">{match[8]}</span>);
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
}

export function ChatMessage({ message, isTyping = false, isLatest = false, onTyping }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const shouldAnimate = isLatest && !isUser && !isTyping;
  
  // Use typewriter effect for new assistant messages
  const { displayedText, isComplete } = useTypewriter(
    message.content,
    shouldAnimate,
    12, // Speed in ms per chunk
    onTyping
  );
  
  const textToShow = shouldAnimate ? displayedText : message.content;
  
  return (
    <div
      className={cn(
        "flex gap-3 p-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <Avatar className={cn(
        "h-8 w-8 shrink-0 border",
        isUser 
          ? "border-primary/30 bg-primary/10" 
          : "border-accent/30 bg-accent/10"
      )}>
        <AvatarFallback className={cn(
          "text-xs",
          isUser ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      {/* Message bubble */}
      <div
        className={cn(
          "flex flex-col space-y-1 min-w-0 max-w-[85%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm overflow-hidden wrap-break-word",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted/50 text-foreground rounded-bl-md border border-border/50"
          )}
        >
          {isTyping ? (
            <TypingIndicator />
          ) : (
            <>
              {formatMessage(textToShow)}
              {/* Blinking cursor while typing */}
              {shouldAnimate && !isComplete && (
                <span className="inline-block w-0.5 h-4 bg-current animate-pulse ml-0.5 align-middle" />
              )}
            </>
          )}
        </div>
        
        {/* Timestamp - only show when complete */}
        {(!shouldAnimate || isComplete) && (
          <p className={cn(
            "text-[10px] text-muted-foreground px-2",
            isUser ? "text-right" : "text-left"
          )}>
            {formatTime(message.timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1">
      <span className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
      <span className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
      <span className="h-2 w-2 rounded-full bg-current animate-bounce" />
    </div>
  );
}

// Format timestamp
function formatTime(timestamp: Date): string {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export { TypingIndicator };
