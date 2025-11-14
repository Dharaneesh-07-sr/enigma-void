import { useState, useEffect } from "react";
import { GlitchText, ScrambledText } from "@/components/GlitchText";
import { CipherPuzzle } from "@/components/CipherPuzzle";
import { HiddenClue } from "@/components/HiddenClue";
import { LockedSection } from "@/components/LockedSection";
import { ProgressTracker } from "@/components/ProgressTracker";
import { Terminal } from "lucide-react";

const Index = () => {
  const [progress, setProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [introText, setIntroText] = useState("");
  const fullIntro = "WELCOME TO THE VOID... CAN YOU ESCAPE?";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullIntro.length) {
        setIntroText(fullIntro.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowIntro(false), 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const caesarCipher = (text: string, shift: number) => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join("");
  };

  const handlePuzzleSolved = (level: number) => {
    setProgress(level);
  };

  if (showIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Terminal className="w-16 h-16 mx-auto mb-8 text-primary neon-glow animate-pulse" />
          <h1 className="text-4xl font-bold text-primary neon-glow text-glitch">
            {introText}
            <span className="animate-pulse">_</span>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 py-8">
          <GlitchText
            text="THE CIPHER CHALLENGE"
            className="text-4xl font-bold text-primary neon-glow block mb-2"
          />
          <p className="text-muted-foreground">
            <ScrambledText
              text="Decode the secrets hidden in the void"
              scrambled="D#c@d3 th3 $3cr3t$ h!dd3n 1n th3 v0!d"
              isRevealed={true}
            />
          </p>
          <ProgressTracker total={3} completed={progress} className="justify-center" />
        </header>

        {/* Level 1: Caesar Cipher */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-primary">LEVEL 01: BASIC ENCRYPTION</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The message below has been encrypted using a Caesar cipher with a shift of 13 (ROT13).
            </p>
            <HiddenClue clue="[HINT: Try shifting each letter 13 positions forward in the alphabet]" />
            <CipherPuzzle
              encryptedText="GUVF VF GUR CNFFJBEQ"
              solution="THIS IS THE PASSWORD"
              onSolved={() => handlePuzzleSolved(1)}
              hint="ROT13 means A becomes N, B becomes O, etc."
            />
          </div>
        </section>

        {/* Level 2: Hidden Message */}
        <LockedSection isUnlocked={progress >= 1} title="LEVEL 02: HIDDEN TRANSMISSION">
          {progress >= 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Find the hidden coordinates within this encrypted message.
              </p>
              <div className="space-y-2">
                <HiddenClue clue="[CLUE 1: First coordinate - 42]" />
                <HiddenClue clue="[CLUE 2: Second coordinate - 13]" />
                <HiddenClue clue="[CLUE 3: Third coordinate - 37]" />
              </div>
              <CipherPuzzle
                encryptedText="UBZR ONFR PBBEQVANGRF"
                solution="42 13 37"
                onSolved={() => handlePuzzleSolved(2)}
                hint="Combine all three coordinates separated by spaces"
              />
            </div>
          )}
        </LockedSection>

        {/* Level 3: Final Challenge */}
        <LockedSection isUnlocked={progress >= 2} title="LEVEL 03: FINAL DECRYPTION">
          {progress >= 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The final message awaits. Use everything you've learned.
              </p>
              <div className="p-4 bg-muted/30 rounded border border-primary/20">
                <p className="text-primary font-mono">
                  01000110 01010010 01000101 01000101 01000100 01001111 01001101
                </p>
              </div>
              <HiddenClue clue="[HINT: This is binary code - convert to ASCII]" />
              <CipherPuzzle
                encryptedText="BINARY TO TEXT"
                solution="FREEDOM"
                onSolved={() => handlePuzzleSolved(3)}
                hint="Use a binary to ASCII converter"
              />
            </div>
          )}
        </LockedSection>

        {/* Victory Screen */}
        {progress >= 3 && (
          <div className="text-center space-y-4 p-8 border-2 border-primary rounded-lg bg-card">
            <GlitchText
              text="★ CONGRATULATIONS ★"
              className="text-3xl font-bold text-primary neon-glow block"
            />
            <p className="text-lg text-foreground">
              You have successfully escaped the void.
            </p>
            <p className="text-sm text-muted-foreground">
              The truth was hidden in plain sight all along...
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground py-8">
          <p className="text-flicker">
            [SYSTEM STATUS: OPERATIONAL] | [UPTIME: ∞] | [ANOMALIES DETECTED: {progress}]
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
