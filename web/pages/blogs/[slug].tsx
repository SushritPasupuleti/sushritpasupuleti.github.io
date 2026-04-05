import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticProps, GetStaticPaths } from "next";
import React, { useState, useCallback } from "react";
import { useTheme as useNextTheme } from "next-themes";
import Link from "next/link";
import Head from "next/head";
import ShareSheet from "../../src/components/ShareSheet";
import TerminalLine from "../../src/components/TerminalLine";
import FloatingBlogNav from "../../src/components/FloatingBlogNav";
import TerminalBoot from "../../src/components/TerminalBoot";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeVideo from 'rehype-video';
import { FiSun, FiMoon } from "react-icons/fi";

const darkPalette = {
  bg: "#0a0a0a", surface: "#0d0d0d", titleBar: "#1a1a2e",
  border: "#2a2a2a", green: "#00ff41", cyan: "#00bfff",
  text: "#b0b0b0", textBright: "#e0e0e0", muted: "#666",
  dim: "#555", separator: "#333",
};
const lightPalette = {
  bg: "#f5f5f0", surface: "#ffffff", titleBar: "#e8e8e0",
  border: "#d0d0c8", green: "#1a7a2e", cyan: "#0055a0",
  text: "#222222", textBright: "#111111", muted: "#555",
  dim: "#777", separator: "#bbb",
};

const mono = "'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace";

function getTerminalComponents(c: typeof darkPalette): Partial<Components> {
  return {
  h1: ({ children }) => (
    <h1 style={{ color: c.green, fontFamily: mono, fontSize: "1.3rem", fontWeight: 700, borderBottom: `1px dashed ${c.separator}`, paddingBottom: "0.5rem", marginTop: "2rem" }}>
      <span style={{ color: c.dim, fontWeight: 400, fontSize: "0.8em" }}>## </span>{children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ color: c.green, fontFamily: mono, fontSize: "1.15rem", fontWeight: 600, borderBottom: `1px dashed ${c.separator}`, paddingBottom: "0.4rem", marginTop: "1.75rem" }}>
      <span style={{ color: c.dim, fontWeight: 400, fontSize: "0.8em" }}>## </span>{children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ color: c.green, fontFamily: mono, fontSize: "1.05rem", fontWeight: 600, borderBottom: `1px dashed ${c.border}`, paddingBottom: "0.3rem", marginTop: "1.5rem" }}>
      <span style={{ color: c.dim, fontWeight: 400, fontSize: "0.8em" }}>### </span>{children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 style={{ color: c.green, fontFamily: mono, fontSize: "0.95rem", fontWeight: 600, marginTop: "1.25rem" }}>
      <span style={{ color: c.dim, fontWeight: 400, fontSize: "0.8em" }}>#### </span>{children}
    </h4>
  ),
  p: ({ children }) => (
    <p style={{ color: c.text, fontFamily: mono, lineHeight: 1.8, fontSize: "0.9rem", margin: "1rem 0" }}>{children}</p>
  ),
  a: ({ href, children }) => (
    <a href={href} style={{ color: c.cyan, textDecoration: "underline", textDecorationStyle: "dashed", fontFamily: mono }} target="_blank" rel="noopener noreferrer">{children}</a>
  ),
  strong: ({ children }) => (
    <strong style={{ color: c.textBright, fontWeight: 700 }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ color: c.muted, fontStyle: "italic" }}>{children}</em>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code style={{ background: c.titleBar, color: c.green, padding: "0.15em 0.4em", borderRadius: "2px", fontSize: "0.88em", border: `1px solid ${c.separator}`, fontFamily: mono }}>{children}</code>
      );
    }
    return (
      <code className={className} style={{ fontFamily: mono, fontSize: "0.85em", color: c.text }} {...props}>{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre style={{ background: c.bg, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.green}`, padding: "1rem", overflowX: "auto", fontSize: "0.85em", fontFamily: mono, margin: "1.25rem 0", borderRadius: "2px" }}>{children}</pre>
  ),
  blockquote: ({ children }) => (
    <div style={{ display: "flex", gap: "0.5rem", margin: "1rem 0", fontFamily: mono, fontSize: "0.85rem", lineHeight: 1.8 }}>
      <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", flexShrink: 0, color: c.green, userSelect: "none" as const, fontSize: "0.75rem", lineHeight: "1.4" }}>
        <span>{"/*"}</span>
        <div style={{ width: "1px", flex: 1, background: c.green, opacity: 0.5 }} />
        <span>{"*/"}</span>
      </div>
      <div style={{ color: c.muted, fontStyle: "italic", flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  ),
  ul: ({ children }) => (
    <ul style={{ color: c.text, fontFamily: mono, paddingLeft: "1.5rem", lineHeight: 1.8, fontSize: "0.9rem" }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ color: c.text, fontFamily: mono, paddingLeft: "1.5rem", lineHeight: 1.8, fontSize: "0.9rem" }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: "0.3rem" }}><span style={{ color: c.green }}></span>{children}</li>
  ),
  hr: () => (
    <hr style={{ border: "none", borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />
  ),
  img: ({ src, alt }) => (
    <img src={src} alt={alt || ""} style={{ maxWidth: "100%", border: `1px solid ${c.border}`, borderRadius: "2px", margin: "1rem 0", display: "block" }} />
  ),
  table: ({ children }) => (
    <div style={{ overflowX: "auto", margin: "1.25rem 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: mono, fontSize: "0.85rem", border: `1px solid ${c.border}` }}>{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead style={{ background: c.titleBar, color: c.green }}>{children}</thead>
  ),
  th: ({ children }) => (
    <th style={{ padding: "0.5rem 0.75rem", borderBottom: `1px solid ${c.green}`, textAlign: "left", fontWeight: 600, color: c.green, fontSize: "0.85rem" }}>{children}</th>
  ),
  td: ({ children }) => (
    <td style={{ padding: "0.5rem 0.75rem", borderBottom: `1px dashed ${c.border}`, color: c.text }}>{children}</td>
  ),
  tr: ({ children }) => (
    <tr style={{ transition: "background 0.1s" }}>{children}</tr>
  ),
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDir = path.join(process.cwd(), "public", "blogs");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, "") },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postsDir = path.join(process.cwd(), "public", "blogs");
  const filePath = path.join(postsDir, `${params?.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  return {
    props: {
      title: data.title || params?.slug,
      date: data.date || "",
      content,
      cover_img_url: data.cover_img_url || "",
      description: data.description || content.slice(0, 160),
      slug: params?.slug || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
    },
  };
};

const BlogPost = ({
  title,
  date,
  content,
  cover_img_url,
  description,
  slug,
  tags,
}: {
  title: string;
  date: string;
  content: string;
  cover_img_url?: string;
  description?: string;
  slug?: string;
  tags?: string[];
}) => {
  const { theme, setTheme } = useNextTheme();
  const isDark = theme === "dark";
  const c = isDark ? darkPalette : lightPalette;
  const terminalComponents = getTerminalComponents(c);

  const bootLines = [
    { command: `cd ~/blogs`, output: ["~/blogs"] },
    { command: `stat ${slug}.md`, output: ["Checking file...", "Found."] },
    { command: `cat ${slug}.md`, output: ["Reading frontmatter...", `title: "${title}"`] },
    { command: `head -n 20 ${slug}.md | grep 'tags:'`, output: [tags && tags.length > 0 ? `tags: [${tags.join(", ")}]` : "tags: []"] },
    { command: "source ~/.terminal-theme", output: ["Theme loaded."] },
    { command: "render --format=terminal --with-syntax-highlight", output: ["Rendering markdown...", "Done."] },
  ];

  const [booting, setBooting] = useState(true);
  const handleBootDone = useCallback(() => {
    setBooting(false);
  }, []);

  return (
  <>
    {booting && <TerminalBoot lines={bootLines} c={c} onDone={handleBootDone} maxDuration={6000} />}
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {cover_img_url && <meta property="og:image" content={cover_img_url} />}
      <meta property="og:type" content="article" />
    </Head>
    <FloatingBlogNav url={typeof window !== "undefined" ? window.location.href : ""} title={title} />
    <div
      className="terminal-container"
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "2rem 1.5rem",
        fontFamily: "'JetBrains Mono', monospace",
        color: c.text,
        minHeight: "100vh",
      }}
    >
      {/* Terminal window bar */}
      <div
        style={{
          background: c.titleBar,
          border: `1px solid ${c.border}`,
          borderBottom: "none",
          borderRadius: "6px 6px 0 0",
          padding: "0.5rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{ marginLeft: "1rem", color: c.muted, fontSize: "0.75rem", flex: 1 }}>
          ~/blogs/{slug}
        </span>
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
          style={{
            background: "transparent",
            border: `1px solid ${c.border}`,
            borderRadius: "3px",
            cursor: "pointer",
            padding: "0.25rem 0.4rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: c.muted,
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

      {/* Terminal body */}
      <div
        style={{
          background: c.surface,
          border: `1px solid ${c.border}`,
          borderRadius: "0 0 6px 6px",
          padding: "1.5rem",
        }}
      >
        {/* Breadcrumb as terminal path */}
        <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem" }}>
          <span style={{ color: c.green }}>guest@sushrit</span>
          <span style={{ color: c.muted }}>:</span>
          <span style={{ color: c.cyan }}>~</span>
          <span style={{ color: c.muted }}> $ </span>
          <Link href="/" style={{ color: c.cyan, textDecoration: "none" }}>cd home</Link>
          <span style={{ color: c.muted }}> / </span>
          <Link href="/blogs" style={{ color: c.cyan, textDecoration: "none" }}>blogs</Link>
          <span style={{ color: c.muted }}> / </span>
          <span style={{ color: c.textBright }}>{slug}</span>
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px dashed ${c.border}`, margin: "1rem 0" }} />

        {/* Title block */}
        <div style={{ marginBottom: "1.5rem" }}>
          <TerminalLine variant="open" label="blog" color={c.dim} />
          <h1 style={{
            color: c.green,
            fontSize: "1.4rem",
            fontWeight: 700,
            margin: "0 0 0.5rem 0",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.3,
          }}>
            {title}
          </h1>
          {date && (
            <div style={{ color: c.dim, fontSize: "0.8rem" }}>
              <span style={{ color: c.muted }}>date:</span> {date}
            </div>
          )}
          {tags && tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.5rem" }}>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blogs?tag=${encodeURIComponent(tag)}`}
                  style={{
                    background: isDark ? "rgba(0,255,65,0.05)" : "rgba(26,122,46,0.08)",
                    color: c.green,
                    border: `1px solid ${isDark ? "#1a3a1a" : "#b0d8b0"}`,
                    borderRadius: "2px",
                    padding: "0.15rem 0.5rem",
                    fontSize: "0.7rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
          <TerminalLine variant="close" color={c.dim} />
        </div>

        {/* Share icons */}
        <div style={{ marginBottom: "1.5rem" }}>
          <ShareSheet
            url={typeof window !== "undefined" ? window.location.href : ""}
            title={title}
            variant="icons"
          />
        </div>

        {/* Content */}
        <div
          className="terminal-markdown"
          style={{
            width: "100%",
            maxWidth: "100%",
            overflowX: "auto",
            lineHeight: 1.8,
            fontSize: "0.9rem",
          }}
        >
          <ReactMarkdown components={terminalComponents} rehypePlugins={[rehypeSanitize, rehypeVideo]}>{content}</ReactMarkdown>
        </div>

        {/* Bottom divider */}
        <div style={{ borderTop: `1px dashed ${c.border}`, margin: "2rem 0 1.5rem" }} />

        {/* Share CTA */}
        <ShareSheet
          url={typeof window !== "undefined" ? window.location.href : ""}
          title={title}
          variant="cta"
        />

        {/* Terminal prompt at bottom */}
        <div style={{ marginTop: "2rem", fontSize: "0.85rem" }}>
          <span style={{ color: c.green }}>guest@sushrit</span>
          <span style={{ color: c.muted }}>:</span>
          <span style={{ color: c.cyan }}>~/blogs</span>
          <span style={{ color: c.muted }}> $ </span>
          <span className="terminal-cursor" style={{ color: c.text }}></span>
        </div>
      </div>
    </div>
  </>
  );
};

export default BlogPost;
