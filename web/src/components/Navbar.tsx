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
  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: isMobile ? "0.5rem 1rem" : "1rem 2rem",
        marginBottom: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 16px 0 rgba(0,0,0,0.08)",
        border: "none",
        background: `linear-gradient(90deg, var(--nextui-colors-background), var(--nextui-colors-primaryLight))`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "background 0.3s",
      }}
    >
      {/* <Text h2 css={{ m: 0, fontWeight: "bold", letterSpacing: "0.05em", color: "var(--nextui-colors-primary)" }}>
        Sushrit Pasupuleti
      </Text> */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
