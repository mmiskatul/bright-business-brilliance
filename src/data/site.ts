/**
 * Single source of truth for business content.
 *
 * Sourced from the Facebook page facebook.com/graphicdesigner96Arman
 * (a freelance graphic design service run by Arman).
 *
 * Fields marked PLACEHOLDER could not be verified from the page and are
 * safe, clearly-labelled stand-ins — replace them with the real details.
 */

export const business = {
  name: "Arman Graphic Design",
  shortName: "Arman",
  tagline: "Freelance graphic design for small brands",
  intro:
    "Arman Graphic Design is a one-person studio making clear, confident visuals for small businesses — logos, brand identities, social media creatives and print-ready artwork, delivered file-by-file with revisions until it feels right.",
  facebookUrl: "https://www.facebook.com/graphicdesigner96Arman",
  facebookHandle: "graphicdesigner96Arman",
  // PLACEHOLDER — replace with the phone number shown on the Facebook page.
  phone: "+880 1XXX XXXXXX",
  phoneHref: "tel:+8801XXXXXXXXX",
  // PLACEHOLDER — replace with the studio's real email address.
  email: "hello@armangraphicdesign.com",
  // PLACEHOLDER — replace with the real service area or studio address.
  location: "Working remotely with clients worldwide",
  // PLACEHOLDER — replace with the working hours listed on the Facebook page.
  hours: [
    { days: "Saturday – Thursday", time: "10:00 – 19:00" },
    { days: "Friday", time: "Closed" },
  ],
  responseTime: "Messages are usually answered the same day.",
} as const;

export type Service = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  details: string[];
  /** PLACEHOLDER prices are omitted — quoted per project until confirmed. */
  price?: string;
  image: string;
  imageAlt: string;
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;
