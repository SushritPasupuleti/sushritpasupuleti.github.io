import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export const darkPalette = {
  bg: "#0a0a0a",
  surface: "#0d0d0d",
  titleBar: "#1a1a2e",
  border: "#2a2a2a",
  green: "#00ff41",
  cyan: "#00bfff",
  text: "#b0b0b0",
  textBright: "#e0e0e0",
  muted: "#666",
  dim: "#555",
  tagBorder: "#1a3a1a",
  tagBg: "rgba(0,255,65,0.05)",
  hoverBg: "#1a1a2e",
  separator: "#333",
};

export const lightPalette = {
  bg: "#f5f5f0",
  surface: "#ffffff",
  titleBar: "#e8e8e0",
  border: "#d0d0c8",
  green: "#1a7a2e",
  cyan: "#0055a0",
  text: "#222222",
  textBright: "#111111",
  muted: "#555",
  dim: "#777",
  tagBorder: "#b0d8b0",
  tagBg: "rgba(26,122,46,0.08)",
  hoverBg: "#eeeee8",
  separator: "#bbb",
};

export type Palette = typeof darkPalette;

export const mono = "'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace";

export function useTerminalTheme() {
  const { resolvedTheme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Default to false (light palette) before mount so the initial client render
  // matches SSR output — next-themes resolves the real theme only on the client.
  const isDark = mounted ? resolvedTheme === "dark" : false;
  const c = isDark ? darkPalette : lightPalette;
  return { theme: resolvedTheme, setTheme, isDark, c };
}
