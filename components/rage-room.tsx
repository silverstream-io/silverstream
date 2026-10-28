"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// The engine only downloads when someone opens the rage room, so regular
// visits don't pay for it.
const RageLayer = dynamic(
  () => import("ragelayer/react").then((mod) => mod.RageLayer),
  { ssr: false },
);

// A playful easter egg: lets visitors "destroy" a snapshot of the page.
export default function RageRoom() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left text-xs text-indigo-200/40 transition hover:text-indigo-400"
      >
        Is AI making you anxious? Let off some steam in our rage room.
      </button>
      {open && <RageLayer onClose={() => setOpen(false)} />}
    </>
  );
}
