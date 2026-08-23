import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Truck,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  Ruler,
  Info,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
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
    <>
      <Section tone="surface">
        <nav aria-label="Breadcrumb">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to all jerseys
          </Link>
        </nav>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
          {/* Left: Product Imagery with Interactive Multi-Angle Switcher */}
          <ProductGalleryClient
            image={product.image}
            backImage={product.backImage}
            galleryImages={product.galleryImages}
            imageAlt={product.imageAlt}
          />

          {/* Right: Product Details & Order Client */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {product.category}
              </span>
              {product.badge && (
                <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-emerald-800">{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg font-medium text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                In Stock in Dhaka
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-neutral-600">{product.description}</p>

            {/* Interactive Size, Name/Number & Order Form */}
            <div className="mt-8">
              <ProductOrderClient product={product} />
            </div>

            {/* Value Guarantees */}
            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-border/80 pt-6 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <span>100% Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-700" />
                <span>Delivery across Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Specifications & Detailed Size Guide */}
      <Section tone="alt" bordered>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Specifications"
              title="Fabric, Weave & Construction"
              description="Every jersey is built using industrial-grade materials designed for maximum longevity on and off the pitch."
            />
            <ul className="mt-6 space-y-3">
              {product.details.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 rounded-lg bg-white border border-border/70 p-4 shadow-sm"
                >
                  <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-neutral-800">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="h-5 w-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-neutral-900">Official Jersey Size Chart</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-5">
              Standard athletic fit in inches. If you prefer a relaxed or streetwear oversized fit,
              we recommend ordering one size larger.
            </p>

            <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-soft">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-neutral-50/80 text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Chest</th>
                    <th className="py-3 px-4">Length</th>
                    <th className="py-3 px-4">Shoulder</th>
                    <th className="py-3 px-4">Recommended Height</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {sizeMeasurements.map((m) => (
                    <tr key={m.size} className="hover:bg-neutral-50/50">
                      <td className="py-3 px-4 font-bold text-emerald-800">{m.size}</td>
                      <td className="py-3 px-4 text-neutral-700">{m.chest}</td>
                      <td className="py-3 px-4 text-neutral-700">{m.length}</td>
                      <td className="py-3 px-4 text-neutral-700">{m.shoulder}</td>
                      <td className="py-3 px-4 text-muted-foreground">{m.height}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <Info className="h-4 w-4" />
                Wash & Care Instructions
              </div>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                Machine wash cold (30°C) inside out. Do not bleach. Air dry in shade. Do not iron
                directly over heat-pressed vinyl names, numbers, or silicone badges.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Related Products */}
      <Section>
        <SectionHeading eyebrow="Similar Kits" title="Other Popular Football Jerseys" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group rounded-2xl border border-border/80 bg-white p-5 shadow-soft transition-all duration-300 hover:shadow-lift hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 mb-4">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-[11px] font-bold uppercase text-emerald-700">{p.category}</span>
              <h3 className="mt-1 text-base font-bold text-neutral-900 leading-snug group-hover:text-emerald-700 transition-colors">
                {p.name}
              </h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-bold text-neutral-900">{p.price}</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                  View Kit Details <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
