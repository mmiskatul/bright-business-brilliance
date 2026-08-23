"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, Copy, Check, Sparkles, ArrowRight, Truck, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { offers } from "@/data/offers";
import { business } from "@/data/site";
import { toast } from "sonner";

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Promo Code "${code}" Copied!`, {
      description: "Mention this code when placing your order online.",
    });
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <>
      <Section tone="surface">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Seasonal Promotions & Bundle Deals
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900">
            Exclusive Deals & Squad Packages
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Save on matchday jerseys, get free player name customization, and enjoy squad bulk
            discounts on custom tournament teamwear manufactured in Dhaka.
          </p>
        </div>
      </Section>

      <Section tone="alt" bordered>
        <div className="grid gap-8 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-7 shadow-soft transition-all hover:shadow-lift hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-800">
                    {offer.badge}
                  </span>
                  <span className="font-display text-lg font-black text-emerald-700">
                    {offer.discount}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold text-neutral-900 leading-snug">
                  {offer.title}
                </h2>
                <p className="mt-3 text-xs leading-relaxed text-neutral-600">{offer.description}</p>

                {/* Promo Code Box */}
                <div className="mt-6 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                      Promo Code
                    </span>
                    <span className="font-mono text-sm font-black text-emerald-900 tracking-wider">
                      {offer.code}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(offer.code)}
                    className="inline-flex items-center gap-1 rounded-md bg-white border border-border px-3 py-1.5 text-xs font-bold text-neutral-800 shadow-sm hover:bg-neutral-50 transition-colors"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-neutral-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t border-border/60 pt-4">
                <p className="text-[11px] text-muted-foreground mb-4">
                  <strong>Terms:</strong> {offer.terms}
                </p>
                <Link
                  href={`/contact?offer=${encodeURIComponent(offer.title)}&code=${offer.code}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition-colors shadow-sm"
                >
                  <Tag className="h-4 w-4" />
                  Claim Deal Online
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Squad Bulk Order Banner */}
      <section className="bg-white py-16 border-t border-border">
        <div className="container-page max-w-3xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900">
            Organizing a Corporate Tournament or University Team?
          </h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-xl mx-auto">
            Get personalized tiered pricing for squads ordering 10 to 100+ jerseys. Includes
            customized club crest design, sponsor placement, captain armband, and complimentary
            delivery in Dhaka.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <ButtonLink href="/contact" variant="primary">
              Request Squad Bulk Quote
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
