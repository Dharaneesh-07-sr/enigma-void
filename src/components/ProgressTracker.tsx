import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
  total: number;
  completed: number;
  className?: string;
}

export const ProgressTracker = ({ total, completed, className }: ProgressTrackerProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground mr-2">PROGRESS:</span>
      {Array.from({ length: total }).map((_, index) => (
        <div key={index}>
          {index < completed ? (
            <CheckCircle className="w-5 h-5 text-primary neon-glow" />
          ) : (
            <Circle className="w-5 h-5 text-muted" />
          )}
        </div>
      ))}
      <span className="text-sm text-primary ml-2">
        {completed}/{total}
      </span>
    </div>
  );
};
