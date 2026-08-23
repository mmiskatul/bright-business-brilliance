export interface Offer {
  id: string;
  badge: string;
  title: string;
  discount: string;
  code: string;
  description: string;
  validUntil: string;
  terms: string;
}

export const offers: Offer[] = [
  {
    id: "off-1",
    badge: "Limited Matchday Deal",
    title: "Free Custom Name & Number Printing",
    discount: "SAVE ৳250",
    code: "FREEPRINT26",
    description:
      "Get authentic matchday name and number printing completely FREE with any Club or National Team kit purchase.",
    validUntil: "Ongoing this season",
    terms: "Valid on all online web orders. 1 customization per jersey.",
  },
  {
    id: "off-2",
    badge: "Squad & Team Package",
    title: "20% Off Squad Orders (10+ Jerseys)",
    discount: "20% OFF",
    code: "SQUAD20",
    description:
      "Equip your whole team with custom tournament kits or replica jerseys. Includes free design consultation and captain armband.",
    validUntil: "Limited Time",
    terms: "Minimum order of 10 jerseys. Free delivery anywhere in Bangladesh.",
  },
  {
    id: "off-3",
    badge: "Fan Duo Bundle",
    title: "Buy 2 Jerseys & Get Free Nationwide Delivery",
    discount: "FREE SHIPPING",
    code: "DUOSHIP",
    description:
      "Order any 2 jerseys (Club, National, or Retro) and enjoy 100% free home delivery across Dhaka and all 64 districts.",
    validUntil: "This Month Only",
    terms: "Applies automatically at online checkout.",
  },
];
