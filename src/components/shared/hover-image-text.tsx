"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HoverWord } from "@/types";

interface HoverImageTextProps {
  text: string;
  hoverWords: HoverWord[];
  className?: string;
  accentColor?: string;
}

interface HoverImageProps {
  word: string;
  image: string;
  alt?: string;
  accentColor?: string;
}

function HoverImage({ word, image, alt, accentColor }: HoverImageProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [wordWidth, setWordWidth] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const wordRef = React.useRef<HTMLSpanElement>(null);

  // Mount check for portal
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Random rotation between -10 and 10 degrees, stable per word
  const rotation = React.useMemo(() => {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = word.charCodeAt(i) + ((hash << 5) - hash);
    }
    return (hash % 21) - 10;
  }, [word]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wordRef.current) return;
    const rect = wordRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    setWordWidth(rect.width);
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
    // Store relative position for scale calculation
    wordRef.current.dataset.relativeX = String(relativeX);
  };

  // Calculate scale based on cursor position (1.0 at left, 0.5 at right)
  const getScale = () => {
    if (!wordRef.current || wordWidth <= 0) return 1;
    const relativeX = parseFloat(wordRef.current.dataset.relativeX || "0");
    const progressX = relativeX / wordWidth;
    const rawScale = 1 - (progressX * 0.5);
    return Math.max(0.5, Math.min(1, rawScale));
  };

  const scale = getScale();

  // Floating image rendered via portal to escape overflow containers
  const floatingImage = mounted && isHovered ? createPortal(
    <div
      className="pointer-events-none fixed z-9999"
      style={{
        left: mousePosition.x,
        top: mousePosition.y - 20,
        opacity: 1,
      }}
    >
      <div
        className={cn(
          "block overflow-hidden rounded-xl",
          "shadow-2xl shadow-black/20 dark:shadow-black/40",
          "ring-2 ring-white/20 dark:ring-white/10"
        )}
        style={{
          transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
          width: `${scale * 100}px`,
          height: `${scale * 100}px`,
        }}
      >
        <Image
          src={image}
          alt={alt || word}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <span
      ref={wordRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* The hoverable word */}
      <span
        className={cn(
          "relative cursor-pointer transition-all duration-200",
          "border-b-2 border-dashed",
          isHovered ? "border-current" : "border-current/30"
        )}
        style={{
          color: isHovered ? accentColor : undefined,
        }}
      >
        {word}
      </span>

      {/* Floating image via portal */}
      {floatingImage}
    </span>
  );
}

export function HoverImageText({
  text,
  hoverWords,
  className,
  accentColor = "#8B5CF6",
}: HoverImageTextProps) {
  // Create a map for quick lookup
  const wordMap = React.useMemo(() => {
    const map = new Map<string, HoverWord>();
    hoverWords.forEach((hw) => {
      map.set(hw.word.toLowerCase(), hw);
    });
    return map;
  }, [hoverWords]);

  // Parse text and replace hover words with interactive components
  const renderText = () => {
    // Split by words while preserving punctuation and spaces
    const parts = text.split(/(\s+)/);

    return parts.map((part, index) => {
      // Check if this part is a space
      if (/^\s+$/.test(part)) {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }

      // Extract word without punctuation for matching
      const match = part.match(/^([^\w]*)(\w+)([^\w]*)$/);
      if (!match) {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }

      const [, prefix, word, suffix] = match;
      const hoverWord = wordMap.get(word.toLowerCase());

      if (hoverWord) {
        return (
          <React.Fragment key={index}>
            {prefix}
            <HoverImage
              word={word}
              image={hoverWord.image}
              alt={hoverWord.alt}
              accentColor={accentColor}
            />
            {suffix}
          </React.Fragment>
        );
      }

      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <p className={cn("text-muted-foreground leading-relaxed", className)}>
      {renderText()}
    </p>
  );
}
