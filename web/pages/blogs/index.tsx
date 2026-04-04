import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Text } from "@nextui-org/react";
import Image from "next/image";
import yaml from "js-yaml";
// @ts-ignore
import fsExtra from "fs";
import Head from "next/head";

interface BlogMeta {
  slug: string;
  title: string;
  authors?: string;
  tags?: string[];
  date?: string;
  cover_img_url?: string;
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
    const { data } = matter(fileContent);

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
      authorsMap,
    };
  });
  return { props: { posts } };
};

const BlogsPage = ({
  posts,
}: {
  posts: (BlogMeta & { authorsMap?: any })[];
}) => (
  <>
    <Head>
      <title>Sushrit&#39;s Blogs</title>
      <meta property="og:title" content="Sushrit&#39;s Blogs" />
      <meta
        property="og:description"
        content="I just blog about tech, programming, startups and anything else that piques my interest."
      />
      <meta property="og:type" content="website" />
    </Head>
    <div
      className="terminal-container"
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "2rem 1.5rem",
        fontFamily: "'JetBrains Mono', monospace",
        color: "#b0b0b0",
        minHeight: "100vh",
      }}
    >
      {/* Terminal window bar */}
      <div
        style={{
          background: "#1a1a2e",
          border: "1px solid #2a2a2a",
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
        <span style={{ marginLeft: "1rem", color: "#666", fontSize: "0.75rem" }}>
          ~/blogs
        </span>
      </div>

      {/* Terminal body */}
      <div
        style={{
          background: "#0d0d0d",
          border: "1px solid #2a2a2a",
          borderRadius: "0 0 6px 6px",
          padding: "1.5rem",
          minHeight: "60vh",
        }}
      >
        {/* Breadcrumb as terminal path */}
        <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem" }}>
          <span style={{ color: "#00ff41" }}>guest@sushrit</span>
          <span style={{ color: "#666" }}>:</span>
          <span style={{ color: "#00bfff" }}>~</span>
          <span style={{ color: "#666" }}> $ </span>
          <Link href="/" style={{ color: "#00bfff", textDecoration: "none" }}>cd home</Link>
          <span style={{ color: "#666" }}> / </span>
          <span style={{ color: "#e0e0e0" }}>blogs</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <pre style={{
            color: "#00ff41",
            fontSize: "0.7rem",
            lineHeight: 1.2,
            margin: 0,
            whiteSpace: "pre",
            overflowX: "auto",
          }}>
{`
 ____  _     ___   ____ ____
| __ )| |   / _ \\ / ___/ ___|
|  _ \\| |  | | | | |  _\\___ \\
| |_) | |__| |_| | |_| |___) |
|____/|_____\\___/ \\____|____/
`}
          </pre>
          <p style={{
            color: "#666",
            fontSize: "0.8rem",
            margin: "0.5rem 0 0 0",
            borderBottom: "1px dashed #2a2a2a",
            paddingBottom: "1rem",
          }}>
            <span style={{ color: "#00ff41" }}>// </span>
            tech, programming, startups & more &mdash; {posts.length} posts found
          </p>
        </div>

        {/* Post listing */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {posts.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  padding: "1rem 0",
                  borderBottom: idx < posts.length - 1 ? "1px dashed #1a1a2e" : "none",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "#1a1a2e";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "transparent";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ color: "#00ff41", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0, marginTop: "2px" }}>
                    [{String(idx).padStart(2, "0")}]
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                      <span
                        style={{
                          color: "#e0e0e0",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      >
                        {post.title}
                      </span>
                      {post.date && (
                        <span style={{ color: "#555", fontSize: "0.75rem", flexShrink: 0 }}>
                          {post.date}
                        </span>
                      )}
                    </div>
                    <div style={{ marginTop: "0.4rem", display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
                      {post.authors && (
                        <span style={{ color: "#888", fontSize: "0.75rem" }}>
                          by{" "}
                          {post.authors.split(",").map((authorKey, aIdx) => {
                            const author = post.authorsMap?.[authorKey.trim()];
                            return (
                              <span key={authorKey}>
                                {aIdx > 0 && ", "}
                                <span style={{ color: "#00bfff" }}>
                                  {author ? author.name : authorKey.trim()}
                                </span>
                              </span>
                            );
                          })}
                        </span>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <span style={{ color: "#333", margin: "0 0.25rem" }}>|</span>
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                color: "#00ff41",
                                fontSize: "0.7rem",
                                border: "1px solid #1a3a1a",
                                padding: "0.1rem 0.4rem",
                                borderRadius: "2px",
                                background: "rgba(0, 255, 65, 0.05)",
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
          <span style={{ color: "#00ff41" }}>guest@sushrit</span>
          <span style={{ color: "#666" }}>:</span>
          <span style={{ color: "#00bfff" }}>~/blogs</span>
          <span style={{ color: "#666" }}> $ </span>
          <span className="terminal-cursor" style={{ color: "#b0b0b0" }}></span>
        </div>
      </div>
    </div>
  </>
);

export default BlogsPage;
