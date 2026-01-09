"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSend, 
  isDisabled = false, 
  placeholder = "Ask me about INVNT..." 
}: ChatInputProps) {
  const [message, setMessage] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !isDisabled) {
      onSend(message.trim());
      setMessage("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-4 border-t border-border/50 bg-background/50"
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isDisabled}
          rows={1}
          className={cn(
            "w-full resize-none rounded-xl border border-border/50 bg-muted/30 px-4 py-3 pr-12",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all duration-200",
            "min-h-[48px] max-h-[120px]"
          )}
        />
      </div>
      
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || isDisabled}
        className={cn(
          "h-12 w-12 rounded-xl shrink-0",
          "bg-primary hover:bg-primary/90",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-all duration-200",
          "shadow-md hover:shadow-lg"
        )}
      >
        <Send className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
