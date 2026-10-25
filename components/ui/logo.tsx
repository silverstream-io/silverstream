import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo-white-cropped.svg";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Silverstream AI Solutions home">
      <Image src={logo} alt="Silverstream AI Solutions" width={32} height={32} />
    </Link>
  );
}
