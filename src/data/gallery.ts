export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: "Matchday Kits" | "Embroidery & Badges" | "Custom Teamwear" | "Fabric & Craft";
  tall?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/assets/asfa-falcon-front.png",
    alt: "ASFA Design custom Falcon Jr Miami splash jersey in sky blue and neon magenta pink",
    caption: "ASFA Original: Falcon Jr Miami Splash Custom Jersey",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-falcon-fullkit.png",
    alt: "ASFA Design Falcon Jr full kit matchday set with matching sublimated shorts",
    caption: "Full Matchday Set: Falcon Jr Jersey + Sublimated Shorts",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-falcon-side.png",
    alt: "ASFA Design Falcon Jr kit side profile with aerodynamic black flank stripes",
    caption: "Ergonomic Flank Detailing: Aerodynamic Side Contour Panels",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-argentina-messi-tribute-angle.png",
    alt: "ASFA Design custom Argentina 3-Star tribute polo jersey with golden wreath crest",
    caption: "ASFA Collector's Edition: Argentina 3-Star Tribute Polo",
    category: "Matchday Kits",
    tall: true,
  },
  {
    src: "/assets/asfa-argentina-messi-tribute-back.png",
    alt: "ASFA Design Argentina tribute jersey back with Lionel Messi World Cup trophy art",
    caption: "Tribute Back Art: Lionel Messi World Cup Trophy Illustration",
    category: "Matchday Kits",
    tall: true,
  },
  {
    src: "/assets/asfa-argentina-messi-tribute-detail.png",
    alt: "ASFA Design close up of Lionel Messi World Cup trophy artwork on back of polo",
    caption: "Artisanal Sublimation: Messi Kissing World Cup Trophy Inside Argentina Map",
    category: "Embroidery & Badges",
  },
  {
    src: "/assets/asfa-bangladesh-wave-front.png",
    alt: "ASFA Design custom Bangladesh national wave polo jersey in white and azure blue",
    caption: "ASFA National Concept: Bangladesh Tidal Wave Polo Jersey",
    category: "Matchday Kits",
    tall: true,
  },
  {
    src: "/assets/asfa-bangladesh-wave-back.png",
    alt: "ASFA Design Bangladesh national wave jersey back with MONIRUL 13 squad customization",
    caption: "Official Squad Back Customization: MONIRUL 13 (38 BN)",
    category: "Matchday Kits",
    tall: true,
  },
  {
    src: "/assets/asfa-kalma-front.png",
    alt: "ASFA Design custom Kalma United navy blue and white ornamental football jersey on hanger",
    caption: "ASFA Original: KALMA United Navy & White Matchday Kit",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-kalma-back.png",
    alt: "ASFA Design custom Kalma United jersey back with VENOMES 8 squad customization",
    caption: "Official Squad Back Customization: VENOMES 8 Baroque Edition",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-kalma-showroom.png",
    alt: "ASFA Design Kalma United jersey displayed on outdoor showroom mannequin",
    caption: "Showroom Presentation: KALMA United Matchday Kit",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-islamic-front.png",
    alt: "ASFA Design custom Islamic Studies National University kit front with tri-color speed lines",
    caption: "ASFA 3D Concept: Department of Islamic Studies Matchday Kit",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-islamic-back.png",
    alt: "ASFA Design custom Islamic Studies kit back with VENOMES 8 squad customization",
    caption: "Official Squad Back Customization: VENOMES 8 Arc Print",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-islamic-signature.png",
    alt: "ASFA Design cursive designer signature script detail on jersey hem",
    caption: "Artisanal Designer Signature: 'Asfa Design' Hem Script",
    category: "Embroidery & Badges",
  },
  {
    src: "/assets/asfa-eclipse-front.png",
    alt: "ASFA Design custom Eclipse FC matchday kit front with ECLIPSE typography",
    caption: "ASFA 3D Concept: ECLIPSE FC Stealth Matchday Kit",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-eclipse-back.png",
    alt: "ASFA Design custom Eclipse FC back with ADNAN 9 squad customization",
    caption: "Official Squad Back Customization: ADNAN 9 Arc Print",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-junior-fc.png",
    alt: "ASFA Design custom Junior FC black and gold matchday jersey on hanger with ASFA label",
    caption: "ASFA Original: Junior FC Black & Gold Matchday Kit",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-zenix-front.png",
    alt: "ASFA Design custom 3D concept jersey front with ZENIX Football Club crest",
    caption: "ASFA 3D Concept: ZENIX Football Club Signature Kit",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/asfa-zenix-back.png",
    alt: "ASFA Design custom jersey back with WAZIR 7 squad customization and ASFA backdrop logo",
    caption: "Official Squad Back Customization: WAZIR 7 Arc Print",
    category: "Custom Teamwear",
    tall: true,
  },
  {
    src: "/assets/jersey-hero.jpg",
    alt: "Premium collection of club and national jerseys on natural wood hangers",
    caption: "Seasonal Matchday Kit Collection Showcase",
    category: "Matchday Kits",
    tall: true,
  },
  {
    src: "/assets/jersey-madrid.jpg",
    alt: "Real Madrid pristine white home kit with gold accents on clean light background",
    caption: "Precision 3D Heat-Applied Crest & Metallic Gold Details",
    category: "Embroidery & Badges",
  },
  {
    src: "/assets/jersey-craft.jpg",
    alt: "Close-up of apparel manufacturing and precision stitching in Dhaka studio",
    caption: "Artisanal Apparel Tailoring & Industrial Stitching",
    category: "Fabric & Craft",
    tall: true,
  },
  {
    src: "/assets/jersey-argentina.jpg",
    alt: "Argentina national team jersey with embroidered 3-star badge",
    caption: "Albiceleste 3-Star World Champions Edition",
    category: "Matchday Kits",
  },
  {
    src: "/assets/jersey-fabric.jpg",
    alt: "Macro close-up of moisture-wicking breathable jacquard mesh fabric",
    caption: "AEROREADY Active Moisture-Wicking Jacquard Micro-Mesh",
    category: "Fabric & Craft",
  },
  {
    src: "/assets/jersey-retro.jpg",
    alt: "Classic 90s vintage football kit with retro polo collar",
    caption: "Faithful 1990s Classic Retro Kit Replicas",
    category: "Matchday Kits",
  },
  {
    src: "/assets/jersey-box.jpg",
    alt: "Luxury presentation gift box with folded football jersey and tags",
    caption: "Collector's Unboxing Presentation Packaging",
    category: "Fabric & Craft",
  },
];

export const galleryCategories = [
  "All",
  "Custom Teamwear",
  "Matchday Kits",
  "Embroidery & Badges",
  "Fabric & Craft",
] as const;
