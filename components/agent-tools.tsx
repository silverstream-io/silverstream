"use client";

import { useEffect } from "react";
import {
  INDUSTRIES,
  PRICING,
  PROCESS,
  SERVICES,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  execute: (input: Record<string, string>) => Promise<{
    content: { type: "text"; text: string }[];
  }>;
};

type ModelContext = {
  registerTool: (tool: Tool) => unknown;
  unregisterTool?: (name: string) => void;
};

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
  interface Navigator {
    modelContext?: ModelContext;
  }
}

const text = (value: string) => ({ content: [{ type: "text" as const, text: value }] });

// Exposes a few site actions to browser AI agents through WebMCP
// (https://github.com/webmachinelearning/webmcp). Does nothing in browsers
// without it.
export default function AgentTools({ posts }: { posts: PostSummary[] }) {
  useEffect(() => {
    if (!document.modelContext && !navigator.modelContext) return;

    const tools: Tool[] = [
      {
        name: "get_services",
        description:
          "Describe what Silverstream AI Solutions offers small and midsize businesses: services, process, industries served, and pricing.",
        inputSchema: { type: "object", properties: {} },
        async execute() {
          return text(
            JSON.stringify({
              description: SITE_DESCRIPTION,
              services: SERVICES,
              process: PROCESS,
              industries: INDUSTRIES,
              pricing: PRICING.map(({ name, price, description }) => ({
                name,
                price,
                description,
              })),
              pricingPage: `${SITE_URL}/pricing`,
            }),
          );
        },
      },
      {
        name: "list_blog_posts",
        description:
          "List published Silverstream AI Solutions blog posts about putting AI to work in small businesses, newest first.",
        inputSchema: { type: "object", properties: {} },
        async execute() {
          return text(
            JSON.stringify(
              posts.map((post) => ({
                ...post,
                url: `${SITE_URL}/blog/${post.slug}`,
              })),
            ),
          );
        },
      },
      {
        name: "request_discovery_call",
        description:
          "Request a free discovery call with Silverstream AI Solutions. Only call this after the user has confirmed they want to be contacted and has provided their own details.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "The user's full name" },
            company: { type: "string", description: "The user's company name" },
            email: { type: "string", description: "The user's email address" },
            phone: { type: "string", description: "Optional phone number" },
            message: {
              type: "string",
              description: "What's taking up too much of the team's time",
            },
          },
          required: ["name", "company", "email"],
        },
        async execute(input) {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
          });
          return text(
            response.ok
              ? "Request sent. Silverstream AI Solutions will reach out soon to schedule the discovery call."
              : "The request could not be sent. Please try again later or use the form at " +
                  `${SITE_URL}/contact.`,
          );
        },
      },
    ];

    for (const tool of tools) {
      try {
        // document.modelContext is the current proposal; navigator.modelContext
        // is kept as a fallback for earlier implementations.
        if (document.modelContext) {
          document.modelContext.registerTool(tool);
        } else {
          navigator.modelContext?.registerTool(tool);
        }
      } catch (error) {
        console.warn(`Could not register agent tool ${tool.name}`, error);
      }
    }

    return () => {
      const context = document.modelContext ?? navigator.modelContext;
      tools.forEach((tool) => context?.unregisterTool?.(tool.name));
    };
  }, [posts]);

  return null;
}
