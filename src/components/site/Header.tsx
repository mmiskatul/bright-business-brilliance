"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
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
      className={`sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md transition-all duration-200 ${
        scrolled ? "shadow-xs border-neutral-300" : ""
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label={`${business.name} — home`}
          onClick={() => setOpen(false)}
        >
          <Logo className="h-7 w-8 transition-transform group-hover:scale-105" />
          <span className="font-display text-base sm:text-lg font-black tracking-tight text-neutral-900 uppercase">
            {business.name}
          </span>
        </Link>

        {/* Center: Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-emerald-700 ${
                  isActive
                    ? "text-emerald-700 underline underline-offset-8 decoration-2 decoration-emerald-600"
                    : "text-neutral-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Cart / Order Bag */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="relative inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800"
            aria-label="Order Cart"
          >
            <ShoppingBag className="h-5 w-5 text-neutral-800" />
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white shadow-xs">
              0
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-800 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-neutral-200 bg-white px-5 py-5 md:hidden animate-in fade-in slide-in-from-top-2 shadow-lg"
        >
          <ul className="flex flex-col space-y-1">
            {nav.map((item) => {
              const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800 font-bold"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-neutral-100">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-emerald-700 px-4 py-2.5 text-center text-xs font-bold text-white shadow-sm"
            >
              Order & Teamwear Inquiry
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
