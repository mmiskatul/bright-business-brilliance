import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Ruler, Info } from "lucide-react";
import { business } from "@/data/site";
import { getProduct, products } from "@/data/products";
import { ProductOrderClient } from "./ProductOrderClient";
import { ProductGalleryClient } from "./ProductGalleryClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: `${product.name} — ${business.name}`,
    description: product.summary,
  };
}

const sizeMeasurements = [
  { size: "S", chest: "38 in", length: "27 in", shoulder: "17 in", height: "5'4\" – 5'7\"" },
  { size: "M", chest: "40 in", length: "28 in", shoulder: "18 in", height: "5'7\" – 5'9\"" },
  { size: "L", chest: "42 in", length: "29 in", shoulder: "19 in", height: "5'9\" – 5'11\"" },
  { size: "XL", chest: "44 in", length: "30 in", shoulder: "20 in", height: "5'11\" – 6'1\"" },
  { size: "XXL", chest: "46 in", length: "31 in", shoulder: "21 in", height: "6'1\"+" },
];

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="bg-white text-neutral-900">
      {/* ─── Breadcrumb & Main Product Section ──────────────────── */}
      <section className="py-8 sm:py-10 border-b border-neutral-200/90">
        <div className="container-page max-w-5xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
              <Link href="/" className="hover:text-neutral-900 transition-colors">
                HOME
              </Link>
              <span>&gt;</span>
              <Link href="/products" className="hover:text-neutral-900 transition-colors">
                JERSEYS
              </Link>
              <span>&gt;</span>
              <span className="text-neutral-900 font-bold truncate max-w-xs sm:max-w-md">
                {product.name}
              </span>
            </div>
          </nav>

          {/* 2-Column Product Layout */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left: Gallery */}
            <ProductGalleryClient
              image={product.image}
              backImage={product.backImage}
              galleryImages={product.galleryImages}
              imageAlt={product.imageAlt}
              badge={product.badge || "NEW ARRIVAL"}
            />

            {/* Right: Info & Ordering */}
            <div className="space-y-4">
              {/* Category */}
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 block">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 pt-0.5">
                <span className="font-display text-2xl font-black text-neutral-900">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs font-mono text-neutral-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 font-normal">
                {product.description}
              </p>

              {/* Interactive Size, Quantity & CTA */}
              <div className="pt-2">
                <ProductOrderClient product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Size Guide & Fabric Specs ──────────────────────────── */}
      <section
        id="size-chart"
        className="py-12 sm:py-16 bg-[#FAFAF8] border-b border-neutral-200/90"
      >
        <div className="container-page max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="h-4 w-4 text-emerald-700" />
                <h2 className="text-base font-black uppercase tracking-wider text-neutral-900 font-mono">
                  Official Jersey Size Chart
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mb-4 font-mono">
                Standard athletic fit in inches. For a relaxed or oversized streetwear fit, order
                one size larger.
              </p>

              <div className="overflow-x-auto border border-neutral-300 bg-white">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="border-b border-neutral-300 bg-neutral-100 text-[10px] font-bold uppercase tracking-wider text-neutral-700">
                    <tr>
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3">Chest</th>
                      <th className="py-2.5 px-3">Length</th>
                      <th className="py-2.5 px-3">Shoulder</th>
                      <th className="py-2.5 px-3">Height</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {sizeMeasurements.map((m) => (
                      <tr key={m.size} className="hover:bg-neutral-50">
                        <td className="py-2.5 px-3 font-bold text-neutral-900">{m.size}</td>
                        <td className="py-2.5 px-3 text-neutral-700">{m.chest}</td>
                        <td className="py-2.5 px-3 text-neutral-700">{m.length}</td>
                        <td className="py-2.5 px-3 text-neutral-700">{m.shoulder}</td>
                        <td className="py-2.5 px-3 text-neutral-500">{m.height}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-emerald-700" />
                <h2 className="text-base font-black uppercase tracking-wider text-neutral-900 font-mono">
                  Wash & Fabric Care
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mb-4 font-mono">
                Preserve 3D crests, vinyl typography, and mesh elasticity with proper care.
              </p>

              <div className="border border-neutral-300 bg-white p-5 space-y-3 text-xs font-mono">
                <p className="text-neutral-700 leading-relaxed">
                  • <strong>Wash:</strong> Machine wash cold (30°C) inside-out with gentle cycle.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  • <strong>Drying:</strong> Air dry flat in the shade. Do not tumble dry.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  • <strong>Ironing:</strong> Never iron directly over heat-pressed names, numbers,
                  or silicone badges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom Related: "You May Also Like" ────────────────── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-page max-w-5xl">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Complete The Kit
              </span>
              <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                You May Also Like
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-neutral-900 hover:text-emerald-700 transition-colors"
            >
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex flex-col overflow-hidden border border-neutral-300 bg-white transition-colors duration-200 hover:border-neutral-400"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFEFEF] flex items-center justify-center p-3">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  {p.badge && (
                    <span className="absolute top-2.5 left-2.5 border border-neutral-300 bg-white/95 px-2 py-0.5 text-[9px] font-mono font-bold text-neutral-800 shadow-2xs">
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute top-2.5 right-2.5 rounded-xs bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                    {p.price}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                    {p.category}
                  </span>

                  <h3 className="mt-1 text-sm font-bold text-neutral-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {p.name}
                  </h3>

                  <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600 line-clamp-2">
                    {p.summary}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-[11px] font-mono">
                    <div className="flex gap-1">
                      {["S", "M", "L"].map((s) => (
                        <span
                          key={s}
                          className="flex h-5 w-5 items-center justify-center border border-neutral-300 bg-neutral-50 text-[9px] font-bold text-neutral-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 font-mono">
                      View Details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
