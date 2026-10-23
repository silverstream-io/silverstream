import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo-white-cropped.svg";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Silverstream home">
      <Image src={logo} alt="Silverstream" width={32} height={32} />
    </Link>
  );
}
