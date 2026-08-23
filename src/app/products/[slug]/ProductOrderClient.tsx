"use client";

import { useState } from "react";
import { ShoppingBag, Sparkles, ArrowRight, CheckCircle2, ShoppingCart } from "lucide-react";
import { type Product } from "@/data/site";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export function ProductOrderClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [includePatches, setIncludePatches] = useState(true);
  const { addItem, openCart } = useCart();
  const router = useRouter();

  // Extract numerical price from "৳1,650"
  const priceNum = parseInt(product.price.replace(/[^\d]/g, ""), 10) || 1500;

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: priceNum,
      priceFormatted: product.price,
      size: selectedSize,
      customName: customName.trim() || undefined,
      customNumber: customNumber.trim() || undefined,
      patches: includePatches ? "Official tournament patches included" : undefined,
      image: product.image,
    });
  };

  const handleProceedToOrder = () => {
    handleAddToCart();
    const params = new URLSearchParams();
    params.set("jersey", product.name);
    params.set("size", selectedSize);
    if (customName.trim()) params.set("name", customName.trim().toUpperCase());
    if (customNumber.trim()) params.set("number", customNumber.trim());
    if (includePatches) params.set("patches", "yes");
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-6 space-y-6">
      {/* 1. Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
            Select Size:
          </label>
          <span className="text-[11px] text-neutral-500">Standard Athletic Fit</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`h-10 min-w-12 rounded-lg border px-3 text-xs font-bold transition-all ${
                selectedSize === size
                  ? "border-[#047857] bg-[#047857] text-white shadow-xs"
                  : "border-neutral-200 bg-white text-neutral-800 hover:border-emerald-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Free Custom Name & Number Customization */}
      <div className="border-t border-neutral-200 pt-4">
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
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-bold uppercase text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#047857]"
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
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-bold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#047857]"
            />
          </div>
        </div>

        <label className="mt-3 flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
          <input
            type="checkbox"
            checked={includePatches}
            onChange={(e) => setIncludePatches(e.target.checked)}
            className="rounded border-neutral-300 text-emerald-700 focus:ring-emerald-600 h-4 w-4"
          />
          <span>Include official tournament sleeve patches (UCL / League / World Cup)</span>
        </label>
      </div>

      {/* 3. Action Buttons */}
      <div className="pt-2 space-y-2.5">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#047857] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#065F46] transition-all"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart — {product.price}
        </button>

        <button
          type="button"
          onClick={handleProceedToOrder}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-900 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-50 transition-colors"
        >
          Buy Now (Direct Checkout)
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="mt-2 text-center text-[11px] text-neutral-500">
          Cash on delivery & home delivery available nationwide across 64 districts
        </p>
      </div>
    </div>
  );
}
