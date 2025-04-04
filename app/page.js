import Auctions from "./ui/Auctions";
import Contact from "./ui/Contact";
import Cta from "./ui/Cta";
import Gallery from "./ui/Gallery";
import Hero from "./ui/Hero";

export default function Home() {
  return (
    <div className="main">
      <Hero />
      <Auctions />
      <Cta />
      <Gallery />
      <Contact />
    </div>
  );
}
