"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, Copy, Check, Users } from "lucide-react";
import { offers } from "@/data/offers";
import { toast } from "sonner";

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Promo Code "${code}" Copied!`, {
      description: "Code copied to clipboard. Apply at checkout or mention in order.",
    });
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-white text-neutral-900">
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-b border-neutral-200/80">
        <div className="container-page max-w-6xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBFBF4] border border-emerald-400 text-emerald-700 text-[10px] font-mono font-bold uppercase tracking-wider mb-4">
            <Tag className="h-3 w-3 text-emerald-600" />
            <span>SEASONAL PROMOTIONS & BUNDLE DEALS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-tight max-w-2xl">
            Exclusive Deals & Squad Packages
          </h1>

          <p className="mt-3.5 text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
            Save on matchday jerseys, get free player name customization, and enjoy squad bulk
            discounts on custom tournament teamwear manufactured in Dhaka.
          </p>
        </div>
      </section>

      {/* ─── Offers 3-Card Grid ─────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#F4F5F4] border-b border-neutral-200/90">
        <div className="container-page max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {offers.map((offer, idx) => {
              const isMiddleCard = idx === 1;

              return (
                <div
                  key={offer.id}
                  className="flex flex-col justify-between border border-neutral-300 bg-white p-6 shadow-2xs transition-all hover:border-neutral-400"
                >
                  <div>
                    {/* Top Row: Badge & Discount */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#EFEFEF] px-2.5 py-0.5 text-[10px] font-mono font-medium text-neutral-800">
                        {offer.badge}
                      </span>
                      <span className="font-mono text-xs font-black text-emerald-700 uppercase tracking-wider">
                        {offer.discount}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h2 className="mt-3.5 text-base font-black text-neutral-900 leading-snug">
                      {offer.title}
                    </h2>

                    {/* Card Description */}
                    <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-normal">
                      {offer.description}
                    </p>

                    {/* Promo Code Box */}
                    <div className="mt-5 border border-dashed border-neutral-300 bg-[#F9FAF9] p-3 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-mono font-semibold text-neutral-500 tracking-wider block">
                          PROMO CODE
                        </span>
                        <span className="font-mono text-xs font-black text-neutral-900 tracking-wider mt-0.5 block">
                          {offer.code}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(offer.code)}
                        className="inline-flex items-center gap-1.5 border border-neutral-300 bg-white px-2.5 py-1 text-[10px] font-mono font-bold text-neutral-800 shadow-2xs hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-neutral-500" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bottom: Terms & Action Button */}
                  <div className="mt-5 pt-3">
                    <p className="text-[10px] font-mono text-neutral-500 leading-relaxed mb-4">
                      {offer.terms}
                    </p>

                    <Link
                      href={`/contact?offer=${encodeURIComponent(offer.title)}&code=${offer.code}`}
                      className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider shadow-2xs transition-all ${
                        isMiddleCard
                          ? "bg-black text-white hover:bg-neutral-800"
                          : "bg-[#22C55E] hover:bg-[#16a34a] text-black hover:text-white"
                      }`}
                    >
                      <Tag className="h-3.5 w-3.5" />
                      CLAIM DEAL ONLINE
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Corporate / University Bulk Callout ────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-page max-w-3xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#22C55E] text-white shadow-2xs mb-4">
            <Users className="h-6 w-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Organizing a Corporate Tournament or University Team?
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Get personalized tiered pricing for squads ordering 10 to 100+ jerseys. Includes
            customized club crest design, sponsor placement, captain armband, and complimentary
            delivery in Dhaka.
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              href="/contact?type=bulk"
              className="inline-flex items-center justify-center bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider py-3 px-6 shadow-2xs transition-colors"
            >
              REQUEST SQUAD BULK QUOTE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
