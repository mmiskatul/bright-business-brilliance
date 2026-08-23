import Link from "next/link";
import { business } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-800">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Copyright */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-7" />
              <span className="font-display text-base font-black tracking-tight text-neutral-900 uppercase">
                {business.name}
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500 max-w-sm">
              © 2026 {business.name} — Premium Sportswear & Apparel Manufacturing. Dhanmondi, Dhaka,
              Bangladesh.
            </p>
          </div>

          {/* Column 2: Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Support
            </h3>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li>
                <Link href="/about" className="hover:text-emerald-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-700 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-700 transition-colors">
                  Jersey Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Customer Service
            </h3>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li>
                <Link href="/offers" className="hover:text-emerald-700 transition-colors">
                  Offers & Bundles
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-emerald-700 transition-colors">
                  Verified Reviews
                </Link>
              </li>
              <li>
                <span className="text-neutral-500">Nationwide 48-72h Delivery</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
