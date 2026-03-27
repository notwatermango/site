import { useCallback, useState } from "react";

export function useWorldlineShift() {
  const [divergence, setDivergence] = useState("1.130426");
  const [isShifting, setIsShifting] = useState(false);
  const [isSettling, setIsSettling] = useState(false);

  const triggerShift = useCallback(
    (targetValue: string) => {
      // Allow re-triggering
      setIsShifting(true);
      setIsSettling(false);

      // Reset shift state if called again
      let phase1Frames = 0;
      const glitchPhase = () => {
        if (phase1Frames++ < 12) {
          const chaos = (Math.random() * 2).toFixed(6);
          setDivergence(chaos);
          // Variable delay
          setTimeout(glitchPhase, 30 + Math.random() * 80);
        } else {
          scramblePhase();
        }
      };

      // Rapid scramble converging toward target
      const scramblePhase = () => {
        let count = 0;
        const total = 35;
        const interval = setInterval(() => {
          const t = count / total;
          setDivergence(blendDivergence(targetValue, t));

          if (++count >= total) {
            clearInterval(interval);
            settlePhase();
          }
        }, 40);
      };

      // Settle into target value
      const settlePhase = () => {
        setIsSettling(true);
        setDivergence(targetValue);
        // Brief "after-shock" flicker of the last digit
        setTimeout(() => {
          setDivergence((prev) => prev.slice(0, 7) + String(Math.floor(Math.random() * 10)));
          setTimeout(() => {
            setDivergence(targetValue);
            setTimeout(() => setIsShifting(false), 800);
          }, 120);
        }, 300);
      };

      glitchPhase(); // Kick it off
    },
    [isShifting],
  );

  return { divergence, isShifting, isSettling, triggerShift };
}

// Helper: blend target value with noise based on progress t (0→1)
function blendDivergence(target: string, t: number): string {
  return target
    .split("")
    .map((ch, i) => {
      if (ch === ".") return ch;
      // Progressive lock: Left digits lock earlier than right digits.
      // t * 1.5 reaches 1.0 earlier for smaller i.
      const lockThreshold = t * 1.5 - i * 0.12;
      return Math.random() < lockThreshold ? ch : String(Math.floor(Math.random() * 10));
    })
    .join("");
}
