/**
 * Single source of truth for ASFA Design business information.
 * Reference: https://www.facebook.com/share/1Ly153eayn/ (A S F A Design | Dhaka)
 */

export const business = {
  name: "ASFA Design",
  shortName: "ASFA",
  tagline: "Finest Custom Sports Apparel & Premium Matchday Jerseys",
  intro:
    "ASFA Design is a Dhaka-based sportswear and apparel manufacturing studio crafting premium matchday football jerseys, authentic club kits, national team shirts, and custom sublimation teamwear with precision embroidery and breathable fabrics.",
  facebookUrl: "https://www.facebook.com/graphicdesigner96Arman",
  facebookHandle: "asfadesignbd",
  phone: "+880 1711-234567",
  phoneHref: "tel:+8801711234567",
  whatsappUrl:
    "https://wa.me/8801711234567?text=Hi%20ASFA%20Design,%20I%20am%20interested%20in%20ordering%20a%20jersey",
  email: "orders@asfadesign.com",
  location: "House 14, Road 7, Dhanmondi, Dhaka, Bangladesh",
  shipping: "Nationwide delivery across Bangladesh within 48–72 hours",
  hours: [
    { days: "Saturday – Thursday", time: "10:00 – 21:00" },
    { days: "Friday", time: "15:00 – 21:00" },
  ],
  responseTime: "Inquiries & WhatsApp orders are answered within minutes.",
} as const;

export interface Product {
  slug: string;
  name: string;
  category: "Club Kits" | "National Kits" | "Retro Classics" | "Custom Teamwear" | "Player Edition";
  price: string;
  originalPrice?: string;
  badge?: string;
  summary: string;
  description: string;
  details: string[];
  fabric: string;
  sizes: string[];
  image: string;
  backImage?: string;
  galleryImages?: { label: string; url: string }[];
  imageAlt: string;
  featured?: boolean;
  inStock?: boolean;
}

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Jerseys & Kits" },
  { to: "/offers", label: "Offers" },
  { to: "/gallery", label: "Matchday Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact & Order" },
] as const;
