export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  product: string;
  comment: string;
  avatarText: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Tanvir Ahmed",
    location: "Dhanmondi, Dhaka",
    rating: 5,
    date: "February 2026",
    product: "Real Madrid Home Kit (Player Edition)",
    comment:
      "The fabric quality is unreal! I've bought jerseys from many local shops, but ASFA Design's heat-pressed silicone badges and breathable micro-mesh are true master copy grade. Delivered in 24 hours inside Dhaka.",
    avatarText: "TA",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Shahriar Hossain",
    location: "Uttara, Dhaka",
    rating: 5,
    date: "January 2026",
    product: "Argentina 3-Star World Champions Home",
    comment:
      "Ordered customized Messi 10 printing with World Cup badges. The printing is crisp with sharp edges and didn't peel after multiple washes. Excellent direct customer service and fast delivery!",
    avatarText: "SH",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Mahir Faysal (Captain, Dhaka Falcons FC)",
    location: "Gulshan, Dhaka",
    rating: 5,
    date: "February 2026",
    product: "Custom Full Sublimation Teamwear Kit",
    comment:
      "We ordered 18 custom jerseys for our corporate tournament. ASFA helped us with the 3D mockups for free and delivered the entire batch within 5 days. The fit and sweat absorption during 90-minute matches was top-notch.",
    avatarText: "MF",
    verified: true,
  },
  {
    id: "rev-4",
    name: "Rifat Karim",
    location: "Chittagong",
    rating: 5,
    date: "December 2025",
    product: "AC Milan 1996 Retro Classic Kit",
    comment:
      "As a vintage kit collector, I was amazed by the heavyweight fabric and vintage button collar details. Finding true 90s aesthetic replicas with this level of finishing in Bangladesh is rare.",
    avatarText: "RK",
    verified: true,
  },
  {
    id: "rev-5",
    name: "Zubair Rahman",
    location: "Sylhet",
    rating: 5,
    date: "February 2026",
    product: "Arsenal Third Kit",
    comment:
      "Super light fabric, accurate sizing chart, and neat packaging with tag protectors. Highly recommend ASFA Design to any football fan.",
    avatarText: "ZR",
    verified: true,
  },
];
