import { Open_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "@/styles/app.scss";
import Script from "next/script";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], // Puedes agregar más
  display: "swap",
});

export const metadata = {
  title: "Remates Ganaderos | Alfredo S. Mondino.",
  description:
    "Conectamos productores con compradores en los mejores remates ganaderos del país.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={openSans.className}>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js" />

      <Script
        src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"
        integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D"
        crossOrigin="anonymous"
        async
      />
      <body suppressHydrationWarning={true}>
        <Header />
        {children}
        {process.env.NODE_ENV === "production" && (
          <GoogleTagManager gtmId="GTM-TMTTM928" />
        )}
        <Footer />
      </body>
    </html>
  );
}
