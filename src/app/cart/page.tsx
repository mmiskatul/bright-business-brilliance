"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  ShoppingBag,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Section } from "@/components/site/Section";

export default function CartPage() {
  const { items, removeItem, updateQuantity, freeShippingThreshold } = useCart();
  const router = useRouter();

  // State to track which item IDs are selected for checkout
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Only keep valid selections when items change, do not auto-select all
  useEffect(() => {
    setSelectedIds((prev) => prev.filter((id) => items.some((it) => it.id === id)));
  }, [items]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((it) => it.id));
    }
  };

  // Selected items calculations
  const selectedItems = items.filter((it) => selectedIds.includes(it.id));
  const selectedSubtotal = selectedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const isAllSelected = items.length > 0 && selectedIds.length === items.length;
  const isNoneSelected = selectedItems.length === 0;

  const freeShippingProgress = Math.min(100, (selectedSubtotal / freeShippingThreshold) * 100);

  const handleProceedCheckout = () => {
    if (isNoneSelected) return;
    try {
      localStorage.setItem("asfa_cart", JSON.stringify(selectedItems));
    } catch {
      // ignore
    }
    router.push("/checkout");
  };

  return (
    <div className="bg-white min-h-screen">
      <Section tone="surface">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
            Pro-Grade Equipment
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 uppercase">
            Your Cart
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-mono">
            Use the checkboxes on the left to select which jerseys you want to check out with.
          </p>
        </div>
      </Section>

      <div className="container-page py-10">
        {items.length === 0 ? (
          <div className="border border-neutral-300 bg-[#F9F9F9] p-12 text-center max-w-lg mx-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-400 mb-4 shadow-xs">
              <ShoppingBag className="h-8 w-8 text-neutral-600" />
            </div>
            <h2 className="text-lg font-bold text-neutral-900 uppercase font-mono">
              Your equipment cart is empty
            </h2>
            <p className="mt-2 text-xs text-neutral-500 font-mono max-w-xs mx-auto">
              Ready to find your matchday jersey? Explore our latest collection of authentic club
              and national team kits.
            </p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#047857] px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#065F46] transition-colors"
              >
                Browse Jersey Catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Left: Cart Items Table / List */}
            <div className="space-y-6">
              {/* Free Shipping Alert Box */}
              <div className="border border-neutral-300 bg-[#F4F5F4] p-5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-800 font-mono">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-emerald-700" />
                    {selectedSubtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-800">
                        🎉 Free Nationwide Shipping Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add ৳{(freeShippingThreshold - selectedSubtotal).toLocaleString()} more for
                        Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-emerald-800">
                    ৳{selectedSubtotal.toLocaleString()} / ৳{freeShippingThreshold.toLocaleString()}
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden bg-neutral-200">
                  <div
                    className="h-full bg-[#047857] transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Select All & Selection Header */}
              <div className="flex items-center justify-between border border-neutral-300 bg-white px-5 py-3.5 text-xs font-mono shadow-2xs">
                <button
                  type="button"
                  onClick={selectAll}
                  className="flex items-center gap-3 font-bold text-neutral-900 hover:text-[#047857] transition-colors cursor-pointer"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center border-2 transition-all rounded-xs ${
                      isAllSelected
                        ? "border-[#047857] bg-[#047857] text-white"
                        : "border-neutral-400 bg-white text-transparent hover:border-black"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span className="uppercase tracking-wider">
                    {isAllSelected ? "Deselect All Products" : "Select All Products"}
                  </span>
                </button>
                <span className="text-neutral-500 font-bold">
                  {selectedIds.length} of {items.length} Selected
                </span>
              </div>

              {/* Items Card */}
              <div className="border border-neutral-300 bg-white divide-y divide-neutral-200 shadow-2xs">
                {items.map((item) => {
                  const isSelected = selectedIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all ${
                        isSelected
                          ? "bg-white"
                          : "bg-neutral-50/80 opacity-50 border-l-4 border-l-transparent"
                      }`}
                    >
                      {/* Left: Prominent Checkbox + Thumbnail + Specs */}
                      <div className="flex items-center gap-4">
                        {/* Checkbox on Far Left */}
                        <button
                          type="button"
                          onClick={() => toggleSelect(item.id)}
                          aria-label={`Select ${item.name} for checkout`}
                          className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 rounded-xs transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#047857] bg-[#047857] text-white shadow-2xs"
                              : "border-neutral-400 bg-white hover:border-black"
                          }`}
                        >
                          {isSelected && <Check className="h-4 w-4 stroke-[3]" />}
                        </button>

                        {/* Thumbnail */}
                        <div className="h-18 w-18 shrink-0 overflow-hidden border border-neutral-200 bg-[#F9F9F9] p-2 flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        {/* Specs */}
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-xs font-bold font-mono text-neutral-500 uppercase mt-0.5">
                            Size: {item.size}
                          </p>
                          {item.customName && (
                            <p className="text-xs text-emerald-700 font-semibold font-mono mt-0.5">
                              Custom: {item.customName} #{item.customNumber || ""}
                            </p>
                          )}
                          <p className="text-xs text-neutral-400 mt-1 font-mono">
                            Unit: {item.priceFormatted}
                          </p>
                        </div>
                      </div>

                      {/* Right: Quantity Selector + Total + Remove */}
                      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto font-mono">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-neutral-300 bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-neutral-900 min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <span className="font-display text-sm font-black text-neutral-900 min-w-[75px] text-right">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </span>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 hover:text-emerald-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="border border-neutral-300 bg-white p-6 h-fit shadow-2xs space-y-6">
              <h2 className="font-mono text-base font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between text-neutral-600">
                  <span>Selected Products</span>
                  <span className="font-bold text-neutral-900">
                    {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-neutral-900">
                    ৳{selectedSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-neutral-900">
                    {selectedSubtotal >= freeShippingThreshold ? "FREE" : "৳80 - ৳130"}
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-4 flex items-center justify-between font-mono">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Total
                </span>
                <span className="font-display text-2xl font-black text-neutral-900">
                  ৳{selectedSubtotal.toLocaleString()}
                </span>
              </div>

              {isNoneSelected ? (
                <div className="p-3 border border-amber-300 bg-amber-50 text-amber-900 text-xs font-mono leading-relaxed">
                  ⚠️ Please check at least one product on the left to enable checkout.
                </div>
              ) : (
                <p className="text-[11px] font-mono text-neutral-500 leading-relaxed">
                  Taxes and shipping confirmed on final step. Cash on Delivery available across all
                  64 districts.
                </p>
              )}

              {/* Checkout Button (Disabled when nothing is selected) */}
              <button
                type="button"
                onClick={handleProceedCheckout}
                disabled={isNoneSelected}
                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isNoneSelected
                    ? "bg-neutral-200 text-neutral-400 border border-neutral-300 cursor-not-allowed opacity-60"
                    : "bg-[#047857] hover:bg-[#065F46] text-white shadow-xs"
                }`}
              >
                {isNoneSelected
                  ? "Select Products to Checkout"
                  : `Proceed to Secure Checkout (${selectedItems.length})`}
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="bg-[#F9FAF9] border border-neutral-200 p-3.5 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0" />
                <p className="text-[10px] font-mono text-neutral-600 leading-snug">
                  <strong>Guaranteed Quality:</strong> 100% inspection before dispatch. Cash on
                  Delivery in all 64 districts.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
