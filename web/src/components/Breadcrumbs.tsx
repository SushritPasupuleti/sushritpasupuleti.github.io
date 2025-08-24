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
  return (
    <nav aria-label="breadcrumb" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, idx) => (
          <li key={item.href + item.label} style={{ display: "flex", alignItems: "center" }}>
            <Badge
              color={item.active ? "primary" : "secondary"}
              variant={item.active ? "default" : "bordered"}
              size="md"
              css={{
                px: "0.75em",
                py: "0.5em",
                fontWeight: 500,
                fontSize: "1em",
                cursor: item.active ? "default" : "pointer",
                background: item.active ? "var(--nextui-colors-primarySolidHover)" : "var(--nextui-colors-secondaryLight)",
                color: item.active ? "#fff" : "var(--nextui-colors-secondary)",
                borderColor: item.active ? "var(--nextui-colors-primary)" : "var(--nextui-colors-secondary)",
                transition: "all 0.2s"
              }}
            >
              {item.active ? (
                <Text b color="#fff" size={16}>{item.label}</Text>
              ) : (
                <Link href={item.href} style={{ color: "var(--nextui-colors-secondary)", textDecoration: "none", fontWeight: 500 }}>
                  {item.label}
                </Link>
              )}
            </Badge>
            {idx < items.length - 1 && <span style={{ margin: "0 0.5rem", color: "#bbb", fontWeight: 700 }}>/</span>}
          </li>
        ))}
      </ol>
      <Button
        auto
        light
        aria-label="Toggle theme"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        css={{ minWidth: "40px", padding: 0, background: "transparent", ml: "1rem" }}
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

export default Breadcrumbs;
