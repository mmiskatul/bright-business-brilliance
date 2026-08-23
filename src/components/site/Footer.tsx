import { Link } from "@tanstack/react-router";
import { Facebook } from "lucide-react";
import { business, nav } from "@/data/site";
import { services } from "@/data/services";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t bg-surface-alt">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4 md:py-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg">{business.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {business.tagline}. Logos, brand identities, social creatives and
            print-ready artwork.
          </p>
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
          >
            <Facebook className="h-4 w-4" aria-hidden="true" />
            Facebook page
          </a>
        </div>

        <nav aria-label="Footer pages">
          <h2 className="text-sm font-semibold">Pages</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h2 className="text-sm font-semibold">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="transition-colors hover:text-primary"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <a href={business.phoneHref} className="hover:text-primary">
                {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="hover:text-primary">
                {business.email}
              </a>
            </li>
            <li>{business.location}</li>
          </ul>
          <h3 className="mt-6 text-sm font-semibold text-foreground">Hours</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {business.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {business.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
