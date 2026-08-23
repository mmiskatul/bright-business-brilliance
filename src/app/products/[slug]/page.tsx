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

      {/* Specifications & Deliverables */}
      <Section tone="alt" bordered>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Specifications" title="Fabric & Construction Details" />
          <ul className="space-y-3.5">
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
              <h3 className="mt-1 text-base font-bold text-neutral-900 leading-snug">{p.name}</h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-bold text-neutral-900">{p.price}</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                  View Kit <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
