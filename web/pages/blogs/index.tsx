import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useTheme as useNextTheme } from "next-themes";
import Image from "next/image";
import yaml from "js-yaml";
// @ts-ignore
import fsExtra from "fs";
import Head from "next/head";
import { FiSun, FiMoon } from "react-icons/fi";
import { getReadTime } from "../../src/utils";
import BlogSearch from "../../src/components/BlogSearch";
import Navbar from "../../src/components/Navbar";
import TerminalBoot from "../../src/components/TerminalBoot";

const BLOGS_BOOT_LINES = [
  { command: "cd ~/blogs", output: ["~/blogs"] },
  {
    command: "find . -name '*.md' -type f | wc -l",
    output: ["Counting posts..."],
  },
  {
    command: "ls -la *.md | sort -t' ' -k6 -r",
    output: ["Sorting by date..."],
  },
  { command: "cat authors.yml", output: ["Loading authors..."] },
  {
    command: "grep -r 'tags:' *.md | cut -d: -f2 | sort -u",
    output: ["Indexing tags..."],
  },
  {
    command: "render --index --with-search --with-filters",
    output: ["Building index...", "Done."],
  },
];

const darkPalette = {
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
const lightPalette = {
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

interface BlogMeta {
  slug: string;
  title: string;
  authors?: string;
  tags?: string[];
  date?: string;
  cover_img_url?: string;
  readTime?: number;
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDir = path.join(process.cwd(), "public", "blogs");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const authorsYmlPath = path.join(postsDir, "authors.yml");
  let authorsMap: Record<string, any> = {};
  if (fsExtra.existsSync(authorsYmlPath)) {
    const authorsYml = fsExtra.readFileSync(authorsYmlPath, "utf8");
    authorsMap = yaml.load(authorsYml) as Record<string, any>;
  }
  const posts = files.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    let coverImgUrl = data.cover_img_url || "";
    if (coverImgUrl && !coverImgUrl.startsWith("http")) {
      const localPath = path.join(process.cwd(), "public", coverImgUrl);
      if (fs.existsSync(localPath)) {
        coverImgUrl = "/" + coverImgUrl.replace(/^\/|\/$/g, "");
      }
    }

    return {
      slug: data.slug || filename.replace(/\.md$/, ""),
      title: data.title || filename,
      authors: data.authors || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      date: data.date || "",
      cover_img_url: coverImgUrl,
      readTime: getReadTime(content),
      authorsMap,
    };
  });
  return { props: { posts } };
};

const BlogsPage = ({
  posts,
}: {
  posts: (BlogMeta & { authorsMap?: any })[];
}) => {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted ? theme === "dark" : false;
  const c = isDark ? darkPalette : lightPalette;

  const [booting, setBooting] = React.useState(false);
  const handleBootDone = React.useCallback(() => {
    setBooting(false);
  }, []);

  React.useEffect(() => {
    setBooting(true);
  }, []);

  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [activeTags, setActiveTags] = React.useState<string[]>([]);

  // Initialize active tags from query parameter
  React.useEffect(() => {
    const tagParam = router.query.tag;
    if (tagParam) {
      const tag = Array.isArray(tagParam) ? tagParam[0] : tagParam;
      setActiveTags([tag]);
    }
  }, [router.query.tag]);

  // Collect all unique tags
  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((t) => (post.tags || []).includes(t));
      return matchesSearch && matchesTags;
    });
  }, [posts, search, activeTags]);

  return (
    <>
      {booting && (
        <TerminalBoot
          lines={BLOGS_BOOT_LINES}
          c={c}
          onDone={handleBootDone}
          maxDuration={6000}
        />
      )}
      <Head>
        <title>Sushrit&#39;s Blogs</title>
        <meta property="og:title" content="Sushrit&#39;s Blogs" />
        <meta
          property="og:description"
          content="I just blog about tech, programming, startups and anything else that piques my interest."
        />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <div
        className="terminal-container"
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          paddingTop: "4.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingBottom: "2rem",
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
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff5f57",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#febc2e",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#28c840",
              display: "inline-block",
            }}
          />
          <span
            style={{
              marginLeft: "1rem",
              color: c.muted,
              fontSize: "0.75rem",
              flex: 1,
            }}
          >
            ~/blogs
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
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                c.green;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = c.muted;
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                c.border;
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
            minHeight: "60vh",
          }}
        >
          {/* Breadcrumb as terminal path */}
          <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem" }}>
            <span style={{ color: c.green }}>guest@sushrit</span>
            <span style={{ color: c.muted }}>:</span>
            <span style={{ color: c.cyan }}>~</span>
            <span style={{ color: c.muted }}> $ </span>
            <Link href="/" style={{ color: c.cyan, textDecoration: "none" }}>
              cd home
            </Link>
            <span style={{ color: c.muted }}> / </span>
            <span style={{ color: c.textBright }}>blogs</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "2rem" }}>
            <pre
              style={{
                color: c.green,
                fontSize: "0.7rem",
                lineHeight: 1.2,
                margin: 0,
                whiteSpace: "pre",
                overflowX: "auto",
              }}
            >
              {`
 ____  _     ___   ____ ____
| __ )| |   / _ \\ / ___/ ___|
|  _ \\| |  | | | | |  _\\___ \\
| |_) | |__| |_| | |_| |___) |
|____/|_____\\___/ \\____|____/
`}
            </pre>
            <p
              style={{
                color: c.muted,
                fontSize: "0.8rem",
                margin: "0.5rem 0 0 0",
                borderBottom: `1px dashed ${c.border}`,
                paddingBottom: "1rem",
              }}
            >
              <span style={{ color: c.green }}>{"// "}</span>
              tech, programming, startups & more &mdash; {
                filteredPosts.length
              }{" "}
              posts found
            </p>
          </div>

          <BlogSearch
            c={c}
            isDark={isDark}
            search={search}
            setSearch={setSearch}
            allTags={allTags}
            activeTags={activeTags}
            toggleTag={toggleTag}
            clearTags={() => setActiveTags([])}
          />

          {/* Post listing */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {filteredPosts.length === 0 && (
              <div style={{ padding: "2rem 0", textAlign: "center" }}>
                <p
                  style={{
                    color: c.muted,
                    fontSize: "0.85rem",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <span style={{ color: c.green }}>$</span> No matching posts
                  found.
                </p>
                <p
                  style={{
                    color: c.dim,
                    fontSize: "0.75rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    marginTop: "0.25rem",
                  }}
                >
                  Try a different query or clear the filters.
                </p>
              </div>
            )}
            {filteredPosts.map((post, idx) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    padding: "1rem 0",
                    borderBottom:
                      idx < filteredPosts.length - 1
                        ? `1px dashed ${c.titleBar}`
                        : "none",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      c.hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      "transparent";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                    }}
                  >
                    <span
                      style={{
                        color: c.green,
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      [{String(idx).padStart(2, "0")}]
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            color: c.textBright,
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          {post.title}
                        </span>
                        {post.date && (
                          <span
                            style={{
                              color: c.dim,
                              fontSize: "0.75rem",
                              flexShrink: 0,
                            }}
                          >
                            {post.date}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          marginTop: "0.4rem",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.4rem",
                          alignItems: "center",
                        }}
                      >
                        {post.authors && (
                          <span style={{ color: c.muted, fontSize: "0.75rem" }}>
                            by{" "}
                            {post.authors.split(",").map((authorKey, aIdx) => {
                              const author =
                                post.authorsMap?.[authorKey.trim()];
                              return (
                                <span key={authorKey}>
                                  {aIdx > 0 && ", "}
                                  <span style={{ color: c.cyan }}>
                                    {author ? author.name : authorKey.trim()}
                                  </span>
                                </span>
                              );
                            })}
                          </span>
                        )}
                        <span
                          style={{ color: c.separator, margin: "0 0.25rem" }}
                        >
                          |
                        </span>
                        {post.readTime && (
                          <span style={{ color: c.green, fontSize: "0.75rem" }}>
                            ~{post.readTime} min read
                          </span>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <>
                            <span
                              style={{
                                color: c.separator,
                                margin: "0 0.25rem",
                              }}
                            >
                              |
                            </span>
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  color: c.green,
                                  fontSize: "0.7rem",
                                  border: `1px solid ${c.tagBorder}`,
                                  padding: "0.1rem 0.4rem",
                                  borderRadius: "2px",
                                  background: c.tagBg,
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

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

export default BlogsPage;
