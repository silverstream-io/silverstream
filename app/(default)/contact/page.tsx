"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const thanksRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") {
      window.scrollTo({ top: 0 });
      thanksRef.current?.focus();
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 text-center md:py-20">
            <h1
              ref={thanksRef}
              tabIndex={-1}
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent focus:outline-none md:text-4xl"
            >
              Thanks, we'll be in touch soon
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-200/65">
              We've received your note and will reach out to set up your
              discovery call. In the meantime, our{" "}
              <Link
                href="/blog/where-does-your-week-actually-go"
                className="text-indigo-400 underline-offset-4 transition hover:text-indigo-300 hover:underline"
              >
                15-minute time audit
              </Link>{" "}
              is a great way to prepare.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="btn relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Let's talk about your business
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-200/65">
              Tell us a little about what's slowing your team down. We'll
              follow up to set up a free discovery call.
            </p>
          </div>
          {/* Contact form */}
          <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="name"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input w-full"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="company"
                >
                  Company name <span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="form-input w-full"
                  placeholder="Your company name"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="email"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="Your email address"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-input w-full"
                  placeholder="Your phone number (optional)"
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="message"
                >
                  What's taking up too much of your team's time?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="form-textarea w-full"
                  placeholder="Inventory, invoicing, scheduling, paperwork... anything goes"
                />
              </div>
            </div>
            {status === "error" && (
              <p className="mt-6 text-sm text-red-400" role="alert">
                Something went wrong sending your message. Please try again in
                a moment.
              </p>
            )}
            <div className="mt-6">
              <button
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] disabled:cursor-wait disabled:opacity-60"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Request a discovery call"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}