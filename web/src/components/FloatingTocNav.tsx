import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MdArticle } from "react-icons/md";
import { Download } from "react-iconly";
import { BsWhatsapp } from "react-icons/bs";
import { useTerminalTheme, mono } from "../terminal-theme";
import { TocEntry, defaultEntries, padIndex } from "./toc-data";

const MOBILE_BP = 640;

const quickLinks = [
  { href: "/blogs", label: "blogs", icon: MdArticle, isExternal: false },
  { href: "/resume/resume.pdf", label: "resume", icon: null, isExternal: false },
  { href: "https://wa.me/919182362040", label: "whatsapp", icon: BsWhatsapp, isExternal: true },
];

const QuickLinks: React.FC<{ c: any }> = ({ c }) => (
  <div style={{
    display: "flex",
    gap: "0.4rem",
    flexWrap: "wrap",
    padding: "0.5rem 0.75rem",
    borderBottom: `1px dashed ${c.border}`,
  }}>
    {quickLinks.map((link) => {
      const style: React.CSSProperties = {
        color: c.muted,
        fontFamily: mono,
        fontSize: "0.75rem",
        textDecoration: "none",
        padding: "0.25rem 0.5rem",
        border: `1px solid ${c.border}`,
        borderRadius: "3px",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        transition: "color 0.15s, border-color 0.15s",
      };
      const onEnter = (e: React.MouseEvent) => {
        (e.currentTarget as HTMLElement).style.color = c.green;
        (e.currentTarget as HTMLElement).style.borderColor = c.green;
      };
      const onLeave = (e: React.MouseEvent) => {
        (e.currentTarget as HTMLElement).style.color = c.muted;
        (e.currentTarget as HTMLElement).style.borderColor = c.border;
      };
      const iconEl = link.icon
        ? <link.icon size={12} />
        : <Download set="bold" primaryColor="currentColor" size={12} />;

      if (link.isExternal) {
        return (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
            style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            {iconEl} {link.label}
          </a>
        );
      }
      return (
        <Link key={link.label} href={link.href}
          style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          {iconEl} {link.label}
        </Link>
      );
    })}
  </div>
);

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
        border: `1px solid ${c.green}`,
        borderRadius: "3px",
        boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 12px ${c.green}33`,
        zIndex: 1001,
        overflow: "hidden",
      }}
    >
      <div style={{
        background: c.green,
        padding: "0.5rem 0.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ color: c.surface, fontFamily: mono, fontSize: "0.8rem", fontWeight: 700 }}>
          <span style={{ opacity: 0.7, fontSize: "0.8em" }}>$ </span>cat .toc
        </span>
        <span
          onClick={() => setOpen(false)}
          style={{ color: c.surface, fontFamily: mono, fontSize: "0.8rem", cursor: "pointer", opacity: 0.8 }}
        >
          [x]
        </span>
      </div>
      <QuickLinks c={c} />
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
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(2px)",
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
        border: `1px solid ${c.green}`,
        borderTop: `2px solid ${c.green}`,
        borderRadius: "6px 6px 0 0",
        zIndex: 1001,
        maxHeight: "65vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: `0 -4px 32px rgba(0,0,0,0.6), 0 0 12px ${c.green}33`,
      }}
    >
      {/* Drag handle */}
      <div style={{ display: "flex", justifyContent: "center", padding: "0.5rem 0 0.25rem" }}>
        <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: c.green, opacity: 0.5 }} />
      </div>
      {/* Header */}
      <div style={{
        padding: "0.35rem 0.75rem 0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${c.green}`,
        background: c.green,
      }}>
        <span style={{ color: c.surface, fontFamily: mono, fontSize: "0.85rem", fontWeight: 700 }}>
          <span style={{ opacity: 0.7, fontSize: "0.8em" }}>$ </span>cat .toc
        </span>
        <span
          onClick={() => setOpen(false)}
          style={{ color: c.surface, fontFamily: mono, fontSize: "0.85rem", cursor: "pointer", padding: "0.25rem", opacity: 0.8 }}
        >
          [x]
        </span>
      </div>
      <QuickLinks c={c} />
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
          height: "auto",
          width: "auto",
          borderRadius: "3px",
          border: `1px solid ${c.green}`,
          background: c.surface,
          color: c.green,
          fontFamily: mono,
          fontSize: "0.75rem",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: 0,
          overflow: "hidden",
          boxShadow: `0 6px 20px rgba(0,0,0,0.5), 0 0 8px ${c.green}44`,
          transition: "border-color 0.15s, box-shadow 0.15s, transform 0.15s",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 24px rgba(0,0,0,0.5), 0 0 16px ${c.green}66`;
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 20px rgba(0,0,0,0.5), 0 0 8px ${c.green}44`;
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        <span style={{
          background: c.green,
          padding: "0.25rem 0.6rem",
          color: c.surface,
          fontSize: "0.65rem",
          fontWeight: 700,
          textAlign: "left",
          borderBottom: `1px solid ${c.green}`,
        }}>┌ toc</span>
        <span style={{
          padding: "0.4rem 0.65rem",
          color: c.green,
          letterSpacing: "0.05em",
          fontSize: "0.8rem",
          fontWeight: 700,
        }}>{open ? "[x] close" : <>[≡] nav <span className="fab-cursor">▎</span></>}</span>
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
