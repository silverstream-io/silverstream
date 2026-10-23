import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// Posts go live at midnight in this time zone on their `date`.
const TIME_ZONE = "America/Los_Angeles";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  author?: string;
  canonical?: string;
  draft: boolean;
  scheduled: boolean;
};

export type Post = PostMeta & { html: string };

// Drafts and future-dated posts show up in `npm run dev` so you can preview
// them, but never in production.
const showUnpublished = process.env.NODE_ENV !== "production";

function today() {
  // en-CA formats as YYYY-MM-DD, matching the front matter dates
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(
    fs.readFileSync(path.join(POSTS_DIR, file), "utf8"),
  );

  if (!data.title || !data.date) {
    throw new Error(`content/blog/${file} needs a title and date`);
  }

  // gray-matter turns unquoted YAML dates into Date objects
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date);

  return {
    slug,
    title: String(data.title),
    date,
    description: data.description ? String(data.description) : "",
    author: data.author ? String(data.author) : undefined,
    canonical: data.canonical ? String(data.canonical) : undefined,
    draft: data.draft === true,
    scheduled: date > today(),
    html: marked.parse(content, { async: false }),
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map(readPost)
    .filter((post) => showUnpublished || (!post.draft && !post.scheduled))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
