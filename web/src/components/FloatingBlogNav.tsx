import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiHome, FiList, FiArrowUp } from "react-icons/fi";
import { Download } from "react-iconly";
import { BsWhatsapp } from "react-icons/bs";
import { FaTwitter, FaLinkedin, FaWhatsapp, FaFacebook, FaReddit } from "react-icons/fa";
import { useTerminalTheme, mono } from "../terminal-theme";

const MOBILE_BP = 640;

interface FloatingBlogNavProps {
  url?: string;
  title?: string;
}

const socialLinks = [
  { name: "twitter", icon: FaTwitter, getUrl: (url: string, title?: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || "")}` },
  { name: "linkedin", icon: FaLinkedin, getUrl: (url: string, title?: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || "")}` },
  { name: "whatsapp", icon: FaWhatsapp, getUrl: (url: string, title?: string) => `https://wa.me/?text=${encodeURIComponent(title ? title + " " : "")}${encodeURIComponent(url)}` },
  { name: "facebook", icon: FaFacebook, getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { name: "reddit", icon: FaReddit, getUrl: (url: string, title?: string) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || "")}` },
];

const FloatingBlogNav: React.FC<FloatingBlogNavProps> = ({ url, title }) => {
  const { c } = useTerminalTheme();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BP);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open, isMobile]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  const navItems = [
    { label: "#home", icon: FiHome, href: "/", action: null },
    { label: "#blogs", icon: FiList, href: "/blogs", action: null },
    { label: "#scroll-to-top", icon: FiArrowUp, href: null, action: scrollToTop },
  ];

  const quickLinks = [
    { href: "/resume/resume.pdf", label: "resume", icon: null as any, isExternal: false },
    { href: "https://wa.me/919182362040", label: "whatsapp", icon: BsWhatsapp, isExternal: true },
  ];

  const navRow = (item: typeof navItems[0]) => {
    const inner = (
      <div
        key={item.label}
        onClick={item.action ?? undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.45rem 0.75rem",
          cursor: "pointer",
          fontFamily: mono,
          fontSize: "0.8rem",
          transition: "background 0.12s",
          textDecoration: "none",
          color: "inherit",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = c.hoverBg ?? c.titleBar;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "transparent";
        }}
      >
        <item.icon size={14} style={{ color: c.dim, flexShrink: 0 }} />
        <span style={{ color: c.muted }}>→</span>
        <span style={{ color: c.cyan }}>{item.label}</span>
      </div>
    );

    if (item.href) {
      return (
        <Link key={item.label} href={item.href} style={{ textDecoration: "none", color: "inherit" }} onClick={() => setOpen(false)}>
          {inner}
        </Link>
      );
    }
    return inner;
  };

  const linkBtnStyle: React.CSSProperties = {
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

  const quickLinksRow = (
    <div style={{
      display: "flex",
      gap: "0.4rem",
      flexWrap: "wrap",
      padding: "0.5rem 0.75rem",
      borderBottom: `1px dashed ${c.border}`,
    }}>
      {quickLinks.map((link) => {
        const iconEl = link.icon
          ? <link.icon size={12} />
          : <Download set="bold" primaryColor="currentColor" size={12} />;
        if (link.isExternal) {
          return (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              style={linkBtnStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
              {iconEl} {link.label}
            </a>
          );
        }
        return (
          <a key={link.label} href={link.href}
            style={linkBtnStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            {iconEl} {link.label}
          </a>
        );
      })}
    </div>
  );

  // ---------- Popup (desktop) ----------
  const popup = (
    <div style={{
      position: "fixed",
      bottom: "5.5rem",
      right: "1.5rem",
      width: "240px",
      background: c.surface,
      border: `1px solid ${c.border}`,
      borderRadius: "6px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
      zIndex: 1001,
      overflow: "hidden",
    }}>
      <div style={{
        background: c.titleBar,
        padding: "0.5rem 0.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ color: c.green, fontFamily: mono, fontSize: "0.8rem", fontWeight: 600 }}>
          <span style={{ color: c.dim, fontSize: "0.8em" }}>$ </span>nav
        </span>
        <span onClick={() => setOpen(false)}
          style={{ color: c.dim, fontFamily: mono, fontSize: "0.8rem", cursor: "pointer" }}>[x]</span>
      </div>
      {quickLinksRow}
      <div style={{ padding: "0.35rem 0" }}>
        {navItems.map(navRow)}
      </div>
      {url && (
        <div style={{ borderTop: `1px dashed ${c.border}`, padding: "0.5rem 0.75rem" }}>
          <span style={{ color: c.dim, fontFamily: mono, fontSize: "0.7rem" }}>share:</span>
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.35rem" }}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.getUrl(url, title)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`share-on-${link.name}`}
                style={{
                  color: c.muted,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  border: `1px solid ${c.border}`,
                  borderRadius: "2px",
                  background: "transparent",
                  transition: "all 0.15s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = c.green;
                  (e.currentTarget as HTMLAnchorElement).style.color = c.green;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = c.border;
                  (e.currentTarget as HTMLAnchorElement).style.color = c.muted;
                }}
              >
                <link.icon size={12} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // ---------- Drawer (mobile) ----------
  const backdrop = (
    <div onClick={() => setOpen(false)}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000 }} />
  );

  const drawer = (
    <div style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      background: c.surface,
      border: `1px solid ${c.border}`,
      borderRadius: "12px 12px 0 0",
      zIndex: 1001,
      maxHeight: "50vh",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 -4px 24px rgba(0,0,0,0.45)",
    }}>
      <div style={{ display: "flex", justifyContent: "center", padding: "0.5rem 0 0.25rem" }}>
        <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: c.border }} />
      </div>
      <div style={{
        padding: "0.35rem 0.75rem 0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${c.border}`,
      }}>
        <span style={{ color: c.green, fontFamily: mono, fontSize: "0.85rem", fontWeight: 600 }}>
          <span style={{ color: c.dim, fontSize: "0.8em" }}>$ </span>nav
        </span>
        <span onClick={() => setOpen(false)}
          style={{ color: c.dim, fontFamily: mono, fontSize: "0.85rem", cursor: "pointer", padding: "0.25rem" }}>[x]</span>
      </div>
      {quickLinksRow}
      <div style={{ overflowY: "auto", padding: "0.35rem 0", flex: 1 }}>
        {navItems.map(navRow)}
      </div>
      {url && (
        <div style={{ borderTop: `1px dashed ${c.border}`, padding: "0.5rem 0.75rem" }}>
          <span style={{ color: c.dim, fontFamily: mono, fontSize: "0.7rem" }}>share:</span>
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.35rem" }}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.getUrl(url, title)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`share-on-${link.name}`}
                style={{
                  color: c.muted,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  border: `1px solid ${c.border}`,
                  borderRadius: "2px",
                  background: "transparent",
                  transition: "all 0.15s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = c.green;
                  (e.currentTarget as HTMLAnchorElement).style.color = c.green;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = c.border;
                  (e.currentTarget as HTMLAnchorElement).style.color = c.muted;
                }}
              >
                <link.icon size={12} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {open && isMobile && backdrop}
      {open && (isMobile ? drawer : popup)}

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

      {open && !isMobile && (
        <div onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 1000 }} />
      )}
    </>
  );
};

export default FloatingBlogNav;
