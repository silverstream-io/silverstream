import Link from "next/link";
import { getPosts, formatDate } from "@/lib/blog";

export const metadata = {
  title: "Blog - Silverstream AI Solutions",
  description:
    "Practical notes on putting AI to work in small and midsize businesses.",
};

export default function Blog() {
  const posts = getPosts();

  return (
    <section>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Blog
            </h1>
            <p className="text-lg text-indigo-200/65">
              Practical notes on putting AI to work in small and midsize
              businesses.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-indigo-200/65">
              The first posts are on their way. Check back soon.
            </p>
          ) : (
            <ul className="space-y-6">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative block rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm text-indigo-200/65">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
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
                    <h2 className="mb-2 font-nacelle text-xl font-semibold text-gray-200 transition group-hover:text-indigo-300">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-indigo-200/65">{post.description}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
