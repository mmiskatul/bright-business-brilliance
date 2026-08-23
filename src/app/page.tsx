import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export default function HomePage() {
  const popularKits = products.slice(0, 2);
  const bestSellers = [
    products[1] || products[0],
    products[0],
    products[7] || products[2] || products[0],
  ];

  return (
    <div className="bg-white text-neutral-900">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="border-b border-neutral-200/90 bg-white">
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
          {/* Left Column: Hero Content */}
          <div>
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/90 bg-emerald-50/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Dhaka Apparel | Sports Manufacturing
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[52px] font-black tracking-tight text-neutral-900">
              Wear your passion in authentic master quality.
            </h1>

            {/* Subtext */}
            <p className="mt-5 max-w-lg text-xs sm:text-sm leading-relaxed text-neutral-600 font-normal">
              ASFA Design is a Dhaka-based sportswear and apparel manufacturing studio crafting
              premium matchday football jerseys, authentic club kits, national team shirts, and
              custom sublimation teamwear with precision embroidery and breathable fabrics.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 rounded-md bg-[#047857] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-[#065f46]"
              >
                Explore Jersey Catalog
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/custom"
                className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-800 transition-colors hover:bg-neutral-50 shadow-2xs"
              >
                Custom Teamwear Quote
              </Link>
            </div>

            {/* 3 Metrics Row */}
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-neutral-200 pt-6">
              <div>
                <dt className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  Fabric Grade
                </dt>
                <dd className="mt-1 font-display text-sm sm:text-base font-black text-neutral-900">
                  180 GSM Mesh
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  Custom Orders
                </dt>
                <dd className="mt-1 font-display text-sm sm:text-base font-black text-neutral-900">
                  Full Sublimation
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  Delivery
                </dt>
                <dd className="mt-1 font-display text-sm sm:text-base font-black text-neutral-900">
                  Nationwide 🇧🇩
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-xs">
              <img
                src="/assets/jersey-matchday.jpg"
                alt="ASFA Design premium sports apparel matchday jerseys on studio rack"
                className="w-full aspect-[4/3] object-cover"
              />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-white/95 backdrop-blur-md p-3.5 border border-neutral-200/90 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900">
                    2025/26 Season Kits Available
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Club, National, Retro & Custom Editions
                  </p>
                </div>
                <Link
                  href="/products"
                  className="rounded-md bg-neutral-900 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-black transition-colors"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 01 Popular Matchday Jerseys ───────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-neutral-200/90 bg-white">
        <div className="container-page">
          {/* Section Heading */}
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                01 — Popular Kits
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                Popular Matchday Jerseys
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 max-w-xl">
                Our highest-rated player edition and fan edition jerseys ready for immediate
                dispatch across Bangladesh.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Browse all jerseys ({products.length})
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 2-Column Product Cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {popularKits.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 02 Top Selection / Best Sellers ───────────────────── */}
      <section className="py-16 sm:py-20 bg-[#F8F9F7] border-b border-neutral-200/90">
        <div className="container-page">
          <div className="mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              02 — Top Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
              Best Sellers
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-500">
              Premium matchday kits, badges, and embroidered editions trusted across Bangladesh.
            </p>
          </div>

          {/* 3-Column Best Sellers Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((product, idx) => (
              <ProductCard key={product.slug + idx} product={product} featuredBadge="Best Seller" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
