import React from "react";
import type { Palette } from "../terminal-theme";
import { mono } from "../terminal-theme";

interface TuiSectionHeaderProps {
  c: Palette;
  /** The command to display, e.g. "cat skills.md" or "ls projects/" */
  command: string;
  /** Optional output line shown below the command */
  output?: string;
}

const TuiSectionHeader: React.FC<TuiSectionHeaderProps> = ({ c, command, output }) => (
  <div style={{ marginBottom: "0.75rem", fontFamily: mono, fontSize: "0.85rem" }}>
    <div>
      <span style={{ color: c.green }}>guest@sushrit</span>
      <span style={{ color: c.muted }}>:</span>
      <span style={{ color: c.cyan }}>~</span>
      <span style={{ color: c.muted }}> $ </span>
      <span style={{ color: c.textBright }}>{command}</span>
    </div>
    {output && (
      <div style={{ color: c.muted, fontSize: "0.8rem", marginTop: "0.25rem" }}>
        {output}
      </div>
    )}
  </div>
);

export default TuiSectionHeader;
