import Auctions from "./ui/Auctions";
import Contact from "./ui/Contact";
import Cta from "./ui/Cta";
import About from "./ui/About";
import Gallery from "./ui/Gallery";
import Hero from "./ui/Hero";

export default function Home() {
  return (
    <div className="main">
      <Hero />
      <Auctions />
      <Cta />
      <About />
      <Gallery />
      <Contact />
    </div>
  );
}
