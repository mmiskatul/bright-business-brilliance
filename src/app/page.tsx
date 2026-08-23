import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Flame,
  Truck,
  Star,
  CheckCircle2,
  MessageCircle,
  Scissors,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { business } from "@/data/site";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { galleryItems } from "@/data/gallery";

const advantages = [
  {
    icon: Sparkles,
    title: "Master Quality Jacquard Fabric",
    body: "Engineered with 180–190 GSM micro-polyester and moisture-wicking weave that keeps you cool during intense matchdays.",
  },
  {
    icon: ShieldCheck,
    title: "Precision 3D Crests & Badges",
    body: "Heat-applied silicone badges, authentic tournament arm patches, and high-density woven embroidery that never frays.",
  },
  {
    icon: Scissors,
    title: "Free Custom Name & Number",
    body: "Official club and national font styles with razor-sharp vinyl heat-pressing that withstands continuous wash cycles.",
  },
  {
    icon: Truck,
    title: "Swift 48–72h Nationwide Dispatch",
    body: "Fast delivery across Dhaka (same/next day) and all 64 districts with secure, protective packaging.",
  },
];

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero Section — Light & Airy Split */}
      <section className="bg-white border-b border-border/40 relative overflow-hidden">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-5">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Dhaka Apparel & Sports Manufacturing
            </div>
            <h1 className="text-4xl leading-[1.12] sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900">
              Wear your passion in authentic master quality.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 font-normal">
              {business.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <ButtonLink href="/products" variant="primary">
                Explore Jersey Catalog
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Custom Teamwear Quote
              </ButtonLink>
            </div>

            {/* Quick Metrics */}
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border/70 pt-8">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Fabric Grade
                </dt>
                <dd className="mt-1 font-display text-xl font-bold text-neutral-900">
                  180 GSM Mesh
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Custom Orders
                </dt>
                <dd className="mt-1 font-display text-xl font-bold text-neutral-900">
                  Full Sublimation
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Delivery
                </dt>
                <dd className="mt-1 font-display text-xl font-bold text-neutral-900">
                  Nationwide 🇧🇩
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-neutral-50 shadow-lift">
              <img
                src="/assets/jersey-hero.jpg"
                alt="Premium football jerseys on natural wooden hangers in bright daylight showroom"
                width={1400}
                height={1000}
                className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 backdrop-blur-md p-4 border border-white/60 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900">
                    2025/26 Season Kits Available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Club, National, Retro & Custom Editions
                  </p>
                </div>
                <Link
                  href="/products"
                  className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 Introduction — Workshop & Craftsmanship */}
      <Section tone="alt" bordered>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="01 — The Workshop"
              title="Tailored with athlete-level precision"
              description="ASFA Design is built around the passion for authentic football culture. Every jersey is constructed using high-density jacquard knitting, reinforced double-needle seams, and Japanese sublimation ink for vibrant, long-lasting colors."
            />
            <div className="mt-6 space-y-3">
              {[
                "Direct industrial embroidery and heat-sealed silicone club crests",
                "Laser-cut perforated side vents for maximum matchday ventilation",
                "Free personalized name and squad number printing with official fonts",
                "Custom batch manufacturing for teams, universities, and corporate leagues",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-neutral-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <ButtonLink href="/about" variant="outline">
                Read About Our Craft
              </ButtonLink>
              <a
                href={business.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <img
              src="/assets/jersey-craft.jpg"
              alt="Apparel manufacturing and precision stitching in Dhaka studio"
              width={1200}
              height={900}
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </Section>

      {/* 02 Featured Jerseys */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="02 — Featured Kits"
            title="Popular Matchday Jerseys"
            description="Our highest-rated player edition and fan edition jerseys ready for immediate dispatch across Bangladesh."
          />
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
          >
            Browse all jerseys ({products.length})
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article
              key={product.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-border/80 bg-white shadow-soft transition-all duration-300 hover:shadow-lift hover:-translate-y-1"
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
                <span className="absolute top-3 right-3 rounded-md bg-emerald-700 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                  {product.price}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  {product.category}
                </span>
                <h3 className="mt-1.5 text-lg font-bold text-neutral-900 leading-snug">
                  {product.name}
                </h3>
                <p className="mt-2.5 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {product.summary}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                  <div className="flex gap-1">
                    {product.sizes.map((s) => (
                      <span
                        key={s}
                        className="rounded border border-border bg-neutral-50 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    Details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 03 Why Choose Us */}
      <Section tone="alt" bordered>
        <SectionHeading
          eyebrow="03 — Quality Guarantee"
          title="Why Football Fans & Teams Trust ASFA"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map(({ icon: Icon, title: t, body }) => (
            <div
              key={t}
              className="rounded-xl border border-border/80 bg-white p-7 shadow-soft transition-all hover:border-emerald-200 hover:shadow-lift"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-bold text-neutral-900">{t}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground font-normal">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 Featured Experience / Fabric & Tech */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft lg:order-2">
            <img
              src="/assets/jersey-fabric.jpg"
              alt="Macro close-up of moisture-wicking breathable jacquard mesh fabric"
              width={1200}
              height={900}
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="04 — Engineered Performance"
              title="Breathable fabric crafted for Dhaka's climate"
              description="Standard polyester jerseys trap heat and sweat. ASFA jerseys use specialized micro-mesh hexagonal knitting that pulls moisture away from the skin within seconds."
            />
            <ol className="mt-8 space-y-4">
              {[
                [
                  "1. Micro-Knit Yarn",
                  "Ultralight 180 GSM yarn allows continuous multi-directional airflow.",
                ],
                [
                  "2. Anti-Peel Crests",
                  "Flexible silicone emblems heat-pressed at 160°C under hydraulic pressure.",
                ],
                [
                  "3. Official Fonts",
                  "Accurate league numbers, player lettering, and sleeve patch alignment.",
                ],
                [
                  "4. Zero Shrinkage",
                  "Pre-washed and steam-set for consistent sizing match after match.",
                ],
              ].map(([step, text]) => (
                <li key={step} className="rounded-lg border border-border/70 bg-neutral-50/70 p-4">
                  <h4 className="text-sm font-bold text-neutral-900">{step}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex gap-3">
              <ButtonLink href="/products" variant="primary">
                Shop The Collection
              </ButtonLink>
              <ButtonLink href="/gallery" variant="outline">
                View Macro Details
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* 05 Matchday Gallery Preview */}
      <Section tone="alt" bordered>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeading eyebrow="05 — Matchday Gallery" title="Fabric, Badges & Finished Kits" />
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
          >
            View full gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {galleryItems.slice(0, 4).map((item, i) => (
            <figure
              key={item.src + i}
              className={`group overflow-hidden rounded-xl border border-border bg-white shadow-soft ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </Section>

      {/* 06 Customer Reviews Preview */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="06 — Customer Proof"
            title="What Footballers & Fans Say in Dhaka"
            description="Verified reviews from tournament captains, kit collectors, and football supporters across Bangladesh."
          />
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
          >
            Read all reviews ({reviews.length})
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-border/80 bg-white p-6 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-neutral-700 italic">"{r.comment}"</p>
              </div>

              <div className="mt-5 border-t border-border/60 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-bold text-xs text-emerald-900">
                    {r.avatarText}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground">{r.location}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 07 Final Light CTA */}
      <section className="bg-gradient-to-b from-emerald-50/60 to-white py-20 border-t border-emerald-100/60">
        <div className="container-page max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            Matchday Ready
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
            Ready to order your squad's new kit?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
            Send us a quick message on WhatsApp with your desired club, size, and custom player
            name. We reply within minutes with mockups and instant confirmation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-emerald-800 transition-all hover:shadow-lift"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp Now
            </a>
            <ButtonLink href="/contact" variant="outline">
              Submit Online Order
            </ButtonLink>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            📍 Showroom & pickup available in Dhanmondi, Dhaka • Nationwide delivery across 64
            districts
          </p>
        </div>
      </section>
    </>
  );
}
