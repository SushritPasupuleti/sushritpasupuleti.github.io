import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import ShareSheet from "../../src/components/ShareSheet";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeVideo from 'rehype-video';

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
}: {
  title: string;
  date: string;
  content: string;
  cover_img_url?: string;
  description?: string;
  slug?: string;
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {cover_img_url && <meta property="og:image" content={cover_img_url} />}
      <meta property="og:type" content="article" />
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
          ~/blogs/{slug}
        </span>
      </div>

      {/* Terminal body */}
      <div
        style={{
          background: "#0d0d0d",
          border: "1px solid #2a2a2a",
          borderRadius: "0 0 6px 6px",
          padding: "1.5rem",
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
          <Link href="/blogs" style={{ color: "#00bfff", textDecoration: "none" }}>blogs</Link>
          <span style={{ color: "#666" }}> / </span>
          <span style={{ color: "#e0e0e0" }}>{slug}</span>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px dashed #2a2a2a", margin: "1rem 0" }} />

        {/* Title block */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ color: "#555", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
            ┌─── article ─────────────────────────────────
          </div>
          <h1 style={{
            color: "#00ff41",
            fontSize: "1.4rem",
            fontWeight: 700,
            margin: "0 0 0.5rem 0",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.3,
          }}>
            {title}
          </h1>
          {date && (
            <div style={{ color: "#555", fontSize: "0.8rem" }}>
              <span style={{ color: "#888" }}>date:</span> {date}
            </div>
          )}
          <div style={{ color: "#555", fontSize: "0.75rem", marginTop: "0.5rem" }}>
            └──────────────────────────────────────────────
          </div>
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
          <ReactMarkdown rehypePlugins={[rehypeSanitize, rehypeVideo]}>{content}</ReactMarkdown>
        </div>

        {/* Bottom divider */}
        <div style={{ borderTop: "1px dashed #2a2a2a", margin: "2rem 0 1.5rem" }} />

        {/* Share CTA */}
        <ShareSheet
          url={typeof window !== "undefined" ? window.location.href : ""}
          title={title}
          variant="cta"
        />

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

export default BlogPost;
