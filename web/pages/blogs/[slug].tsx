import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Card, Text } from "@nextui-org/react";
import Head from "next/head";
import Breadcrumbs from "../../src/components/Breadcrumbs";
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
    },
  };
};

const BlogPost = ({
  title,
  date,
  content,
  cover_img_url,
  description,
}: {
  title: string;
  date: string;
  content: string;
  cover_img_url?: string;
  description?: string;
}) => (
    <Card
      css={{
        maxWidth: "100vw",
        width: "100%",
        mw: "800px",
        margin: "2rem auto",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "$lg",
        background: "$background",
        color: "$text",
        overflowX: "hidden",
      }}
    >
      <Card.Body>
        <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Blogs", href: "/blogs" }, { label: title, href: "", active: true }]}
          />
          <Text h1 weight="bold" css={{ mb: "0.5rem" }}>
            {title}
          </Text>
          <ShareSheet
            url={typeof window !== "undefined" ? window.location.href : ""}
            title={title}
            variant="icons"
          />
          <Text size={14} css={{ color: "$accents7", mb: "2rem" }}>
            {date}
          </Text>
          <div style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
            <ReactMarkdown rehypePlugins={[rehypeSanitize, rehypeVideo]}>{content}</ReactMarkdown>
          </div>
          <ShareSheet
            url={typeof window !== "undefined" ? window.location.href : ""}
            title={title}
            variant="cta"
          />
        </div>
      </Card.Body>
    </Card>
);

export default BlogPost;
