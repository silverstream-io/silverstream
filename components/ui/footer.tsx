import Link from "next/link";
import Logo from "./logo";
import Image from "next/image";
import FooterIllustration from "@/public/images/footer-illustration.svg";
import { getNavLinks } from "@/lib/nav";

export default function Footer() {
  const links = getNavLinks();

  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer illustration */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <Image
            className="max-w-none"
            src={FooterIllustration}
            width={1076}
            height={378}
            alt="Footer illustration"
          />
        </div>
        <div className="flex flex-col gap-8 py-8 md:flex-row md:items-start md:justify-between md:py-12">
          <div className="max-w-sm">
            <div className="mb-3">
              <Logo />
            </div>
            <p className="text-sm text-indigo-200/65">
              Practical AI for small and midsize businesses.
            </p>
            <Link
              href="/rage-room"
              className="mt-4 inline-block text-xs text-indigo-200/40 transition hover:text-indigo-400"
            >
              Is AI making you anxious? Let off some steam in our rage room.
            </Link>
          </div>
          <div className="text-sm md:text-right">
            <ul className="mb-3 flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-indigo-200/65 transition hover:text-indigo-500"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-indigo-200/65">
              © {new Date().getFullYear()} Silverstream AI Solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
