import React, { useEffect, useState, useRef, useCallback } from "react";
import { mono } from "../terminal-theme";

/** Only the palette keys TerminalBoot actually uses */
interface BootPalette {
  bg: string;
  surface: string;
  titleBar: string;
  border: string;
  green: string;
  cyan: string;
  text: string;
  textBright: string;
  muted: string;
}

export interface BootLine {
  /** The prompt prefix, e.g. "guest@sushrit:~ $" */
  prompt?: string;
  /** The command text that gets "typed" out */
  command: string;
  /** Optional output lines shown instantly after typing finishes */
  output?: string[];
  /** Delay in ms before typing starts (default: 60) */
  delay?: number;
  /** Typing speed in ms per character (default: 12) */
  speed?: number;
}

interface TerminalBootProps {
  lines: BootLine[];
  c: BootPalette;
  /** Called when the animation completes */
  onDone: () => void;
  /** Total max duration before auto-completing (safety net) */
  maxDuration?: number;
}

const TerminalBoot: React.FC<TerminalBootProps> = ({
  lines,
  c,
  onDone,
  maxDuration = 5000,
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [completedLines, setCompletedLines] = useState<number[]>([]);
  const [fading, setFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const skippedRef = useRef(false);
  // Keep a ref to onDone so the safety net timer is never affected by
  // reference changes to the callback (e.g. parent re-renders).
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; });

  const skip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    setFading(true);
    setTimeout(onDone, 200);
  }, [onDone]);

  // Safety net: auto-complete after maxDuration
  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => onDoneRef.current(), 300);
    }, maxDuration);
    return () => clearTimeout(timer);
  }, [maxDuration]); // intentionally excludes onDone — ref keeps it current

  // Type out the current line
  useEffect(() => {
    if (currentLine >= lines.length) {
      // All lines done, fade out
      const timer = setTimeout(() => {
        setFading(true);
        setTimeout(onDone, 200);
      }, 200);
      return () => clearTimeout(timer);
    }

    const line = lines[currentLine];
    const cmd = line.command;
    const speed = line.speed ?? 12;
    const delay = line.delay ?? 60;

    if (charIndex === 0 && !completedLines.includes(currentLine)) {
      // Initial delay before typing
      const timer = setTimeout(() => {
        setCharIndex(1);
      }, delay);
      return () => clearTimeout(timer);
    }

    if (charIndex < cmd.length) {
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }

    // Command fully typed — show output then move on
    if (!showOutput && line.output && line.output.length > 0) {
      const timer = setTimeout(() => setShowOutput(true), 80);
      return () => clearTimeout(timer);
    }

    // Move to next line
    const timer = setTimeout(() => {
      setCompletedLines((prev) => [...prev, currentLine]);
      setCurrentLine((prev) => prev + 1);
      setCharIndex(0);
      setShowOutput(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentLine, charIndex, showOutput, lines, completedLines, onDone]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentLine, charIndex, showOutput]);

  const defaultPrompt = (
    <>
      <span style={{ color: c.green }}>guest@sushrit</span>
      <span style={{ color: c.muted }}>:</span>
      <span style={{ color: c.cyan }}>~</span>
      <span style={{ color: c.muted }}> $ </span>
    </>
  );

  return (
    <div
      onClick={skip}
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.3s ease-out",
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: c.bg,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "90%",
        }}
      >
        {/* Window bar */}
        <div
          style={{
            background: c.titleBar,
            border: `1px solid ${c.border}`,
            borderBottom: "none",
            borderRadius: "6px 6px 0 0",
            padding: "0.5rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
          <span style={{ marginLeft: "1rem", color: c.muted, fontSize: "0.75rem" }}>
            booting...
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={containerRef}
          style={{
            background: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: "0 0 6px 6px",
            padding: "1.5rem",
            fontFamily: mono,
            fontSize: "0.85rem",
            lineHeight: 1.6,
            maxHeight: "50vh",
            overflowY: "auto",
          }}
        >
          {lines.map((line, idx) => {
            if (idx > currentLine) return null;
            const isActive = idx === currentLine;
            const typed = isActive ? line.command.slice(0, charIndex) : line.command;
            const lineComplete = completedLines.includes(idx) || (!isActive && idx < currentLine);

            return (
              <div key={idx} style={{ marginBottom: "0.4rem" }}>
                <div>
                  {defaultPrompt}
                  <span style={{ color: c.textBright }}>{typed}</span>
                  {isActive && charIndex < line.command.length && (
                    <span className="terminal-cursor" style={{ color: c.text }} />
                  )}
                </div>
                {/* Output lines */}
                {(lineComplete || (isActive && showOutput)) && line.output?.map((out, oi) => (
                  <div key={oi} style={{ color: c.muted, paddingLeft: "0.5rem" }}>
                    {out}
                  </div>
                ))}
              </div>
            );
          })}
          {/* Final cursor after all lines are done */}
          {currentLine >= lines.length && !fading && (
            <div>
              {defaultPrompt}
              <span className="terminal-cursor" style={{ color: c.text }} />
            </div>
          )}
        </div>
      </div>
      {/* Skip hint */}
      <div
        style={{
          marginTop: "1.5rem",
          fontFamily: mono,
          fontSize: "0.8rem",
          color: c.muted,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); skip(); }}
          style={{
            background: "transparent",
            border: `1px solid ${c.border}`,
            borderRadius: "3px",
            color: c.muted,
            fontFamily: mono,
            fontSize: "0.8rem",
            padding: "0.35rem 1rem",
            cursor: "pointer",
            transition: "color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = c.green;
            (e.currentTarget as HTMLButtonElement).style.borderColor = c.green;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = c.muted;
            (e.currentTarget as HTMLButtonElement).style.borderColor = c.border;
          }}
        >
          skip &rarr;
        </button>
        <span style={{ fontSize: "0.7rem" }}>or click anywhere</span>
      </div>
    </div>
  );
};

export default TerminalBoot;
