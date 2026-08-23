import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { services } from "@/data/services";

const title = "Design Services — Logos, Social, Print & Packaging";
const description =
  "Logo and brand identity, social media creatives, print-ready marketing design and packaging artwork by freelance designer Arman.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: `/services/${s.slug}`,
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <Section tone="surface">
        <div className="max-w-3xl">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 text-4xl sm:text-5xl">
            Four services, priced per project.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Every job is quoted after a short brief, because a single label and a
            full identity are not the same amount of work. Tell the studio what
            you need and a fixed price comes back before anything starts.
          </p>
        </div>
      </Section>

      <Section tone="alt" bordered className="pt-4">
        <div className="space-y-6">
          {services.map((service, i) => (
            <article
              key={service.slug}
              className="grid overflow-hidden rounded-md border bg-card shadow-soft md:grid-cols-[0.9fr_1.1fr]"
            >
              <img
                src={service.image}
                alt={service.imageAlt}
                width={1200}
                height={900}
                loading="lazy"
                className={`h-56 w-full object-cover md:h-full ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              />
              <div className="p-7 md:p-10">
                <p className="eyebrow">{service.category}</p>
                <h2 className="mt-2 text-2xl md:text-3xl">{service.name}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {service.details.slice(0, 3).map((d) => (
                    <li key={d} className="flex gap-2.5">
                      <span aria-hidden="true" className="text-primary">
                        —
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm font-medium">Quoted per project</p>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  Full details
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl rounded-md border bg-primary-soft p-10 text-center">
          <h2 className="text-3xl">Not sure which one you need?</h2>
          <p className="mt-4 text-muted-foreground">
            Describe the business in a message and the studio will suggest the
            right starting point.
          </p>
          <ButtonLink to="/contact" variant="primary" className="mt-7">
            Ask a question
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
