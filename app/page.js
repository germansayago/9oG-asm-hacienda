import Auctions from "./ui/Auctions";
import Contact from "./ui/Contact";
import Cta from "./ui/Cta";
import Footer from "./ui/Footer";
import Gallery from "./ui/Gallery";
import Header from "./ui/Header";
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
