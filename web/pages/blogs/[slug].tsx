import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Card, Text } from "@nextui-org/react";
import Head from "next/head";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import ReactMarkdown from "react-markdown";

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDir = path.join(process.cwd(), "public", "blogs");
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));
  const paths = files.map(filename => ({
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

const BlogPost = ({ title, date, content, cover_img_url, description }: { title: string; date: string; content: string; cover_img_url?: string; description?: string }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {cover_img_url && <meta property="og:image" content={cover_img_url} />}
      <meta property="og:type" content="article" />
    </Head>
    <Card css={{
      mw: "800px",
      margin: "2rem auto",
      padding: "1rem",
      borderRadius: "1rem",
      boxShadow: "$lg",
      background: "$background",
      color: "$text"
    }}>
      <Card.Body>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blogs", href: "/blogs" }, { label: title, href: "", active: true }]} />
        <Text h1 weight="bold" css={{ mb: "0.5rem" }}>{title}</Text>
        <Text size={14} css={{ color: "$accents7", mb: "2rem" }}>{date}</Text>
        <ReactMarkdown>{content}</ReactMarkdown>
      </Card.Body>
    </Card>
  </>
);

export default BlogPost;
