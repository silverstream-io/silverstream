import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, formatDate } from "@/lib/blog";

type Props = { params: { slug: string } };

// Rendered per request so a scheduled post goes live on its date. A cached
// "not found" from before the date would otherwise stick around.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} - Silverstream AI Solutions`,
    description: post.description,
    // Points search engines at the original when a post was first published elsewhere
    alternates: post.canonical ? { canonical: post.canonical } : undefined,
  };
}

export default function BlogPost({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <section>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <article className="py-12 md:py-20">
          <Link
            href="/blog"
            className="mb-8 inline-flex text-sm text-indigo-200/65 transition hover:text-indigo-500"
          >
            <span className="mr-1 tracking-normal">&lt;-</span> All posts
          </Link>
          <header className="mb-10">
            <h1 className="mb-4 font-nacelle text-3xl font-semibold text-gray-200 md:text-4xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-indigo-200/65">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.author && (
                <>
                  <span className="text-gray-700">·</span>
                  <span>{post.author}</span>
                </>
              )}
              {post.draft ? (
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
                  Draft
                </span>
              ) : (
                post.scheduled && (
                  <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-xs text-sky-300">
                    Scheduled
                  </span>
                )
              )}
            </div>
          </header>
          <div
            className="prose prose-invert max-w-none prose-headings:font-nacelle prose-a:text-indigo-400 hover:prose-a:text-indigo-300"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <div className="mt-12 rounded-2xl border border-gray-800 p-6 text-center">
            <p className="mb-4 text-indigo-200/65">
              Wondering what AI could do for your business?
            </p>
            <Link
              href="/contact"
              className="btn-sm bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
            >
              Book a discovery call
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
