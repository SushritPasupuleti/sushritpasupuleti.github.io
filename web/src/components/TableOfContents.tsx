import React, { useState } from "react";
import { useTerminalTheme, mono } from "../terminal-theme";
import { TocEntry, defaultEntries, padIndex } from "./toc-data";

interface Props {
  entries?: TocEntry[];
}

const TableOfContents: React.FC<Props> = ({ entries = defaultEntries }) => {
  const { c } = useTerminalTheme();
  const [open, setOpen] = useState(true);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div style={{
      border: `1px solid ${c.border}`,
      borderRadius: "4px",
      marginBottom: "0.5rem",
    }}>
      {/* Header bar */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          background: c.titleBar,
          padding: "0.5rem 0.75rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: open ? "4px 4px 0 0" : "4px",
          userSelect: "none",
        }}
      >
        <span style={{ color: c.green, fontFamily: mono, fontSize: "0.85rem", fontWeight: 600 }}>
          <span style={{ color: c.dim, fontSize: "0.8em" }}>$ </span>
          cat .toc
        </span>
        <span style={{ color: c.dim, fontFamily: mono, fontSize: "0.8rem" }}>
          {open ? "[-]" : "[+]"}
        </span>
      </div>

      {/* Entries */}
      {open && (
        <div style={{ padding: "0.5rem 0" }}>
          {entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => scrollTo(entry.id)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") scrollTo(entry.id); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.75rem",
                cursor: "pointer",
                fontFamily: mono,
                fontSize: "0.8rem",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = c.hoverBg ?? c.titleBar;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              <span style={{ color: c.dim, minWidth: "1.6rem" }}>
                {padIndex(entry.index)}
              </span>
              <span style={{ color: c.muted }}>→</span>
              <span style={{ color: c.cyan }}>
                #{entry.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableOfContents;
