import { getPosts } from "@/lib/blog";

export type NavLink = { label: string; href: string };

// Shared by the header menu and the footer. The Blog link appears once
// there's at least one published post.
export function getNavLinks(): NavLink[] {
  return [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Why Silverstream", href: "/#why-silverstream" },
    ...(getPosts().length > 0 ? [{ label: "Blog", href: "/blog" }] : []),
    { label: "Contact", href: "/contact" },
  ];
}
