import { pageMetadata } from "@/lib/site";
import RageRoom from "@/components/rage-room";

export const metadata = {
  ...pageMetadata({
    title: "The Rage Room - Silverstream AI Solutions",
    description:
      "Is AI making you anxious? Let off some steam by smashing a virtual office.",
    path: "/rage-room",
  }),
  // A playful extra, so keep it out of search results
  robots: { index: false },
};

export default function RageRoomPage() {
  return <RageRoom />;
}
