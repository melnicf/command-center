"use client";

import * as React from "react";
import { useChatIsOpen } from "@/stores";
import { ChatWindow } from "./chat-window";
import { ChatToggle } from "./chat-toggle";

/**
 * Main Chat component that combines the toggle button and chat window.
 * Add this to your app layout to enable the chatbot.
 */
export function Chat() {
  const isOpen = useChatIsOpen();

  return (
    <>
      {/* Chat Window */}
      {isOpen && <ChatWindow />}
      
      {/* Toggle Button (always visible) */}
      <ChatToggle />
    </>
  );
}
