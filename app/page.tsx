"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
import { useWorldlineShift } from "@/hooks/useWorldlineShift";

const MAX_TYPO_TOLERANCE = 2;

// --- COMPONENTS ---
const TerminalLine = ({ children }: { children: React.ReactNode }) => (
  <>
    <span className="text-accent font-bold mr-2">{">"}</span>
    {children}
    <br />
  </>
);

type HistoryEntry = {
  command: string;
  output: React.ReactNode;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [hasSecretCommand, setHasSecretCommand] = useState(false);
  const [hasValidTerminalCommand, setHasValidTerminalCommand] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const { divergence, isShifting, isSettling, triggerShift } = useWorldlineShift();

  useEffect(() => {
    if (isSettling) {
      setHistory([]);
    }
  }, [isSettling]);

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

  useEffect(() => {
    if (hasSecretCommand) {
      triggerShift("1.048596"); // Canonical Steins;Gate worldline
      setHasSecretCommand(false); // Reset so it can be triggered again
    }
  }, [hasSecretCommand, triggerShift]);

  useEffect(() => {
    const el = terminalContainerRef.current;
    if (!el) return;

    const adjustHeightAndScroll = () => {
      // 1. Measure the exact pixel height of one line based on our font rules
      const span = document.createElement("span");
      span.innerText = "A";
      el.appendChild(span);
      const lineHeight = span.getBoundingClientRect().height;
      el.removeChild(span);

      // 2. Clamp max height to the nearest multiple of the line height
      const targetMaxH = window.innerHeight * 0.5; // ~50vh
      const linesQty = Math.floor(targetMaxH / lineHeight);
      el.style.maxHeight = `${linesQty * lineHeight}px`;

      // 3. Scroll to the perfect bottom
      el.scrollTop = el.scrollHeight;
    };

    adjustHeightAndScroll();
    window.addEventListener("resize", adjustHeightAndScroll);
    return () => window.removeEventListener("resize", adjustHeightAndScroll);
  }, [history, input]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hintRef.current) {
        const rect = hintRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        hintRef.current.style.setProperty("--x", `${x}px`);
        hintRef.current.style.setProperty("--y", `${y}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const lowerInput = input.trim();
    if (!lowerInput) return;

    let isLink = false;
    let isExternal = false;
    let matchedPath = "";

    const firstWord = lowerInput.toLowerCase().split(" ")[0];

    for (const target of TERMINAL_TARGETS) {
      if (firstWord === target.word || levenshtein(firstWord, target.word) <= MAX_TYPO_TOLERANCE) {
        matchedPath = target.path;
        isExternal = target.isExternal;
        isLink = true;
        break;
      }
    }

    let outputResult: React.ReactNode = null;

    if (isLink) {
      setHasValidTerminalCommand(true);
      if (isExternal) {
        window.open(matchedPath, "_blank", "noopener,noreferrer");
        outputResult = <div className="ml-4 opacity-80">Opening {matchedPath} ...</div>;
      } else {
        router.push(matchedPath);
        outputResult = <div className="ml-4 opacity-80">Redirecting to {matchedPath} ...</div>;
      }
    } else {
      const args = lowerInput.split(" ");
      const cmd = args[0].toLowerCase();

      if (cmd === "clear") {
        setHistory([]);
        setInput("");
        setCursorPos(0);
        return;
      } else if (cmd === "help") {
        outputResult = (
          <div className="ml-4 opacity-80">
            <div className="text-secondary">[ DIVERGENCE METER — COMMAND INDEX ]</div>
            <br />
            Navigational coordinates:
            <br />- <span className="text-secondary">about, projects, blog</span>
            <br />
            <br />
            D-Mail channels:
            <br />- <span className="text-secondary">github, linkedin, instagram, email</span>
            <br />
            <br />
            <span className="opacity-60">Standard unix operations are also recognized by the Amadeus system.</span>
          </div>
        );
        setHasValidTerminalCommand(true);
      } else if (cmd === "ls") {
        outputResult = (
          <div className="ml-4 opacity-80 text-secondary">
            README.md&nbsp;&nbsp;&nbsp;config.json&nbsp;&nbsp;&nbsp;secret.txt
          </div>
        );
        setHasValidTerminalCommand(true);
      } else if (cmd === "cat") {
        const file = args[1];
        if (!file) {
          outputResult = <div className="ml-4 opacity-80 text-red-500">Usage: cat [file]</div>;
        } else if (file === "README.md") {
          outputResult = <div className="ml-4 opacity-80">Lab notes and personal archives.</div>;
        } else if (file === "config.json") {
          outputResult = (
            <div className="ml-4 opacity-80 break-all">
              {`{ "divergence": "${divergence}", "worldline": "${hasSecretCommand ? "steins;gate" : "beta"}", "mission": "find steins;gate" }`}
            </div>
          );
        } else if (file === "secret.txt") {
          outputResult = (
            <div className="ml-4 opacity-80">
              There's a secret command waiting. Some mistaken the letter K with the letter C. You might know it if you
              look closely at the worldline...
            </div>
          );
        } else {
          outputResult = <div className="ml-4 opacity-80 text-red-500">cat: {file}: No such file or directory</div>;
        }
        setHasValidTerminalCommand(true);
      } else if (
        lowerInput.toLowerCase() === "el psy kongroo" ||
        lowerInput.toLowerCase() === "el psy congroo" ||
        (cmd == "echo" && args.slice(1).join(" ").toLowerCase() === "el psy kongroo")
      ) {
        outputResult = (
          <div className="ml-4 opacity-80 text-green-500 animate-pulse">
            Connection established. Welcome to Steins;Gate.
          </div>
        );
        setHasSecretCommand(true);
        setHasValidTerminalCommand(true);
      } else if (cmd === "echo") {
        outputResult = <div className="ml-4 opacity-80">{args.slice(1).join(" ")}</div>;
        setHasValidTerminalCommand(true);
      } else if (cmd === "cd") {
        outputResult = <div className="ml-4 opacity-80 text-red-500 glitch-2">You can't change the worldline.</div>;
        setHasValidTerminalCommand(true);
      } else if (cmd === "mkdir") {
        outputResult = <div className="ml-4 opacity-80 text-red-500 glitch-2">You can't create a new worldline.</div>;
        setHasValidTerminalCommand(true);
      } else if (cmd === "rm") {
        outputResult = <div className="ml-4 opacity-80 text-red-500 glitch-2">You can't delete the worldline.</div>;
        setHasValidTerminalCommand(true);
      } else {
        outputResult = (
          <div className="ml-4 opacity-80 text-red-500">
            Command not found: {cmd}. Type 'help' for available commands.
          </div>
        );
      }
    }

    setHistory((prev) => [...prev, { command: input, output: outputResult }]);
    setInput("");
    setCursorPos(0);
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
      <div className={`worldline-crt ${isShifting && !isSettling ? "active" : ""}`} />
      <div className={`worldline-flash ${isShifting && !isSettling ? "active" : ""}`} />

      <div className="mb-16">
        <h1
          className={`text-6xl md:text-8xl font-heading nixie-glow glitch tracking-widest leading-none ${isShifting ? (isSettling ? "settling" : "active") : ""}`}
        >
          {divergence}
        </h1>
        <p
          className={`font-heading text-xl mt-4 opacity-70 tracking-widest ${isShifting ? (isSettling ? "settling" : "active") : ""}`}
        >
          CURRENT DIVERGENCE
        </p>
      </div>

      <div className="max-w-2xl w-full text-left border border-primary/30 p-8 bg-background/80 relative shadow-[0_0_15px_rgba(255,176,0,0.1)] cursor-text">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/50" />
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />

        <div
          ref={terminalContainerRef}
          className="text-lg md:text-xl leading-relaxed font-mono pointer-events-none overflow-y-scroll scrollbar-none"
        >
          <TerminalLine>Welcome to the lab of notwatermango.</TerminalLine>
          <TerminalLine>Software Engineer.</TerminalLine>
          <TerminalLine>Currently operating out of Bandung, Indonesia.</TerminalLine>
          <TerminalLine>The Organization knows me as Danzel Artamadja.</TerminalLine>

          {/* History */}
          {history.map((entry, idx) => (
            <div key={idx} className="animate-in fade-in duration-300">
              <span className="text-accent font-bold mr-2">{">"}</span>
              <span className="">{entry.command}</span>
              <br />
              {entry.output}
            </div>
          ))}

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
        </div>

        {/* Hidden Input field to capture keystrokes */}
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setCursorPos(e.target.selectionStart || 0);
          }}
          onKeyUp={(e) => setCursorPos(e.currentTarget.selectionStart || 0)}
          onClick={(e) => setCursorPos(e.currentTarget.selectionStart || 0)}
          onKeyDown={handleTerminalKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={inputRef}
          className="hidden md:block absolute inset-0 opacity-0 z-10 w-full h-full cursor-text bg-transparent text-transparent focus:outline-none"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      <div
        ref={hintRef}
        className={`relative mt-2 top-10 text-primary/70 font-mono text-sm tracking-widest hidden md:block cursor-default select-none pointer-events-none`}
        style={{
          WebkitMaskImage:
            "radial-gradient(circle 120px at var(--x, -1000px) var(--y, -1000px), black 0%, transparent 100%)",
          maskImage: "radial-gradient(circle 120px at var(--x, -1000px) var(--y, -1000px), black 0%, transparent 100%)",
        }}
      >
        {!hasValidTerminalCommand && <p className="opacity-70">Try typing commands in the terminal!</p>}
        {hasValidTerminalCommand && !hasSecretCommand && <p className="opacity-70">Find out the secret command!</p>}
        {hasSecretCommand && <p className="opacity-70">Congratulations!</p>}
      </div>
    </div>
  );
}
