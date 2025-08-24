import React from "react";
import Link from "next/link";
import { Text, Badge, Button } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

interface BreadcrumbsProps {
  items: Array<{ label: string; href: string; active?: boolean }>;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { theme, setTheme } = useNextTheme();
  const isDark = theme === "dark";
  // Use custom media query hook
  // ...existing code...
  const { useMediaQuery } = require("../hooks/useMediaQuery");
  const isMobile = useMediaQuery(650);
  return (
    <nav
      aria-label="breadcrumb"
      style={{
        marginBottom: isMobile ? "1rem" : "1.5rem",
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        gap: isMobile ? "0.5rem" : undefined,
      }}
    >
      <ol
        style={{
          display: "flex",
          gap: isMobile ? "0.25rem" : "0.5rem",
          listStyle: "none",
          padding: 0,
          margin: 0,
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        {items.map((item, idx) => (
          <li key={item.href + item.label} style={{ display: "flex", alignItems: "center" }}>
            <Badge
              color={item.active ? "primary" : "secondary"}
              variant={item.active ? "default" : "bordered"}
              size={isMobile ? "sm" : "md"}
              css={{
                px: isMobile ? "0.5em" : "0.75em",
                py: isMobile ? "0.3em" : "0.5em",
                fontWeight: 500,
                fontSize: isMobile ? "0.9em" : "1em",
                cursor: item.active ? "default" : "pointer",
                background: item.active ? "var(--nextui-colors-primarySolidHover)" : "var(--nextui-colors-secondaryLight)",
                color: item.active ? "#fff" : "var(--nextui-colors-secondary)",
                borderColor: item.active ? "var(--nextui-colors-primary)" : "var(--nextui-colors-secondary)",
                transition: "all 0.2s",
                maxWidth: "240px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textAlign: "center",
                borderRadius: "0.75em",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)",
                padding: "0.25em 0.5em",
                backgroundClip: "padding-box",
              }}
            >
              {item.active ? (
                <Text b color="#fff" size={isMobile ? 13 : 16} css={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", textAlign: "center", maxWidth: "240px", display: "inline-block", borderRadius: "0.5em", padding: "0.1em 0.2em" }}>{item.label.length > 40 ? item.label.slice(0, 37) + "..." : item.label}</Text>
              ) : (
                <Link href={item.href} style={{ color: "var(--nextui-colors-secondary)", textDecoration: "none", fontWeight: 500, fontSize: isMobile ? "0.95em" : "1em", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", textAlign: "center", maxWidth: "240px", display: "inline-block", borderRadius: "0.5em", padding: "0.1em 0.2em" }}>
                  {item.label.length > 40 ? item.label.slice(0, 37) + "..." : item.label}
                </Link>
              )}
            </Badge>
            {idx < items.length - 1 && (
              <span style={{ margin: isMobile ? "0 0.25rem" : "0 0.5rem", color: "#bbb", fontWeight: 700 }}>/</span>
            )}
          </li>
        ))}
      </ol>
      <Button
        auto
        bordered
        aria-label="Toggle theme"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        css={{
          minWidth: "40px",
          padding: 0,
          background: "transparent",
          ml: isMobile ? 0 : "1rem",
          mt: isMobile ? "0.5rem" : 0,
          borderColor: isDark ? "#f5d76e" : "#222",
        }}
      >
        {isDark ? (
          <FiSun size={isMobile ? 18 : 22} color="#f5d76e" />
        ) : (
          <FiMoon size={isMobile ? 18 : 22} color="#222" />
        )}
      </Button>
    </nav>
  );
};

export default Breadcrumbs;
