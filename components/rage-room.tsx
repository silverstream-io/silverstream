"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import OfficePhoto from "@/public/images/rage-room-office.jpg";

// The engine only downloads when someone starts smashing.
const RageLayer = dynamic(
  () => import("ragelayer/react").then((mod) => mod.RageLayer),
  { ssr: false },
);

export default function RageRoom() {
  const [open, setOpen] = useState(false);
  const [rounds, setRounds] = useState(0);

  return (
    <main className="relative flex grow flex-col">
      <div className="relative mx-auto mt-4 w-full max-w-6xl grow px-4 pb-8 sm:px-6">
        <div className="relative h-[calc(100vh-7rem)] min-h-[480px] overflow-hidden rounded-2xl">
          <Image
            src={OfficePhoto}
            alt="An empty open-plan office with desks, chairs, a potted plant, and a colorful mural"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover"
          />

          {/* Hidden while smashing so only the office gets destroyed */}
          {!open && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent px-6 pb-8 pt-24 text-center">
              <h1 className="mb-2 font-nacelle text-3xl font-semibold text-gray-100 md:text-4xl">
                The Rage Room
              </h1>
              <p className="mx-auto mb-6 max-w-xl text-indigo-100/80">
                {rounds === 0
                  ? "Is AI making you anxious? Go ahead, take it out on the office. Pick a tool and smash away. Everything goes back the way it was when you're done."
                  : "Feel better? The office is good as new."}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                >
                  {rounds === 0 ? "Start smashing" : "Smash it again"}
                </button>
                <Link
                  href="/"
                  className="btn relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                >
                  Back to Silverstream
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {open && (
        <RageLayer
          onClose={() => {
            setOpen(false);
            setRounds((n) => n + 1);
          }}
        />
      )}
    </main>
  );
}
