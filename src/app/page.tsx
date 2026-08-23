import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { business } from "@/data/site";
import { products } from "@/data/products";

export default function HomePage() {
  const popularProducts = products.slice(0, 2);
  const bestSellers = [products[1] || products[0], products[0], products[2] || products[0]];

  return (
    <div className="bg-white">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="border-b border-neutral-200/80 bg-white">
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
          {/* Left Column */}
          <div>
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-50/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Dhaka Apparel | Sports Manufacturing
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[54px] font-black tracking-tight text-neutral-900">
              Wear your passion in authentic master quality.
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-neutral-600">
              ASFA Design is a Dhaka-based sportswear and apparel manufacturing studio crafting
              premium matchday football jerseys, authentic club kits, national team shirts, and
              custom sublimation teamwear with precision embroidery and breathable fabrics.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-emerald-900"
              >
                Explore Jersey Catalog
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                Custom Teamwear Quote
              </Link>
            </div>

            {/* Metrics Row */}
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-neutral-200 pt-6">
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

          {/* Right Column: Hero Image with Floating Banner */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-sm">
              <img
                src="/assets/jersey-matchday.jpg"
                alt="ASFA Design premium matchday football kits on display rack"
                className="w-full aspect-[4/3] object-cover"
              />

              {/* Floating Bottom Banner */}
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
      <section className="py-16 sm:py-20 border-b border-neutral-200/80 bg-white">
        <div className="container-page">
          {/* Section Header */}
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

          {/* 2-Column Featured Product Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {popularProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-sm"
              >
                {/* Product Image Box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F5F4] flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur px-2.5 py-0.5 text-[11px] font-bold text-neutral-800 shadow-xs border border-neutral-200">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white shadow-xs">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] font-semibold text-neutral-400 line-through bg-white/90 px-1 py-0.5 rounded shadow-xs">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-neutral-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-500 line-clamp-2">
                    {product.summary}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                    <div className="flex gap-1">
                      {product.sizes.map((s) => (
                        <span
                          key={s}
                          className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                      View Details
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 02 Best Sellers (Gray Tone Section) ───────────────── */}
      <section className="py-16 sm:py-20 bg-[#F8F9F7] border-b border-neutral-200/80">
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
              <Link
                key={product.slug + idx}
                href={`/products/${product.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-sm"
              >
                {/* Product Image Box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0F1F0] flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-neutral-900 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
                    Best Seller
                  </span>
                  <span className="absolute top-3 right-3 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white shadow-xs">
                    {product.price}
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-neutral-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-500 line-clamp-2">
                    {product.summary}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                      View Details
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
