"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Layers, Sparkles, ShieldCheck } from "lucide-react";
import { type Product } from "@/data/site";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export function ProductOrderClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem, openCart } = useCart();
  const router = useRouter();

  const priceNum = parseInt(product.price.replace(/[^\d]/g, ""), 10) || 1500;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        slug: product.slug,
        name: product.name,
        price: priceNum,
        priceFormatted: product.price,
        size: selectedSize,
        image: product.image,
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    const params = new URLSearchParams();
    params.set("jersey", product.name);
    params.set("size", selectedSize);
    params.set("quantity", quantity.toString());
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Size Selection Header */}
      <div>
        <div className="flex items-center justify-between mb-2 text-xs font-mono">
          <span className="font-bold uppercase tracking-wider text-neutral-800">Select Size</span>
          <a
            href="#size-chart"
            className="text-neutral-500 underline hover:text-neutral-900 transition-colors"
          >
            Size Guide
          </a>
        </div>

        {/* Square Size Selectors */}
        <div className="flex gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => {
            const isAvailable = product.sizes.includes(size);
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                disabled={!isAvailable}
                onClick={() => setSelectedSize(size)}
                className={`flex h-9 w-10 sm:h-10 sm:w-11 items-center justify-center border font-mono text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "border-black bg-black text-white"
                    : isAvailable
                      ? "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-500"
                      : "border-neutral-200 bg-neutral-100 text-neutral-300 opacity-40 cursor-not-allowed"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Quantity Selector */}
      <div>
        <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-800 mb-2">
          Quantity
        </span>
        <div className="flex items-center border border-neutral-300 bg-white w-fit">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="px-4 text-xs font-mono font-bold text-neutral-900 min-w-[28px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Action Buttons (Add To Cart & Buy Now) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex items-center justify-center gap-2 bg-[#047857] py-3.5 px-4 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#065F46] transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="inline-flex items-center justify-center bg-black py-3.5 px-4 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-neutral-800 transition-colors"
        >
          Buy Now
        </button>
      </div>

      {/* 4. Pro Features Info Box */}
      <div className="border border-neutral-300 p-4 divide-y divide-neutral-200 text-xs space-y-3 font-mono">
        <div className="grid grid-cols-2 gap-4 pb-1">
          <div className="flex items-start gap-2.5">
            <Layers className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-neutral-900 uppercase text-[10px]">180 GSM MESH</p>
              <p className="text-neutral-500 text-[10px] mt-0.5 leading-tight">
                Ultra-breathable micro-knit
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-neutral-900 uppercase text-[10px]">FULL SUBLIMATION</p>
              <p className="text-neutral-500 text-[10px] mt-0.5 leading-tight">
                Fade-resistant graphics
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-neutral-900 uppercase text-[10px]">PRO-GRADE STITCHING</p>
            <p className="text-neutral-500 text-[10px] mt-0.5 leading-relaxed">
              Reinforced seams designed for intense matchday conditions and continuous wash cycles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
