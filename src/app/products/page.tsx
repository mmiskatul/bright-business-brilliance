"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, ShoppingBag, MessageCircle, Filter, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { products } from "@/data/products";
import { business } from "@/data/site";

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
    <>
      <Section tone="surface">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Official Collection • 2025/26
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900">
            Football Jerseys & Custom Teamwear
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Explore authentic player editions, fan jerseys, iconic retro classics, and custom
            full-sublimation kits with complimentary player name & number heat-pressing.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by club, player, or kit type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="alt" bordered>
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center max-w-md mx-auto">
            <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="text-base font-bold text-neutral-900">No jerseys found</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search query or select "All" categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-semibold text-emerald-700 underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-soft transition-all duration-300 hover:shadow-lift hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur px-2.5 py-0.5 text-xs font-bold text-neutral-800 shadow-sm border border-border/60">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col items-end">
                    <span className="rounded-md bg-emerald-700 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] font-semibold text-neutral-600 line-through bg-white/90 px-1 rounded mt-0.5 shadow-sm">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    {product.category}
                  </span>
                  <h2 className="mt-1.5 text-lg font-bold text-neutral-900 leading-snug">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                    {product.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border/60">
                    <div className="flex items-center justify-between text-xs text-neutral-600 mb-3">
                      <span className="font-semibold text-neutral-800">Sizes Available:</span>
                      <div className="flex gap-1">
                        {product.sizes.map((s) => (
                          <span
                            key={s}
                            className="rounded border border-border bg-neutral-50 px-1.5 py-0.5 text-[10px] font-semibold"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors"
                      >
                        View & Order
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <a
                        href={`https://wa.me/8801711234567?text=Hi%20ASFA%20Design,%20I%20would%20like%20to%20order%20${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        title="Order on WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      {/* Custom Team Kit Banner */}
      <section className="bg-emerald-50/70 border-t border-emerald-100 py-16">
        <div className="container-page text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Need Custom Sublimation Teamwear for Your Club?
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            We manufacture bespoke tournament kits with free 3D design mockups, custom team logos,
            sponsor graphics, and individual player names.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="primary">
              Request Custom Squad Quote
            </ButtonLink>
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-emerald-300 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Discuss on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
