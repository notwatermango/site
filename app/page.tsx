"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// --- UTILS ---
function levenshtein(a: string, b: string) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

import { TERMINAL_TARGETS } from "./config";

const MAX_TYPO_TOLERANCE = 2;

// --- COMPONENTS ---
const TerminalLine = ({ children }: { children: React.ReactNode }) => (
  <>
    <span className="text-accent font-bold mr-2">{">"}</span>
    {children}
    <br />
  </>
);

export default function Home() {
  const [input, setInput] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 1. Focus immediately on component mount
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }

    // 2. Focus again after a tiny delay to override tricky React hydration quirks
    const focusTimer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        setIsFocused(true);
      }
    }, 500);

    return () => clearTimeout(focusTimer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const lowerInput = input.toLowerCase().trim();
    let hasMatched = false;
    let isExternal = false;

    for (const target of TERMINAL_TARGETS) {
      if (lowerInput === target.word || levenshtein(lowerInput, target.word) <= MAX_TYPO_TOLERANCE) {
        if (target.isExternal) {
          isExternal = true;
          window.open(target.path, "_blank", "noopener,noreferrer");
        } else {
          router.push(target.path);
        }
        hasMatched = true;
        break;
      }
    }

    if (!hasMatched || isExternal) {
      // Invalid command, erase terminal text and reset cursor
      setInput("");
      setCursorPos(0);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
          setIsFocused(true);
        }
      }}
    >
      <div className="mb-16">
        <h1 className="text-6xl md:text-8xl font-heading nixie-glow tracking-widest leading-none">1.048596</h1>
        <p className="font-heading text-xl mt-4 opacity-70 tracking-widest">CURRENT DIVERGENCE</p>
      </div>

      <div className="max-w-2xl w-full text-left border border-primary/30 p-8 bg-background/80 relative shadow-[0_0_15px_rgba(255,176,0,0.1)] cursor-text">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/50" />
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />

        <p className="text-lg md:text-xl leading-relaxed font-mono pointer-events-none">
          <TerminalLine>Welcome to the lab of notwatermango.</TerminalLine>
          <TerminalLine>Software Engineer.</TerminalLine>
          <TerminalLine>Currently operating out of Bandung, Indonesia.</TerminalLine>
          <TerminalLine>The Organization knows me as Danzel Artamadja.</TerminalLine>

          {/* Interactive User Input Line (Hidden on Mobile) */}
          <span className="hidden md:inline">
            <span className="text-accent font-bold mr-2 mt-4">{">"}</span>
            <span className="relative whitespace-pre">
              <span>{input.slice(0, cursorPos)}</span>
              <span
                className={`animate-pulse inline-block border min-w-[0.6em] leading-none text-center transition-colors ${
                  isFocused
                    ? "bg-primary border-primary text-background shadow-[0_0_8px_rgba(255,176,0,0.8)]"
                    : "border-primary/50 bg-transparent text-primary"
                }`}
              >
                {cursorPos < input.length ? input.charAt(cursorPos) : "\u00A0"}
              </span>
              <span>{input.slice(cursorPos + 1)}</span>
              {!input.length && (
                <span className="text-primary/0">{' Type your command here "about", "github", etc.'}</span>
              )}
            </span>
          </span>
        </p>

        {/* Hidden Input field to capture keystrokes */}
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setCursorPos(e.target.selectionStart || 0);
          }}
          onSelect={(e) => setCursorPos(e.currentTarget.selectionStart || 0)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={inputRef}
          className="hidden md:block absolute inset-0 opacity-0 z-10 w-full h-full cursor-text bg-transparent text-transparent focus:outline-none"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
