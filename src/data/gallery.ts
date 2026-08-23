import typography from "@/assets/gallery-typography.jpg";
import brochure from "@/assets/gallery-brochure.jpg";
import merch from "@/assets/gallery-merch.jpg";
import signage from "@/assets/gallery-signage.jpg";
import colors from "@/assets/gallery-colors.jpg";
import sketches from "@/assets/about-sketches.jpg";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: "Identity" | "Print" | "Product" | "Process";
  tall?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    src: typography,
    alt: "Typography specimen posters pinned on a bright studio wall",
    caption: "Type specimen sheets for an identity project",
    category: "Identity",
    tall: true,
  },
  {
    src: brochure,
    alt: "Printed menu cards laid on off-white linen",
    caption: "Menu cards, printed and folded",
    category: "Print",
  },
  {
    src: colors,
    alt: "Colour swatch fans spread on white paper",
    caption: "Choosing a palette before anything is finalised",
    category: "Process",
    tall: true,
  },
  {
    src: merch,
    alt: "White t-shirt and canvas tote with a small printed logo",
    caption: "Logo applied to apparel and packaging",
    category: "Product",
  },
  {
    src: sketches,
    alt: "Hand-drawn logo concept sketches with markers",
    caption: "Every mark starts on paper",
    category: "Process",
  },
  {
    src: signage,
    alt: "Minimal shopfront wall in bright daylight",
    caption: "Signage study for a storefront",
    category: "Identity",
  },
];

export const galleryCategories = ["All", "Identity", "Print", "Product", "Process"] as const;
