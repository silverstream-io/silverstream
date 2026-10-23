import Link from "next/link";
import Logo from "./logo";
import { getPosts } from "@/lib/blog";

export default function Header() {
  // The Blog link appears once there's at least one published post.
  const hasPosts = getPosts().length > 0;

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Navigation */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li className="max-sm:hidden">
              <Link
                href="/#how-it-works"
                className="px-2 text-sm text-indigo-200/65 transition hover:text-indigo-500"
              >
                How it works
              </Link>
            </li>
            <li className="max-sm:hidden">
              <Link
                href="/#why-silverstream"
                className="px-2 text-sm text-indigo-200/65 transition hover:text-indigo-500"
              >
                Why Silverstream
              </Link>
            </li>
            {hasPosts && (
              <li className="max-sm:hidden">
                <Link
                  href="/blog"
                  className="px-2 text-sm text-indigo-200/65 transition hover:text-indigo-500"
                >
                  Blog
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/contact"
                className="btn-sm bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
              >
                Book a call
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
