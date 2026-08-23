"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";

const categories = ["All", "Club Kits", "National Kits", "Retro Classics", "Custom Teamwear"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white text-neutral-900">
      {/* ─── Top Header Section ──────────────────────────────────── */}
      <section className="border-b border-neutral-200/90 bg-white py-12 sm:py-14">
        <div className="container-page max-w-5xl">
          {/* Official Collection Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/90 bg-emerald-50/90 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 mb-4">
            Official Collection • 2024/25
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-neutral-900 leading-tight">
            Football Jerseys & Custom Teamwear
          </h1>

          {/* Subtitle */}
          <p className="mt-3.5 max-w-3xl text-xs sm:text-sm leading-relaxed text-neutral-600">
            Explore authentic player editions, fan jerseys, iconic retro classics, and custom
            full-sublimation kits with premium fabric engineering and complimentary player name &
            number heat-pressing.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="mt-8 flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by club, player, or kit type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xs border border-neutral-300 bg-white pl-9 pr-4 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none shadow-2xs font-mono"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-mono transition-colors rounded-xs ${
                      isActive
                        ? "bg-black text-white font-bold"
                        : "bg-neutral-100 border border-neutral-200 text-neutral-700 hover:bg-neutral-200 font-medium"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Product Grid Section ────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-page max-w-5xl">
          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center max-w-md mx-auto">
              <ShoppingBag className="mx-auto h-10 w-10 text-neutral-400 mb-3" />
              <h3 className="text-base font-bold text-neutral-900 font-mono">No jerseys found</h3>
              <p className="mt-1 text-xs text-neutral-500 font-mono">
                Try adjusting your search query or reset category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-xs font-bold text-emerald-700 underline font-mono"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group flex flex-col overflow-hidden border border-neutral-300 bg-white transition-colors duration-200 hover:border-neutral-400"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFEFEF] flex items-center justify-center p-3">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 border border-neutral-300 bg-white/95 px-2 py-0.5 text-[10px] font-mono font-bold text-neutral-800 shadow-2xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                      {product.category}
                    </span>

                    <h2 className="mt-1 text-sm sm:text-base font-bold text-neutral-900 leading-snug group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h2>

                    <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600 line-clamp-2">
                      {product.summary}
                    </p>

                    {/* Sizes Row */}
                    <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-[11px] font-mono">
                      <span className="text-neutral-500">Sizes Available:</span>
                      <div className="flex gap-1">
                        {["S", "M", "L", "XL", "XXL"].map((size) => {
                          const isAvailable = product.sizes.includes(size);
                          const isFeatured = size === "L" || size === "M";
                          return (
                            <span
                              key={size}
                              className={`flex h-5 w-5 items-center justify-center border text-[9px] font-bold ${
                                isAvailable && isFeatured
                                  ? "border-black bg-black text-white"
                                  : isAvailable
                                    ? "border-neutral-300 bg-neutral-50 text-neutral-800"
                                    : "border-neutral-200 bg-neutral-100 text-neutral-300 opacity-40"
                              }`}
                            >
                              {size}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price & View Details */}
                    <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
                      <span className="font-display text-base font-black text-neutral-900">
                        {product.price}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 font-mono">
                        View Details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Bottom Custom Sublimation Teamwear Banner ──────────── */}
      <section className="bg-[#EAEAEA] py-16 sm:py-20 border-t border-neutral-300">
        <div className="container-page text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Need Custom Sublimation Teamwear for Your Club?
          </h2>
          <p className="mt-3.5 text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            We manufacture bespoke tournament kits with free 3D design mockups, custom team logos,
            sponsor graphics, and individual player names. Experience pro-grade quality tailored to
            your squad.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-none sm:rounded-xs bg-black px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-neutral-800 transition-colors font-mono"
            >
              Request Custom Squad Quote
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-none sm:rounded-xs border border-neutral-400 bg-white/40 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-white transition-colors font-mono"
            >
              Learn About Manufacturing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
