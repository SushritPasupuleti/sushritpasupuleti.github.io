import React, { useState, useEffect } from "react";
import type { Palette } from "../terminal-theme";

interface StatusBadge {
  label: string;
  color: "green" | "cyan";
}

interface TmuxPaneProps {
  c: Palette;
  isDark: boolean;
  /** Primary label in the status bar */
  title: string;
  /** Optional secondary label after the pipe separator */
  subtitle?: string;
  /** Pane number shown in the green badge */
  paneNumber?: string;
  /** Whether panel starts expanded */
  defaultOpen?: boolean;
  /** Controlled open state — overrides internal state when provided */
  forceOpen?: boolean;
  /** Status badges shown on the right side of the status bar */
  badges?: StatusBadge[];
  children: React.ReactNode;
}

const TmuxPane: React.FC<TmuxPaneProps> = ({
  c,
  isDark,
  title,
  subtitle,
  paneNumber = "1",
  defaultOpen = true,
  forceOpen,
  badges,
  children,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  // Allow parent to force-open the pane
  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          border: `1px solid ${open ? c.green : c.border}`,
          borderRadius: "2px",
          overflow: "hidden",
          transition: "border-color 0.2s",
        }}
      >
        {/* tmux status bar */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            background: c.titleBar,
            border: "none",
            borderBottom: open ? `1px solid ${c.green}` : "none",
            cursor: "pointer",
            padding: "0.3rem 0.6rem",
            display: "flex",
            alignItems: "center",
            fontSize: "0.75rem",
            fontFamily: "'JetBrains Mono', monospace",
            color: c.muted,
            transition: "all 0.15s",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = c.textBright;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = c.muted;
          }}
        >
          {/* Pane indicator badge */}
          <span
            style={{
              background: c.green,
              color: isDark ? "#0a0a0a" : "#ffffff",
              padding: "0.05rem 0.4rem",
              fontWeight: 700,
              fontSize: "0.7rem",
              marginRight: "0.5rem",
            }}
          >
            {open ? paneNumber : "─"}
          </span>

          {/* Title */}
          <span style={{ color: c.green, marginRight: "0.35rem" }}>{title}</span>

          {/* Optional subtitle */}
          {subtitle && (
            <>
              <span style={{ color: c.dim }}>│</span>
              <span style={{ color: c.cyan, marginLeft: "0.35rem", marginRight: "0.35rem" }}>{subtitle}</span>
            </>
          )}

          {/* Spacer */}
          <span style={{ flex: 1 }} />

          {/* Status badges */}
          {badges?.map((badge, i) => (
            <span
              key={i}
              style={{
                background:
                  badge.color === "green"
                    ? isDark ? "rgba(0,255,65,0.15)" : "rgba(26,122,46,0.12)"
                    : isDark ? "rgba(0,191,255,0.15)" : "rgba(0,85,160,0.12)",
                color: badge.color === "green" ? c.green : c.cyan,
                padding: "0.05rem 0.4rem",
                fontSize: "0.65rem",
                fontWeight: 600,
                marginRight: "0.5rem",
              }}
            >
              {badge.label}
            </span>
          ))}

          {/* Toggle indicator */}
          <span style={{ color: c.dim, fontSize: "0.7rem" }}>
            {open ? "[-]" : "[+]"}
          </span>
        </button>

        {/* Pane content */}
        {open && (
          <div
            style={{
              background: c.surface,
              padding: "0.75rem",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default TmuxPane;
