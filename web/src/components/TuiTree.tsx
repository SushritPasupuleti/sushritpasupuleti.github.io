import React from "react";
import type { Palette } from "../terminal-theme";
import { mono } from "../terminal-theme";

interface TuiTreeProps {
  c: Palette;
  items: React.ReactNode[];
  /** Override the bullet style. Default uses tree chars ├── └── */
  style?: React.CSSProperties;
}

/**
 * Renders items as a tree list:
 * ├── item 1
 * ├── item 2
 * └── item 3
 */
const TuiTree: React.FC<TuiTreeProps> = ({ c, items, style }) => (
  <div style={{ fontFamily: mono, fontSize: "0.8rem", lineHeight: 1.8, ...style }}>
    {items.map((item, i) => {
      const isLast = i === items.length - 1;
      return (
        <div key={i} style={{ display: "flex", gap: "0.4rem" }}>
          <span style={{ color: c.dim, flexShrink: 0, userSelect: "none" }}>
            {isLast ? "└──" : "├──"}
          </span>
          <span style={{ color: c.text, flex: 1, minWidth: 0 }}>{item}</span>
        </div>
      );
    })}
  </div>
);

export default TuiTree;
