import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GlitchText } from "./GlitchText";
import { toast } from "sonner";

interface CipherPuzzleProps {
  encryptedText: string;
  solution: string;
  onSolved: () => void;
  hint?: string;
}

export const CipherPuzzle = ({ encryptedText, solution, onSolved, hint }: CipherPuzzleProps) => {
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedInput = input.toLowerCase().trim();
    const normalizedSolution = solution.toLowerCase().trim();

    if (normalizedInput === normalizedSolution) {
      toast.success("✓ Access Granted", {
        description: "Puzzle solved. Proceeding to next level...",
      });
      onSolved();
    } else {
      setAttempts(attempts + 1);
      toast.error("✗ Access Denied", {
        description: `Invalid input. Attempts: ${attempts + 1}`,
      });
      setInput("");
    }
  };

  return (
    <Card className="p-6 bg-card border-primary/30">
      <div className="space-y-4">
        <div className="text-center">
          <GlitchText 
            text="[ENCRYPTED MESSAGE]" 
            className="text-sm text-muted-foreground mb-2 block"
            glitchEffect="flicker"
          />
          <p className="text-xl font-bold text-primary neon-glow tracking-wider">
            {encryptedText}
          </p>
        </div>

        {hint && attempts > 2 && (
          <div className="text-xs text-muted-foreground border border-border p-3 rounded">
            <span className="text-accent">[HINT]</span> {hint}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter decrypted message..."
            className="font-mono bg-input border-primary/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
          />
          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
          >
            SUBMIT
          </Button>
        </form>

        <div className="text-xs text-muted-foreground text-center">
          Attempts: {attempts}
        </div>
      </div>
    </Card>
  );
};
