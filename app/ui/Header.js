import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <Image
          src="/images/logo-alfredosmondino.svg"
          width={300}
          height={100}
          alt="logo alfredo s mondino"
          priority
        />
      </Link>
    </header>
  );
}
