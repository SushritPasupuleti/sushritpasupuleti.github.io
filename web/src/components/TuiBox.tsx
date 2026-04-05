import React from "react";
import type { Palette } from "../terminal-theme";
import { mono } from "../terminal-theme";

interface TuiBoxProps {
  c: Palette;
  /** Title shown in the top border */
  title?: string;
  /** Optional badge shown on the right of the title bar */
  badge?: string;
  badgeColor?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Box-drawing framed container:
 * ┌─── title ──────────────┐
 * │ content                 │
 * └─────────────────────────┘
 */
const TuiBox: React.FC<TuiBoxProps> = ({ c, title, badge, badgeColor, children, style }) => (
  <div
    style={{
      border: `1px solid ${c.border}`,
      borderRadius: "2px",
      marginBottom: "1rem",
      fontFamily: mono,
      ...style,
    }}
  >
    {title && (
      <div
        style={{
          borderBottom: `1px solid ${c.border}`,
          padding: "0.3rem 0.6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: c.titleBar,
          fontSize: "0.75rem",
        }}
      >
        <span>
          <span style={{ color: c.dim }}>┌─── </span>
          <span style={{ color: c.green, fontWeight: 600 }}>{title}</span>
        </span>
        {badge && (
          <span style={{
            color: badgeColor || c.cyan,
            fontSize: "0.7rem",
            padding: "0.05rem 0.4rem",
            background: `${(badgeColor || c.cyan)}15`,
          }}>
            {badge}
          </span>
        )}
      </div>
    )}
    <div style={{ padding: "0.75rem" }}>
      {children}
    </div>
  </div>
);

export default TuiBox;
