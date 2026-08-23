"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { galleryItems, galleryCategories, type GalleryItem } from "@/data/gallery";
import { business } from "@/data/site";
import { MessageCircle } from "lucide-react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Section tone="surface">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Matchday Showcase & Details
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900">
            Fabric Texture, Badges & Finished Kits
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            A high-definition look at our Dhaka apparel manufacturing: breathable jacquard mesh,
            heat-applied silicone crests, high-density embroidery, and custom teamwear.
          </p>

          {/* Category filter tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {galleryCategories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    active
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      <Section tone="alt" bordered>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item: GalleryItem, index: number) => (
            <div
              key={item.src + index}
              className="group overflow-hidden rounded-2xl border border-border/80 bg-white shadow-soft transition-all duration-300 hover:shadow-lift hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[11px] font-bold text-neutral-900 border border-border/60 shadow-sm">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-neutral-900 leading-snug">{item.caption}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-emerald-50/70 border-t border-emerald-100 py-16">
        <div className="container-page text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Impressed by the quality?
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Get in touch to order your favorite kit or craft a custom team jersey with our Dhaka
            workshop.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/products" variant="primary">
              Browse Available Jerseys
            </ButtonLink>
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-emerald-300 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
