import branding from "@/assets/service-branding.jpg";
import social from "@/assets/service-social.jpg";
import print from "@/assets/service-print.jpg";
import packaging from "@/assets/service-packaging.jpg";
import type { Service } from "./site";

export const services: Service[] = [
  {
    slug: "logo-and-brand-identity",
    name: "Logo & Brand Identity",
    category: "Identity",
    summary:
      "A logo built from real sketching, plus the colours, type and file formats you need to use it everywhere.",
    description:
      "Most small businesses come with one problem: a logo that only works in one place. This service fixes that. We start with rough sketches, narrow down to one direction, then refine it into a mark that stays legible on a signboard, an invoice and a profile picture.",
    details: [
      "Hand-sketched concepts before anything goes on screen",
      "One chosen direction refined over multiple rounds",
      "Colour palette and typography pairing",
      "Delivered as vector AI/EPS/SVG plus PNG and JPG",
      "Light and dark, horizontal and stacked versions",
    ],
    image: branding,
    imageAlt: "Printed business card and letterhead from a brand identity project",
  },
  {
    slug: "social-media-design",
    name: "Social Media Design",
    category: "Digital",
    summary:
      "Post and story creatives sized correctly for Facebook and Instagram, built as a repeatable set.",
    description:
      "Rather than one-off graphics, this is a small kit: a handful of layouts you can refill with new offers, products or announcements each week, so the page keeps a consistent look without a designer on standby.",
    details: [
      "Feed posts, story frames and cover images",
      "Reusable layouts for offers, products and announcements",
      "Bengali and English text handled carefully",
      "Correct export sizes for each placement",
      "Editable source files on request",
    ],
    image: social,
    imageAlt: "Phone displaying a grid of social media post designs",
  },
  {
    slug: "print-and-marketing-design",
    name: "Print & Marketing Design",
    category: "Print",
    summary:
      "Flyers, posters, banners, menus and visiting cards prepared properly for the press.",
    description:
      "Print is unforgiving — the wrong bleed or colour mode turns a good design into a wasted run. Files here go out press-ready, with bleed, margins and CMYK set up so your printer has nothing to complain about.",
    details: [
      "Flyers, leaflets, posters and banners",
      "Menus, price lists and visiting cards",
      "CMYK, 300 DPI, bleed and safe margins included",
      "Print-ready PDF plus editable source",
      "Sizes adapted for local press standards",
    ],
    image: print,
    imageAlt: "Stack of freshly printed flyers on a bright studio table",
  },
  {
    slug: "packaging-and-label-design",
    name: "Packaging & Label Design",
    category: "Product",
    summary:
      "Labels and box artwork that stay readable on a shelf and survive the printing process.",
    description:
      "For food, cosmetics and small-batch products: label artwork laid out to the real die-line, with ingredient panels, weights and barcodes placed where they belong instead of squeezed in at the end.",
    details: [
      "Label, sticker, pouch and box artwork",
      "Layout to your supplier's die-line",
      "Ingredient, weight and barcode panels",
      "Mockups so you can preview before ordering",
      "Coordination with your printer's specs",
    ],
    image: packaging,
    imageAlt: "Jars and boxes showing minimal product label designs",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
