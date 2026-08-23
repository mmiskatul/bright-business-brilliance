"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { business, nav } from "@/data/site";
import { Logo } from "./Logo";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { openCart, totalCount } = useCart();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-neutral-200 bg-white/98 backdrop-blur-md transition-all duration-200 ${
        scrolled ? "shadow-xs border-neutral-300" : ""
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label={`${business.name} — home`}
          onClick={() => setOpen(false)}
        >
          <Logo className="h-6 w-7 transition-transform group-hover:scale-105" />
          <span className="font-display text-sm sm:text-base font-black tracking-wider text-neutral-900 uppercase">
            {business.name}
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav aria-label="Main" className="hidden items-center gap-7 lg:gap-9 md:flex">
          {nav.map((item) => {
            const isActive =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(item.to + "/");

            return (
              <Link
                key={item.to}
                href={item.to}
                className={`relative py-1.5 text-xs sm:text-[13px] font-mono tracking-wider uppercase transition-colors duration-150 ${
                  isActive
                    ? "font-black text-[#047857]"
                    : "font-bold text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#047857]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Cart / Order Action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex items-center justify-center h-9 w-9 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800 cursor-pointer"
            aria-label="Open Equipment Cart"
          >
            <ShoppingBag className="h-5 w-5 text-neutral-900" strokeWidth={2} />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#047857] text-[9px] font-black text-white shadow-xs">
              {mounted ? totalCount : 0}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-800 md:hidden cursor-pointer"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-neutral-200 bg-white px-5 py-4 md:hidden animate-in fade-in slide-in-from-top-2 shadow-lg"
        >
          <ul className="flex flex-col space-y-1">
            {nav.map((item) => {
              const isActive =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(item.to + "/");

              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3.5 py-2.5 text-xs font-mono tracking-wider uppercase transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-[#047857] font-black border-l-4 border-[#047857]"
                        : "font-bold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openCart();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-neutral-100 px-4 py-2.5 text-center text-xs font-bold text-neutral-900 uppercase tracking-wider font-mono cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" /> View Cart ({totalCount})
            </button>
            <Link
              href="/custom"
              onClick={() => setOpen(false)}
              className="block rounded-md bg-[#047857] hover:bg-[#065f46] px-4 py-2.5 text-center text-xs font-bold text-white shadow-xs uppercase tracking-wider font-mono transition-colors"
            >
              Custom Squad Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
