import React from "react";
import { mono } from "../terminal-theme";

interface TuiBlockquoteProps {
  children: React.ReactNode;
  color?: string;
  borderColor?: string;
  dimColor?: string;
  style?: React.CSSProperties;
}

const TuiBlockquote: React.FC<TuiBlockquoteProps> = ({
  children,
  color = "#b0b0b0",
  borderColor = "#00ff41",
  dimColor = "#555",
  style,
}) => (
  <div
    style={{
      display: "flex",
      gap: "0.5rem",
      margin: "1rem 0",
      fontFamily: mono,
      fontSize: "0.85rem",
      lineHeight: 1.8,
      ...style,
    }}
  >
    {/* Left pipe rail */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        color: borderColor,
        userSelect: "none",
        fontSize: "0.75rem",
        lineHeight: "1.4",
      }}
    >
      <span>{"/*"}</span>
      <div
        style={{
          width: "1px",
          flex: 1,
          background: borderColor,
          opacity: 0.5,
        }}
      />
      <span>{"*/"}</span>
    </div>

    {/* Content */}
    <div style={{ color, flex: 1, minWidth: 0 }}>
      {children}
    </div>
  </div>
);

export default TuiBlockquote;
