import React, { useState, useEffect, useCallback } from "react";
import { useTerminalTheme, mono } from "../terminal-theme";
import { TocEntry, defaultEntries, padIndex } from "./toc-data";

const MOBILE_BP = 640;

const FloatingTocNav: React.FC = () => {
  const { c } = useTerminalTheme();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BP);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open, isMobile]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }, []);

  const entryRow = (entry: TocEntry) => (
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
        padding: "0.45rem 0.75rem",
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
      <span style={{ color: c.dim, minWidth: "1.6rem" }}>{padIndex(entry.index)}</span>
      <span style={{ color: c.muted }}>→</span>
      <span style={{ color: c.cyan }}>#{entry.label}</span>
    </div>
  );

  // ---------- Popup (desktop) ----------
  const popup = (
    <div
      style={{
        position: "fixed",
        bottom: "5.5rem",
        right: "1.5rem",
        width: "260px",
        background: c.surface,
        border: `1px solid ${c.border}`,
        borderRadius: "6px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
        zIndex: 1001,
        overflow: "hidden",
      }}
    >
      <div style={{
        background: c.titleBar,
        padding: "0.5rem 0.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ color: c.green, fontFamily: mono, fontSize: "0.8rem", fontWeight: 600 }}>
          <span style={{ color: c.dim, fontSize: "0.8em" }}>$ </span>cat .toc
        </span>
        <span
          onClick={() => setOpen(false)}
          style={{ color: c.dim, fontFamily: mono, fontSize: "0.8rem", cursor: "pointer" }}
        >
          [x]
        </span>
      </div>
      <div style={{ padding: "0.35rem 0", maxHeight: "50vh", overflowY: "auto" }}>
        {defaultEntries.map(entryRow)}
      </div>
    </div>
  );

  // ---------- Drawer (mobile) ----------
  const backdrop = (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 1000,
      }}
    />
  );

  const drawer = (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: c.surface,
        border: `1px solid ${c.border}`,
        borderRadius: "12px 12px 0 0",
        zIndex: 1001,
        maxHeight: "65vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.45)",
      }}
    >
      {/* Drag handle */}
      <div style={{ display: "flex", justifyContent: "center", padding: "0.5rem 0 0.25rem" }}>
        <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: c.border }} />
      </div>
      {/* Header */}
      <div style={{
        padding: "0.35rem 0.75rem 0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${c.border}`,
      }}>
        <span style={{ color: c.green, fontFamily: mono, fontSize: "0.85rem", fontWeight: 600 }}>
          <span style={{ color: c.dim, fontSize: "0.8em" }}>$ </span>cat .toc
        </span>
        <span
          onClick={() => setOpen(false)}
          style={{ color: c.dim, fontFamily: mono, fontSize: "0.85rem", cursor: "pointer", padding: "0.25rem" }}
        >
          [x]
        </span>
      </div>
      {/* Entries */}
      <div style={{ overflowY: "auto", padding: "0.35rem 0", flex: 1 }}>
        {defaultEntries.map(entryRow)}
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop (mobile only) */}
      {open && isMobile && backdrop}

      {/* Popup or Drawer */}
      {open && (isMobile ? drawer : popup)}

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Quick navigation"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 1002,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: `1px solid ${c.green}`,
          background: c.surface,
          color: c.green,
          fontFamily: mono,
          fontSize: "1.1rem",
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 14px rgba(0,0,0,0.4), 0 0 0 1px ${c.border}`,
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {open ? "×" : "≡"}
      </button>

      {/* Click-away for desktop popup */}
      {open && !isMobile && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 1000 }}
        />
      )}
    </>
  );
};

export default FloatingTocNav;
