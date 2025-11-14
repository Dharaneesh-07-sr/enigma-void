import { ReactNode } from "react";
import { Lock, Unlock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LockedSectionProps {
  isUnlocked: boolean;
  title: string;
  children: ReactNode;
  className?: string;
}

export const LockedSection = ({ isUnlocked, title, children, className }: LockedSectionProps) => {
  return (
    <Card
      className={cn(
        "p-6 transition-all duration-500 border-2",
        isUnlocked 
          ? "bg-card border-primary/50 opacity-100" 
          : "bg-muted/20 border-muted/30 opacity-40 blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        {isUnlocked ? (
          <Unlock className="w-5 h-5 text-primary neon-glow" />
        ) : (
          <Lock className="w-5 h-5 text-muted-foreground" />
        )}
        <h2 className={cn(
          "text-xl font-bold",
          isUnlocked ? "text-primary neon-glow" : "text-muted-foreground"
        )}>
          {title}
        </h2>
      </div>

      {isUnlocked ? (
        <div className="space-y-4">
          {children}
        </div>
      ) : (
        <div className="text-muted-foreground">
          [LOCKED - SOLVE PREVIOUS PUZZLES TO ACCESS]
        </div>
      )}
    </Card>
  );
};
