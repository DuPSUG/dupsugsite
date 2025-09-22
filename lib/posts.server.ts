// lib/posts.server.ts
import "server-only";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { marked, Renderer } from "marked";

const POSTS_DIR = path.resolve(process.cwd(), "data", "blog");

// ---------- Types ----------
export type PostFrontmatter = {
  title: string;
  date: string;
  author?: string;
  tags?: string[];
  excerpt?: string;
  [k: string]: unknown;
};

export type Post = {
  slug: string;
  meta: PostFrontmatter;
  html: string;
  raw: string;
  title: string;
  date: string;
  author?: string;
  // legacy
  content?: string;
  body?: string;
};

// ---------- Utils ----------
const escapeHtml = (s: string) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// ---------- marked v14 renderer ----------
const renderer = new Renderer();

renderer.paragraph = function (t: any) {
  return `<p>${this.parser.parseInline(t.tokens) ?? ""}</p>`;
};

renderer.heading = function (t: any) {
  const txt = this.parser.parseInline(t.tokens) ?? "";
  return `<h${t.depth}>${txt}</h${t.depth}>`;
};

renderer.list = function (t: any) {
  const body = t.items
    .map((it: any) => `<li>${this.parser.parseInline(it.tokens) ?? ""}</li>`)
    .join("");
  const tag = t.ordered ? "ol" : "ul";
  return `<${tag}>${body}</${tag}>`;
};

renderer.blockquote = function (t: any) {
  return `<blockquote>${this.parser.parse(t.tokens ?? [])}</blockquote>`;
};

renderer.code = function (t: any) {
  const lang = t.lang ? ` class="language-${escapeHtml(t.lang)}"` : "";
  return `<pre><code${lang}>${escapeHtml(t.text ?? "")}</code></pre>`;
};

renderer.codespan = function (t: any) {
  return `<code>${escapeHtml(t.text ?? "")}</code>`;
};

renderer.strong = function (t: any) {
  return `<strong>${this.parser.parseInline(t.tokens) ?? ""}</strong>`;
};
renderer.em = function (t: any) {
  return `<em>${this.parser.parseInline(t.tokens) ?? ""}</em>`;
};

renderer.link = function (t: any) {
  const text = this.parser.parseInline(t.tokens) ?? "";
  const href = escapeHtml(t.href ?? "#");
  const title = t.title ? ` title="${escapeHtml(t.title)}"` : "";
  return `<a href="${href}"${title} rel="noopener noreferrer">${text}</a>`;
};

renderer.image = function (t: any) {
  const href = escapeHtml(t.href ?? "");
  const title = t.title ? ` title="${escapeHtml(t.title)}"` : "";
  const alt = ` alt="${escapeHtml(t.text ?? "")}"`;
  return `<img src="${href}"${alt}${title} />`;
};

marked.use({ renderer, gfm: true });

// ---------- Markdown -> HTML ----------
export async function renderMarkdown(md: string): Promise<string> {
  const html = await marked.parse(md);
  return typeof html === "string" ? html : "";
}

// ---------- Loaders ----------
export async function getPostBySlug(slug: string): Promise<Post> {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  const rawFile = await fs.readFile(file, "utf8");
  const { content, data } = matter(rawFile);

  const meta: PostFrontmatter = {
    title: String(data.title ?? slug),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    author: data.author ? String(data.author) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
    ...data,
  };

  const html = await renderMarkdown(content);

  // legacy fields for existing components
  // inside getPostBySlug, replace the current return with:
  return {
    slug,
    meta,
    html,
    raw: content,
    title: meta.title,
    date: meta.date,
    author: meta.author,
    // legacy aliases expected by existing components
    content: html,
    body: html,
  } as Post & { content: string; body: string };

}

export async function getAllPosts(): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(POSTS_DIR);
  } catch {
    return [];
  }

  const slugs = files.filter(f => f.endsWith(".md")).map(f => f.replace(/\.md$/, ""));
  const posts = await Promise.all(slugs.map(getPostBySlug));

  posts.sort((a, b) => {
    const da = Date.parse(a.meta?.date ?? a.date ?? "");
    const db = Date.parse(b.meta?.date ?? b.date ?? "");
    if (isNaN(da) && isNaN(db)) return a.slug.localeCompare(b.slug);
    if (isNaN(da)) return 1;
    if (isNaN(db)) return -1;
    return db - da;
  });

  return posts;
}

// ---------- Compatibility exports ----------
export const getBlogPosts = getAllPosts;
export const getPost = getPostBySlug;
