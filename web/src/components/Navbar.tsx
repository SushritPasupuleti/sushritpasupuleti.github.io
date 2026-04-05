import Link from "next/link";
import { useRouter } from "next/router";
import { MdArticle } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import { useTerminalTheme, mono } from "../terminal-theme";
import { Download } from "react-iconly";
import { BsWhatsapp } from "react-icons/bs";
import { FiSun, FiMoon } from "react-icons/fi";
import React from "react";

const Navbar: React.FC = () => {
  const { isDark, c, setTheme } = useTerminalTheme();
  const router = useRouter();
  const isBlogPage = router.pathname.startsWith("/blogs");

  const linkStyle: React.CSSProperties = {
    color: c.muted,
    fontFamily: mono,
    fontSize: "0.8rem",
    textDecoration: "none",
    padding: "0.3rem 0.6rem",
    border: `1px solid ${c.border}`,
    borderRadius: "3px",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    transition: "color 0.15s, border-color 0.15s",
  };

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    (e.currentTarget as HTMLAnchorElement).style.color = c.green;
    (e.currentTarget as HTMLAnchorElement).style.borderColor = c.green;
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    (e.currentTarget as HTMLAnchorElement).style.color = c.muted;
    (e.currentTarget as HTMLAnchorElement).style.borderColor = c.border;
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1.5rem",
        fontFamily: mono,
        fontSize: "0.85rem",
        background: isDark ? "rgba(10,10,10,0.92)" : "rgba(245,245,240,0.92)",
        borderBottom: `1px solid ${c.border}`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <Link href="/" style={{ color: c.green, textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>
        <span style={{ color: c.green }}>~</span>
        <span style={{ color: c.muted }}>/</span>
        <span style={{ color: c.textBright }}>sushrit</span>
      </Link>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Link
          href={isBlogPage ? "/" : "/blogs"}
          style={linkStyle}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {isBlogPage ? <><FiHome size={14} /> Home</> : <><MdArticle size={14} /> Blogs</>}
        </Link>
        <a
          href="/resume/resume.pdf"
          style={linkStyle}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <Download set="bold" primaryColor="currentColor" size={14} />
          Resume
        </a>
        {/* <a
          href="https://wa.me/919182362040"
          style={linkStyle}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <BsWhatsapp size={14} />
          WhatsApp
        </a> */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
          style={{
            background: "transparent",
            border: `1px solid ${c.border}`,
            borderRadius: "3px",
            cursor: "pointer",
            padding: "0.3rem 0.45rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: c.muted,
            fontFamily: mono,
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
          {isDark ? <FiSun size={14} /> : <FiMoon size={14} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
