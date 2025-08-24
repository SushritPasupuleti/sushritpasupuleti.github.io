import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Card, Text, Grid, Badge } from "@nextui-org/react";
import Image from "next/image";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import yaml from "js-yaml";
// @ts-ignore
import fsExtra from "fs";

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
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));
  const authorsYmlPath = path.join(postsDir, "authors.yml");
  let authorsMap = {};
  if (fsExtra.existsSync(authorsYmlPath)) {
    const authorsYml = fsExtra.readFileSync(authorsYmlPath, "utf8");
    authorsMap = yaml.load(authorsYml);
  }
  const posts = files.map(filename => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return {
      slug: data.slug || filename.replace(/\.md$/, ""),
      title: data.title || filename,
      authors: data.authors || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      date: data.date || "",
      cover_img_url: data.cover_img_url || "",
      authorsMap,
    };
  });
  return { props: { posts } };
};

const BlogsPage = ({ posts }: { posts: (BlogMeta & { authorsMap?: any })[] }) => (
  <Card css={{
    mw: "900px",
    margin: "2rem auto",
    padding: "1rem",
    borderRadius: "1rem",
    boxShadow: "$lg",
    background: "$background",
    color: "$text"
  }}>
    <Card.Body>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blogs", href: "/blogs", active: true }]} />
      <Text h1 weight="bold" css={{ textGradient: "45deg, $purple600 -20%, $blue600 100%" }}>{`Sushrit's Blogs`}</Text>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
        {posts.map(post => (
          <Card key={post.slug} isHoverable css={{ p: "1.5rem", minHeight: "180px", width: "100%" }}>
            {post.cover_img_url && (
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", borderRadius: "0.75rem", marginBottom: "1rem", background: "$backgroundContrast" }}>
                <Image
                  src={post.cover_img_url}
                  alt={post.title + " cover"}
                  fill
                  style={{ objectFit: "cover", borderRadius: "0.75rem" }}
                  sizes="100vw"
                  priority={false}
                />
              </div>
            )}
            <Card.Body>
              <Link href={`/blogs/${post.slug}`} style={{ textDecoration: "none" }}>
                <Text h3 weight="bold" css={{ color: "$primary" }}>{post.title}</Text>
              </Link>
              {/* <Text size={14} css={{ mt: "0.5rem", color: "$accents7" }}>
                <strong>Slug:</strong> {post.slug}
              </Text> */}
              <Text size={14} css={{ color: "$accents7" }}>
                <strong>Authors:</strong> {post.authors && post.authors.split(',').map((authorKey, idx) => {
                  const author = post.authorsMap?.[authorKey.trim()];
                  return author ? (
                    <Link key={authorKey} href={author.url} target="_blank" style={{ color: "$primary", marginRight: 6 }}>
                      {author.name}
                    </Link>
                  ) : (
                    <span key={authorKey} style={{ marginRight: 6 }}>{authorKey.trim()}</span>
                  );
                })}
              </Text>
              <div style={{ marginTop: "0.5rem" }}>
                {/* <Text size={14} css={{ color: "$accents7" }}><strong>Tags:</strong></Text> */}
                {post.tags && post.tags.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
                    {post.tags.map(tag => (
                      <Badge key={tag} color="primary" variant="bordered" css={{ mr: "0.25rem" }}>{tag}</Badge>
                    ))}
                  </div>
                ) : (
                  <Badge color="default" variant="bordered">None</Badge>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Card.Body>
  </Card>
);

export default BlogsPage;
