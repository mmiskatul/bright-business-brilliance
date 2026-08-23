"use client";

import { useState } from "react";
import { MessageCircle, ShoppingBag, CheckCircle, Sparkles } from "lucide-react";
import { type Product, business } from "@/data/site";

export function ProductOrderClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [includePatches, setIncludePatches] = useState(true);

  const getWhatsAppMessage = () => {
    let msg = `Hi ASFA Design! I want to order:\n- Jersey: ${product.name}\n- Price: ${product.price}\n- Size: ${selectedSize}`;
    if (customName.trim() || customNumber.trim()) {
      msg += `\n- Custom Print: ${customName.trim().toUpperCase()} #${customNumber.trim()}`;
    }
    if (includePatches) {
      msg += `\n- Sleeve Badges: Yes (Included)`;
    }
    return encodeURIComponent(msg);
  };

  return (
    <div className="rounded-xl border border-border bg-neutral-50/60 p-6 space-y-6">
      {/* 1. Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
            Select Size:
          </label>
          <span className="text-[11px] text-muted-foreground">Standard Asian Athletic Fit</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`h-10 min-w-12 rounded-lg border px-3 text-xs font-bold transition-all ${
                selectedSize === size
                  ? "border-emerald-700 bg-emerald-700 text-white shadow-sm"
                  : "border-border bg-white text-neutral-800 hover:border-emerald-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Free Custom Name & Number Customization */}
      <div className="border-t border-border/80 pt-4">
        <div className="flex items-center gap-1.5 text-emerald-800 mb-3">
          <Sparkles className="h-4 w-4 text-emerald-700" />
          <span className="text-xs font-bold uppercase tracking-wide">
            Free Matchday Name & Number Customization
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
              Custom Name on Back (e.g. MESSI, ARMAN)
            </label>
            <input
              type="text"
              placeholder="YOUR NAME"
              value={customName}
              onChange={(e) => setCustomName(e.target.value.toUpperCase())}
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-xs font-bold uppercase text-neutral-900 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
              Squad Number (e.g. 10, 7, 9)
            </label>
            <input
              type="text"
              placeholder="10"
              maxLength={3}
              value={customNumber}
              onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-xs font-bold text-neutral-900 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        <label className="mt-3 flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
          <input
            type="checkbox"
            checked={includePatches}
            onChange={(e) => setIncludePatches(e.target.checked)}
            className="rounded border-border text-emerald-700 focus:ring-emerald-600 h-4 w-4"
          />
          <span>Include official tournament sleeve patches (UCL / League / World Cup)</span>
        </label>
      </div>

      {/* 3. Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href={`https://wa.me/8801711234567?text=${getWhatsAppMessage()}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-soft hover:bg-emerald-800 transition-all hover:shadow-lift"
        >
          <MessageCircle className="h-4 w-4" />
          Order on WhatsApp Instantly
        </a>

        <a
          href={`/contact?jersey=${encodeURIComponent(product.name)}&size=${selectedSize}&name=${encodeURIComponent(customName)}&number=${customNumber}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors shadow-sm"
        >
          <ShoppingBag className="h-4 w-4" />
          Submit Web Order
        </a>
      </div>
    </div>
  );
}
