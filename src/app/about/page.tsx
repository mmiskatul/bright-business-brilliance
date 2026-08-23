import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { business } from "@/data/site";
import { CheckCircle2, ShieldCheck, Heart, Sparkles, MapPin, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About ASFA Design — Apparel Manufacturing & Sports Kits in Dhaka",
  description:
    "Learn about ASFA Design, our Dhaka apparel manufacturing studio, precision jacquard fabric weaving, sublimation printing, and football jersey craftsmanship.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Honest Fabric Specifications",
    body: "We never compromise on GSM weight. Every player edition uses authentic 180–190 GSM micro-polyester designed for athletic perspiration control.",
  },
  {
    icon: Sparkles,
    title: "Exact Typographic Accuracy",
    body: "From official Premier League and La Liga lettering to FIFA World Cup font arcs, all numbers and names are mathematically scaled to match on-pitch standards.",
  },
  {
    icon: Heart,
    title: "Grassroots Football Support",
    body: "We actively sponsor and supply affordable custom tournament kits to local academies, university squads, and corporate leagues in Bangladesh.",
  },
  {
    icon: Truck,
    title: "Reliable Nationwide Fulfillment",
    body: "Whether you need a single jersey in Chittagong or 50 kits for a corporate league in Dhaka, orders are packed securely and dispatched without delay.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="surface">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
              Our Story & Facility
            </div>
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900">
              Crafting Bangladesh's finest football & sports apparel.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              {business.name} was established in Dhaka with a clear mission: to provide football
              players, collectors, and supporters with master-quality jerseys and custom teamwear
              that match international tournament standards.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <MapPin className="h-4 w-4" />
              <span>Workshop & Showroom based in Dhanmondi, Dhaka</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <img
              src="/assets/jersey-matchday.jpg"
              alt="ASFA Design premium football kit manufacturing in Dhaka studio"
              width={1200}
              height={900}
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </Section>

      {/* Our Story */}
      <Section tone="alt" bordered>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Origin"
            title="From a design passion to industrial apparel production"
          />
          <div className="space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              Starting as a bespoke graphic and sportswear concept studio on Facebook (where over
              1,400 passionate fans followed our daily designs and kit mockups), ASFA Design
              expanded into physical apparel manufacturing to bring digital designs to life.
            </p>
            <p>
              Today, our Dhaka facility handles the complete production cycle: sourcing high-grade
              polyester yarn, knitting breathable jacquard mesh, industrial color sublimation, laser
              cutting, and 3D silicone badge heat pressing.
            </p>
            <p>
              We pride ourselves on direct communication. When you message us about an order, you
              talk directly with designers who understand collar styles, sleeve trims, and accurate
              font typography.
            </p>
          </div>
        </div>
      </Section>

      {/* What We Do */}
      <Section>
        <SectionHeading
          eyebrow="Capabilities"
          title="What ASFA Design Delivers"
          description="We serve individual football collectors, recreational turf players, school squads, and professional sports clubs."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Player Edition Club & National Kits",
              desc: "1:1 matchday construction featuring heat-sealed badges, slim athletic cuts, and perforated ventilation panels.",
            },
            {
              title: "Custom Sublimation Teamwear",
              desc: "Complete bespoke squad jerseys for tournaments with custom emblems, sponsor logos, and player names.",
            },
            {
              title: "Retro & Vintage Classic Kits",
              desc: "Heavier textured jacquard fabric, fold-over polo collars, and vintage felt sponsor printing from football's iconic eras.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-white p-7 shadow-soft"
            >
              <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section tone="alt" bordered>
        <SectionHeading eyebrow="Our Values" title="The Standards We Uphold in Every Jersey" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-xl border border-border bg-white p-6 shadow-soft"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 mb-4">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold text-neutral-900">{v.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">{v.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Business Environment / Unboxing */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Packaging & Presentation"
              title="Collector-grade presentation for every customer"
              description="Every jersey ordered from ASFA Design is inspected by hand, folded in dust-protective packaging, and tagged before being dispatched."
            />
            <div className="mt-8 flex gap-3.5">
              <ButtonLink href="/products" variant="primary">
                View Available Jerseys
              </ButtonLink>
              <ButtonLink href="/custom" variant="outline">
                Order Custom Batch
              </ButtonLink>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <img
              src="/assets/jersey-madrid.jpg"
              alt="ASFA Design matchday football jersey craftsmanship and packaging"
              width={1200}
              height={900}
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
