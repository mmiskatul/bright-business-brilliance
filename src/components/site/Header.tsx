"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, MessageCircle, Phone } from "lucide-react";
import { business, nav } from "@/data/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-md transition-all duration-200 ${
        scrolled ? "shadow-sm border-border" : ""
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="bg-emerald-50 border-b border-emerald-100/80 px-4 py-1.5 text-center text-xs font-medium text-emerald-900">
        <span>
          ⚡ Free Matchday Name & Number Customization on all kits this week! Nationwide Delivery 🇧🇩
        </span>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label={`${business.name} — home`}
          onClick={() => setOpen(false)}
        >
          <Logo className="h-9 w-11 transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
              {business.name}
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-muted-foreground -mt-0.5">
              Dhaka • Sportswear
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => {
            const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`text-sm font-medium transition-colors hover:text-emerald-700 ${
                  isActive
                    ? "text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/80 px-3 py-2 rounded-md transition-colors"
          >
            <MessageCircle className="h-4 w-4 text-emerald-700" />
            WhatsApp
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-soft transition-all hover:bg-emerald-800 hover:shadow-lift"
          >
            <ShoppingBag className="h-4 w-4" />
            Order Jersey
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-white px-5 py-5 lg:hidden animate-in fade-in slide-in-from-top-2 shadow-lg"
        >
          <ul className="flex flex-col space-y-1">
            {nav.map((item) => {
              const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2.5 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800 font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-col gap-2 pt-2">
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-md bg-emerald-100 px-4 py-2.5 text-center text-sm font-medium text-emerald-900"
            >
              <MessageCircle className="h-4 w-4" /> Quick WhatsApp Order
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-md bg-emerald-700 px-4 py-2.5 text-center text-sm font-medium text-white shadow-soft"
            >
              Order & Custom Teamwear Inquiry
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
