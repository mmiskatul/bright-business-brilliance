import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PenTool, Repeat, FileCheck2, MessagesSquare } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { business } from "@/data/site";
import { services } from "@/data/services";
import { galleryItems } from "@/data/gallery";
import heroImage from "@/assets/hero-workspace.jpg";
import sketches from "@/assets/about-sketches.jpg";
import experience from "@/assets/gallery-brochure.jpg";

const title = "Arman Graphic Design — Logos, Branding & Print Design";
const description =
  "Freelance graphic design studio by Arman: logo and brand identity, social media creatives, print-ready flyers and packaging artwork for small businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: business.name,
          description: business.intro,
          telephone: business.phone,
          email: business.email,
          sameAs: [business.facebookUrl],
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: Home,
});

const advantages = [
  {
    icon: PenTool,
    title: "Sketched, not templated",
    body: "Concepts begin on paper, so the final mark is yours rather than a stock shape with your name beside it.",
  },
  {
    icon: Repeat,
    title: "Revisions until it fits",
    body: "Each project includes rounds of refinement. Feedback is expected — it is how the work gets sharper.",
  },
  {
    icon: FileCheck2,
    title: "Files that actually work",
    body: "Vector source, web exports and press-ready PDFs with bleed and CMYK, organised and named clearly.",
  },
  {
    icon: MessagesSquare,
    title: "You talk to the designer",
    body: "No account manager in between. Messages come straight to Arman, usually answered the same day.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface">
        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div className="reveal">
            <p className="eyebrow">Freelance design studio</p>
            <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Design that makes a small business look like it means it.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {business.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact" variant="primary">
                Start a project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/gallery" variant="outline">
                See recent work
              </ButtonLink>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t pt-7">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Focus
                </dt>
                <dd className="mt-1 font-display text-lg">Small brands</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Services
                </dt>
                <dd className="mt-1 font-display text-lg">{services.length} core</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Replies
                </dt>
                <dd className="mt-1 font-display text-lg">Same day</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Designer's desk with logo concepts on a laptop, sketches and colour swatches in daylight"
              width={1408}
              height={1104}
              className="w-full rounded-lg border object-cover shadow-lift"
            />
          </div>
        </div>
      </section>

      {/* 01 Introduction */}
      <Section tone="alt" bordered>
        <div className="grid items-center gap-12 md:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="01 — The studio"
              title="One designer, start to finish"
              description="Arman Graphic Design is deliberately small. Every enquiry, sketch, revision and final export passes through the same pair of hands, which keeps the work consistent and the process short."
            />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Work is shared as it develops rather than revealed at the end, so
              nothing arrives as a surprise and changes stay cheap.
            </p>
            <ButtonLink to="/about" variant="outline" className="mt-8">
              More about the studio
            </ButtonLink>
          </div>
          <img
            src={sketches}
            alt="Hand-drawn logo concept sketches with black markers on white paper"
            width={1400}
            height={1000}
            loading="lazy"
            className="w-full rounded-lg border object-cover shadow-soft"
          />
        </div>
      </Section>

      {/* 02 Featured services */}
      <Section>
        <SectionHeading
          eyebrow="02 — Services"
          title="What the studio takes on"
          description="Four services cover almost every request that arrives through the Facebook page."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.slug}
              className="group flex flex-col overflow-hidden rounded-md border bg-card shadow-soft transition-shadow hover:shadow-lift"
            >
              <img
                src={service.image}
                alt={service.imageAlt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow">{service.category}</p>
                <h3 className="mt-2 text-xl">{service.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  View details
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 03 Why choose us */}
      <Section tone="alt" bordered>
        <SectionHeading
          eyebrow="03 — Why work here"
          title="Four things clients notice"
          align="center"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map(({ icon: Icon, title: t, body }) => (
            <div key={t}>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary-soft text-accent-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 Featured experience */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <img
            src={experience}
            alt="Two printed menu cards resting on off-white linen in soft daylight"
            width={1200}
            height={900}
            loading="lazy"
            className="w-full rounded-lg border object-cover shadow-soft md:order-2"
          />
          <div>
            <SectionHeading
              eyebrow="04 — How it runs"
              title="From first message to final files"
              description="A short, predictable process. You send what the business does and where the design will be used; a quote and timeline come back before any work starts."
            />
            <ol className="mt-8 space-y-5">
              {[
                ["Brief", "A few questions about the business, audience and where the design will appear."],
                ["Concepts", "Sketches and first drafts, shared early for direction."],
                ["Refine", "Rounds of revision on the chosen direction."],
                ["Deliver", "Organised final files, in every format you need."],
              ].map(([step, text], i) => (
                <li key={step} className="flex gap-4 border-b pb-5 last:border-0">
                  <span className="font-display text-sm text-primary">0{i + 1}</span>
                  <div>
                    <h3 className="text-base font-semibold">{step}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* 05 Gallery preview */}
      <Section tone="alt" bordered>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="05 — Gallery" title="A look at the work" />
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            View full gallery
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {galleryItems.slice(0, 4).map((item, i) => (
            <figure
              key={item.src}
              className={`overflow-hidden rounded-md border bg-surface ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </Section>

      {/* 06 Final CTA */}
      <section className="bg-primary-soft py-20 md:py-28">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl">Ready to work on your brand?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Send a short note about the business and what you need designed.
            {" "}
            {business.responseTime}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/contact" variant="primary">
              Contact the studio
            </ButtonLink>
            <ButtonLink to="/services" variant="outline">
              Browse services
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
