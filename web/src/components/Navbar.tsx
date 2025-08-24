import { Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { MdArticle } from "react-icons/md";
import { useTheme as useNextTheme } from "next-themes";
import { Download } from "react-iconly";
import { FiSun, FiMoon } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import React from "react";

interface NavbarProps {
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isMobile }) => {
  const { theme, setTheme } = useNextTheme();
  const isDark = theme === "dark";
  if (isMobile) {
    return (
      <nav
        style={{
          width: "100%",
          left: 0,
          right: 0,
          bottom: 0,
          position: "fixed",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
          padding: "0.5rem 0.5rem 0.2rem 0.5rem",
          borderRadius: "1rem 1rem 0 0",
          boxShadow: isDark ? "0 -2px 16px 0 rgba(31, 38, 135, 0.28)" : "0 -2px 16px 0 rgba(31, 38, 135, 0.18)",
          border: isDark ? "1px solid rgba(40,40,40,0.38)" : "1px solid rgba(255,255,255,0.18)",
          background: isDark ? "rgba(30,30,40,0.95)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 999,
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Link href="/blogs" passHref legacyBehavior>
            <Button
              as="a"
              light
              auto
              icon={<MdArticle style={{ height: "1.7rem", width: "1.7rem", color: "var(--nextui-colors-secondary)" }} />}
              aria-label="Blogs"
            />
          </Link>
          <span style={{ fontSize: "0.85rem", marginTop: "0.2rem", color: isDark ? "#f5d76e" : "var(--nextui-colors-primary)", fontWeight: 500 }}>Blogs</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <a href="/resume/resume.pdf">
            <Button
              light
              auto
              icon={<Download set="bold" primaryColor="white" />}
              aria-label="Resume"
            />
          </a>
          <span style={{ fontSize: "0.85rem", marginTop: "0.2rem", color: isDark ? "#f5d76e" : "var(--nextui-colors-primary)", fontWeight: 500 }}>Resume</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <a href="https://wa.me/919182362040">
            <Button
              light
              auto
              icon={<BsWhatsapp style={{ height: "1.7rem", width: "1.7rem", color: "var(--nextui-colors-success)" }} />} 
              aria-label="WhatsApp"
            />
          </a>
          <span style={{ fontSize: "0.85rem", marginTop: "0.2rem", color: isDark ? "#25d366" : "var(--nextui-colors-success)", fontWeight: 500 }}>WhatsApp</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            light
            auto
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            icon={isDark ? <FiSun size={22} color="#f5d76e" /> : <FiMoon size={22} color="#222" />}
          />
          <span style={{ fontSize: "0.85rem", marginTop: "0.2rem", color: isDark ? "#f5d76e" : "#222", fontWeight: 500 }}>Theme</span>
        </div>
      </nav>
    );
  }
  // Desktop layout
  return (
    <nav
      style={{
        width: "100%",
        left: 0,
        right: 0,
        top: 0,
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderRadius: "0 0 1rem 1rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 999,
        transition: "background 0.3s, box-shadow 0.3s",
      }}
    >
      <Link href="/" passHref legacyBehavior>
        <a style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          letterSpacing: "0.05em",
          color: "var(--nextui-colors-primary)",
          textDecoration: "none",
          marginRight: "2rem",
          transition: "color 0.2s",
        }}>
          Sushrit Pasupuleti
        </a>
      </Link>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexDirection: "row",
          width: "auto",
        }}
      >
        <Link href="/blogs" passHref legacyBehavior>
          <Button
            as="a"
            shadow
            color="secondary"
            auto
            icon={<MdArticle style={{ height: "1.5rem", width: "1.5rem" }} />}
          >
            Blogs
          </Button>
        </Link>
        <a href="/resume/resume.pdf">
          <Button
            shadow
            color="primary"
            auto
            icon={<Download set="bold" primaryColor="white" />}
            css={{
              background: "var(--nextui-colors-primarySolidHover)",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
            }}
          >
            Resume
          </Button>
        </a>
        <a href="https://wa.me/919182362040">
          <Button
            shadow
            color="success"
            auto
            icon={<BsWhatsapp style={{ height: "1.5rem", width: "1.5rem" }} />} 
            css={{
              background: "var(--nextui-colors-successSolidHover)",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
            }}
          >
            WhatsApp
          </Button>
        </a>
      </div>
      <Button
        auto
        bordered
        aria-label="Toggle theme"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        css={{
          minWidth: "40px",
          padding: 0,
          background: "transparent",
          ml: "1rem",
          borderColor: isDark ? "#f5d76e" : "#222",
        }}
      >
        {isDark ? (
          <FiSun size={22} color="#f5d76e" />
        ) : (
          <FiMoon size={22} color="#222" />
        )}
      </Button>
    </nav>
  );
};

export default Navbar;
