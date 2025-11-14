import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchEffect?: "glitch" | "flicker" | "none";
}

export const GlitchText = ({ text, className, glitchEffect = "glitch" }: GlitchTextProps) => {
  return (
    <span
      className={cn(
        glitchEffect === "glitch" && "text-glitch",
        glitchEffect === "flicker" && "text-flicker",
        className
      )}
    >
      {text}
    </span>
  );
};

interface ScrambledTextProps {
  text: string;
  scrambled: string;
  isRevealed: boolean;
  className?: string;
}

export const ScrambledText = ({ text, scrambled, isRevealed, className }: ScrambledTextProps) => {
  const [displayText, setDisplayText] = useState(scrambled);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isRevealed && !isAnimating) {
      setIsAnimating(true);
      let currentIndex = 0;
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      
      const interval = setInterval(() => {
        if (currentIndex >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
          setIsAnimating(false);
          return;
        }

        const newText = text
          .split("")
          .map((char, idx) => {
            if (idx < currentIndex) return char;
            if (idx === currentIndex) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        setDisplayText(newText);
        currentIndex++;
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isRevealed, text, isAnimating]);

  return (
    <span className={cn("transition-all duration-300", className)}>
      {displayText}
    </span>
  );
};
