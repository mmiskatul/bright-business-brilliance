import type { Metadata } from "next";
import "@/styles.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { business } from "@/data/site";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: `${business.name} — ${business.tagline}`,
    template: `%s | ${business.name}`,
  },
  description: business.intro,
  keywords: [
    "ASFA Design",
    "Jersey Dhaka",
    "Football Jersey Bangladesh",
    "Custom Sublimation Jersey",
    "Real Madrid jersey",
    "Argentina 3 star jersey",
    "Apparel manufacturing Dhaka",
    "Player edition jerseys",
    "Retro football kits",
  ],
  authors: [{ name: business.name }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: `${business.name} — ${business.tagline}`,
    description: business.intro,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="flex min-h-full flex-col bg-[#FFFFFF] text-neutral-800 antialiased font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster position="bottom-right" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
