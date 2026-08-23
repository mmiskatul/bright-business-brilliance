"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Wind, ShieldCheck, Droplets, Sparkles } from "lucide-react";
import { products } from "@/data/products";

const CATEGORY_TABS = [
  { id: "club-kits", label: "CLUB KITS", category: "Custom Teamwear" },
  { id: "national-teams", label: "NATIONAL TEAMS", category: "National Kits" },
  { id: "retro-classics", label: "RETRO CLASSICS", category: "Retro Classics" },
  { id: "training-gear", label: "TRAINING GEAR", category: "Player Edition" },
];

export default function KitsPage() {
  const [activeTab, setActiveTab] = useState("club-kits");

  // Default featured 3 kits matching the mockup
  const featuredKits = [
    {
      id: "apex-pro-blackout",
      name: "APEX PRO BLACKOUT KIT",
      desc: "Ultra-lightweight mesh for maximum breathability.",
      badge: "NEW",
      image: "/assets/asfa-zenix-front.png",
      slug: "asfa-zenix-fc-signature-kit",
      isPrimary: true,
    },
    {
      id: "velocity-green-away",
      name: "VELOCITY GREEN AWAY",
      desc: "Engineered for speed with aerodynamic fit.",
      badge: null,
      image: "/assets/asfa-falcon-fullkit.png",
      slug: "asfa-falcon-jr-miami-splash-kit",
      isPrimary: false,
    },
    {
      id: "heritage-white-classic",
      name: "HERITAGE WHITE CLASSIC",
      desc: "Timeless design meets modern performance materials.",
      badge: null,
      image: "/assets/asfa-argentina-messi-tribute-angle.png",
      slug: "asfa-argentina-messi-tribute-champions-polo",
      isPrimary: false,
    },
  ];

  // Dynamic filtered products for other tabs
  const currentCategory = CATEGORY_TABS.find((t) => t.id === activeTab)?.category;
  const filteredProducts =
    activeTab === "club-kits"
      ? featuredKits
      : products
          .filter((p) => p.category === currentCategory)
          .slice(0, 3)
          .map((p, idx) => ({
            id: p.slug,
            name: p.name.replace("ASFA ", "").toUpperCase(),
            desc: p.summary,
            badge: idx === 0 ? "POPULAR" : null,
            image: p.image,
            slug: p.slug,
            isPrimary: idx === 0,
          }));

  const displayKits = filteredProducts.length > 0 ? filteredProducts : featuredKits;

  return (
    <div className="bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* ─── SECTION 1: HEADER & COLLECTION SHOWCASE ───────────── */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-neutral-100">
        <div className="container-page max-w-6xl">
          {/* Header Title & Subtitle */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight uppercase">
              THE KIT ROOM: 2024/25 COLLECTIONS
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto leading-relaxed">
              Engineered for peak performance. Discover our latest lineup of pro-grade jerseys,
              combining advanced fabric technology with uncompromising aesthetic design.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-10 border-b border-neutral-200 pb-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-transparent text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Kit Cards Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {displayKits.map((kit) => (
              <div
                key={kit.id}
                className="flex flex-col justify-between border border-neutral-200 bg-white p-5 transition-all hover:border-neutral-300 hover:shadow-2xs"
              >
                <div>
                  {/* Image Container with Badge */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#F5F6F5] p-4 flex items-center justify-center">
                    {kit.badge && (
                      <span className="absolute top-2.5 left-2.5 z-10 rounded bg-[#E64A19] px-2 py-0.5 text-[9px] font-mono font-black uppercase text-white shadow-2xs">
                        {kit.badge}
                      </span>
                    )}
                    <img
                      src={kit.image}
                      alt={kit.name}
                      className="h-full w-full object-contain object-center transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="mt-4 text-sm font-black text-neutral-900 tracking-tight uppercase">
                    {kit.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed min-h-[36px]">
                    {kit.desc}
                  </p>
                </div>

                {/* Shop Button */}
                <div className="mt-6 pt-2">
                  <Link
                    href={`/products/${kit.slug}`}
                    className={`w-full inline-flex items-center justify-center py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${
                      kit.isPrimary
                        ? "bg-black text-white hover:bg-neutral-800"
                        : "border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50"
                    }`}
                  >
                    SHOP COLLECTION
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: KIT OF THE MONTH (ECLIPSE SERIES) ──────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#EFEFEF]">
        <div className="container-page max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left: Content */}
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-700 block mb-3">
                KIT OF THE MONTH
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 leading-[1.1] tracking-tight uppercase">
                THE ECLIPSE SERIES:
                <br />
                DOMINANCE REDEFINED
              </h2>

              <p className="mt-5 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal max-w-lg">
                Our most advanced kit to date. The Eclipse Series features proprietary
                moisture-wicking technology integrated into a stealthy, high-contrast monochrome
                design. Built for athletes who dictate the pace of the game.
              </p>

              <div className="mt-8">
                <Link
                  href="/products/asfa-eclipse-fc-matchday-kit"
                  className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-7 shadow-2xs transition-colors"
                >
                  <span>EXPLORE ECLIPSE</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: Studio Product Flatlay Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-neutral-300 bg-white shadow-soft flex items-center justify-center p-6 sm:p-10">
              <img
                src="/assets/asfa-eclipse-front.png"
                alt="The Eclipse Series Custom Pro Matchday Kit"
                className="h-full w-full object-contain object-center drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: PRO-GRADE ENGINEERING ──────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-neutral-100">
        <div className="container-page max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight uppercase">
              PRO-GRADE ENGINEERING
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Every kit is constructed to withstand the rigors of elite competition.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {/* Card 1: 180 GSM MESH */}
            <div className="border border-neutral-200 bg-white p-6 sm:p-8 text-center flex flex-col items-center justify-between transition-all hover:border-neutral-300 hover:shadow-2xs">
              <div className="flex flex-col items-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-5">
                  <Wind className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">
                  180 GSM MESH
                </h3>
              </div>
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed font-normal">
                Optimal weight for durability without sacrificing critical breathability during peak
                exertion.
              </p>
            </div>

            {/* Card 2: ANTI-PEEL TECH */}
            <div className="border border-neutral-200 bg-white p-6 sm:p-8 text-center flex flex-col items-center justify-between transition-all hover:border-neutral-300 hover:shadow-2xs">
              <div className="flex flex-col items-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-5">
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">
                  ANTI-PEEL TECH
                </h3>
              </div>
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed font-normal">
                Advanced sublimation and heat-press techniques ensure crests and sponsors survive
                the season.
              </p>
            </div>

            {/* Card 3: HYDRO-REPEL */}
            <div className="border border-neutral-200 bg-white p-6 sm:p-8 text-center flex flex-col items-center justify-between transition-all hover:border-neutral-300 hover:shadow-2xs">
              <div className="flex flex-col items-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-5">
                  <Droplets className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">
                  HYDRO-REPEL
                </h3>
              </div>
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed font-normal">
                Treated fibers actively wick moisture away from the skin, keeping you light and
                fast.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
