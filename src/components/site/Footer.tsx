import Link from "next/link";
import {
  Facebook,
  MessageCircle,
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  Truck,
  RefreshCw,
} from "lucide-react";
import { business, nav } from "@/data/site";
import { products } from "@/data/products";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-[#FAFAF8] text-foreground">
      {/* Value props strip */}
      <div className="border-b border-border/60 bg-white py-8">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Master Quality Fabric</p>
              <p className="text-xs text-muted-foreground">
                100% Breathable Jacquard Micro-Polyester
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Fast Nationwide Delivery</p>
              <p className="text-xs text-muted-foreground">
                Dhaka within 24h, all districts in 48-72h
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
              <RefreshCw className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Free Name & Number Print</p>
              <p className="text-xs text-muted-foreground">
                Original fonts & heat-sealed vinyl badges
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Instant Support</p>
              <p className="text-xs text-muted-foreground">Live WhatsApp sizing & order help</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-14 md:grid-cols-4 md:py-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-11" />
            <div>
              <span className="font-display text-lg font-bold">{business.name}</span>
              <p className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">
                Apparel Manufacturing
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{business.intro}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:text-emerald-700 hover:border-emerald-300"
            >
              <Facebook className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
              Facebook Page
            </a>
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>

        <nav aria-label="Footer pages">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  href={item.to}
                  className="transition-colors hover:text-emerald-700 font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer products">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Featured Kits
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {products.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="transition-colors hover:text-emerald-700"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Dhaka Studio & Orders
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>{business.location}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-emerald-700 shrink-0" />
              <a href={business.phoneHref} className="hover:text-emerald-700 font-medium">
                {business.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-emerald-700 shrink-0" />
              <a href={`mailto:${business.email}`} className="hover:text-emerald-700">
                {business.email}
              </a>
            </li>
          </ul>
          <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-foreground">
            Hours
          </h3>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {business.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}:</span>
                <span className="font-medium text-foreground">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/80 bg-white">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {business.name} — Finest Apparel Manufacturing. Dhaka, Bangladesh.</p>
          <div className="flex gap-5">
            <Link href="/products" className="hover:text-emerald-700 font-medium">
              Jerseys & Kits
            </Link>
            <Link href="/contact" className="hover:text-emerald-700 font-medium">
              Direct Order
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
