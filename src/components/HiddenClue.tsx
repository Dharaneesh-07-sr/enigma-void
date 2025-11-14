import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

interface HiddenClueProps {
  clue: string;
  className?: string;
}

export const HiddenClue = ({ clue, className }: HiddenClueProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      className={cn(
        "relative cursor-pointer group",
        className
      )}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
        <span
          className={cn(
            "text-sm transition-all duration-500",
            isRevealed ? "text-primary opacity-100" : "text-transparent opacity-0"
          )}
          style={{
            textShadow: isRevealed ? "0 0 10px hsl(var(--primary))" : "none",
          }}
        >
          {clue}
        </span>
      </div>
    </div>
  );
};
