import React from "react";
import TmuxPane from "./TmuxPane";

interface Palette {
  bg: string; surface: string; titleBar: string;
  border: string; green: string; cyan: string;
  text: string; textBright: string; muted: string;
  dim: string; tagBorder: string; tagBg: string;
  hoverBg: string; separator: string;
}

interface BlogSearchProps {
  c: Palette;
  isDark: boolean;
  search: string;
  setSearch: (value: string) => void;
  allTags: string[];
  activeTags: string[];
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  defaultExpanded?: boolean;
}

const BlogSearch: React.FC<BlogSearchProps> = ({
  c,
  isDark,
  search,
  setSearch,
  allTags,
  activeTags,
  toggleTag,
  clearTags,
  defaultExpanded = false,
}) => {
  const badges = React.useMemo(() => {
    const b: { label: string; color: "green" | "cyan" }[] = [];
    if (activeTags.length > 0)
      b.push({ label: `${activeTags.length} tag${activeTags.length > 1 ? "s" : ""}`, color: "green" });
    if (search)
      b.push({ label: "query", color: "cyan" });
    return b;
  }, [activeTags, search]);

  const shouldForceOpen = activeTags.length > 0 || !!search;

  return (
    <TmuxPane
      c={c}
      isDark={isDark}
      title="search"
      subtitle="filter"
      defaultOpen={defaultExpanded}
      forceOpen={shouldForceOpen}
      badges={badges}
    >
      {/* Search input */}
      <div style={{ marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: "0.85rem" }}>
          <span style={{ color: c.green, flexShrink: 0 }}>guest@sushrit</span>
          <span style={{ color: c.muted, flexShrink: 0 }}>:</span>
          <span style={{ color: c.cyan, flexShrink: 0 }}>~</span>
          <span style={{ color: c.muted, flexShrink: 0 }}> $ grep -i &quot;</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search posts..."
            spellCheck={false}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: c.textBright,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              flex: 1,
              minWidth: 0,
              padding: 0,
              caretColor: c.green,
            }}
          />
          <span style={{ color: c.muted, flexShrink: 0 }}>&quot; ./blogs/*</span>
        </div>
      </div>

      {/* Tmux-style horizontal divider */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        margin: "0.25rem 0 0.6rem",
        fontSize: "0.65rem",
        color: c.dim,
      }}>
        <div style={{ flex: 1, height: "1px", background: c.border }} />
        <span>tags</span>
        <div style={{ flex: 1, height: "1px", background: c.border }} />
      </div>

      {/* Tag filter */}
      <div>
        <div style={{ display: "flex", alignItems: "center", fontSize: "0.75rem", color: c.dim, marginBottom: "0.4rem" }}>
          <span style={{ color: c.green }}>$ </span>
          <span style={{ marginLeft: "0.25rem" }}>filter --tags</span>
          {activeTags.length > 0 && (
            <button
              onClick={() => clearTags()}
              style={{
                background: "transparent",
                border: `1px solid ${c.border}`,
                borderRadius: "2px",
                color: c.muted,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                cursor: "pointer",
                marginLeft: "0.75rem",
                padding: "0.05rem 0.4rem",
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
              clear
            </button>
          )}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {allTags.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  background: isActive ? c.green : c.tagBg,
                  color: isActive ? (isDark ? "#0a0a0a" : "#ffffff") : c.green,
                  border: `1px solid ${isActive ? c.green : c.tagBorder}`,
                  borderRadius: "2px",
                  padding: "0.15rem 0.5rem",
                  fontSize: "0.7rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>
    </TmuxPane>
  );
};

export default BlogSearch;
