"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

// Add client quotes here. The section stays hidden until at least one exists,
// and cycles through them automatically when there are several.
const testimonials: Testimonial[] = [];

const ROTATE_MS = 8000;

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % testimonials.length),
      ROTATE_MS,
    );
    return () => clearInterval(timer);
  }, [active]);

  if (testimonials.length === 0) return null;

  const current = testimonials[active];

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1] md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-3 pb-6 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                From our clients
              </span>
            </div>
            <figure key={active} className="animate-[fade-in_600ms_ease-out]">
              <blockquote className="mb-6 font-nacelle text-xl text-gray-200 before:content-['\201C'] after:content-['\201D'] md:text-2xl">
                {current.quote}
              </blockquote>
              <figcaption className="text-sm text-indigo-200/65">
                <span className="font-medium text-gray-200">{current.name}</span>
                <span className="text-gray-700"> · </span>
                {current.role}, {current.company}
              </figcaption>
            </figure>
            {testimonials.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {testimonials.map((t, index) => (
                  <button
                    key={t.name}
                    className={`h-2 w-2 rounded-full transition-colors ${index === active ? "bg-indigo-500" : "bg-gray-700 hover:bg-gray-600"}`}
                    aria-label={`Show testimonial from ${t.name}`}
                    aria-pressed={index === active}
                    onClick={() => setActive(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
