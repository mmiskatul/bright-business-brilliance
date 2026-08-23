import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink, ButtonAnchor } from "@/components/site/Button";
import { business } from "@/data/site";
import { getService, services } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { service } = loaderData;
    const title = `${service.name} — Arman Graphic Design`;
    return {
      meta: [
        { title },
        { name: "description", content: service.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: service.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            serviceType: service.category,
            description: service.summary,
            provider: { "@type": "LocalBusiness", name: business.name },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "/services" },
              {
                "@type": "ListItem",
                position: 3,
                name: service.name,
                item: `/services/${params.slug}`,
              },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServiceDetail,
});

function ServiceNotFound() {
  return (
    <Section>
      <h1 className="text-3xl">That service doesn't exist</h1>
      <p className="mt-3 text-muted-foreground">
        It may have been renamed. All current services are listed on one page.
      </p>
      <ButtonLink to="/services" variant="outline" className="mt-6">
        Back to services
      </ButtonLink>
    </Section>
  );
}

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Section tone="surface">
        <nav aria-label="Breadcrumb">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All services
          </Link>
        </nav>
        <div className="mt-8 grid items-start gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">{service.category}</p>
            <h1 className="mt-4 text-4xl sm:text-5xl">{service.name}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {service.description}
            </p>
            <p className="mt-6 text-sm font-medium">
              Pricing: quoted per project after a short brief
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact" variant="primary">
                Request a quote
              </ButtonLink>
              <ButtonAnchor href={business.phoneHref} variant="quiet">
                Call the studio
              </ButtonAnchor>
            </div>
          </div>
          <img
            src={service.image}
            alt={service.imageAlt}
            width={1200}
            height={900}
            className="w-full rounded-lg border object-cover shadow-lift"
          />
        </div>
      </Section>

      <Section tone="alt" bordered>
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Included" title="What you get" />
          <ul className="space-y-4">
            {service.details.map((d) => (
              <li key={d} className="flex gap-3 border-b pb-4 last:border-0">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-base text-muted-foreground">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Related" title="Other services" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group rounded-md border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift"
            >
              <p className="eyebrow">{s.category}</p>
              <h3 className="mt-2 text-xl">{s.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                View
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
