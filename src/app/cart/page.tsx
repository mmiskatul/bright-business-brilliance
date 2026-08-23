"use client";

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
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Section } from "@/components/site/Section";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
  } = useCart();
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen">
      <Section tone="surface">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Pro-Grade Equipment
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 uppercase">
            Your Cart
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600">
            Review your selected football jerseys, customize names and squad numbers, and proceed to
            fast nationwide delivery.
          </p>
        </div>
      </Section>

      <div className="container-page py-10">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-[#F9F9F9] p-12 text-center max-w-lg mx-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-400 mb-4 shadow-xs">
              <ShoppingBag className="h-8 w-8 text-neutral-600" />
            </div>
            <h2 className="text-lg font-bold text-neutral-900">Your equipment cart is empty</h2>
            <p className="mt-2 text-xs text-neutral-500 max-w-xs mx-auto">
              Ready to find your matchday jersey? Explore our latest collection of authentic club
              and national team kits.
            </p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-md bg-[#047857] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#065F46] transition-colors"
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
              <div className="rounded-xl border border-neutral-200 bg-[#F4F5F4] p-5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-800">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-emerald-700" />
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-800">
                        🎉 Free Nationwide Shipping Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add ৳{(freeShippingThreshold - subtotal).toLocaleString()} more for Free
                        Shipping
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-emerald-800">
                    ৳{subtotal.toLocaleString()} / ৳{freeShippingThreshold.toLocaleString()}
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className="h-full bg-[#047857] transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-xs divide-y divide-neutral-100">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-[#F9F9F9] p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs font-bold text-neutral-500 uppercase mt-0.5">
                          Size: {item.size}
                        </p>
                        {item.customName && (
                          <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                            Custom Printing: {item.customName} #{item.customNumber || ""}
                          </p>
                        )}
                        <p className="text-xs text-neutral-400 mt-1 font-mono">
                          Unit: {item.priceFormatted}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-300 rounded-md bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors rounded-l-md"
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
                          className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors rounded-r-md"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <span className="font-display text-base font-black text-neutral-900 min-w-[80px] text-right">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-emerald-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="rounded-xl border border-neutral-200 bg-[#FAFAF8] p-6 h-fit shadow-xs space-y-6">
              <h2 className="font-display text-base font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-neutral-900">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Customization (Name & Number)</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-neutral-900">
                    {subtotal >= freeShippingThreshold ? "FREE" : "৳80 - ৳130"}
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-4 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Total
                </span>
                <span className="font-display text-2xl font-black text-neutral-900">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              <p className="text-[11px] font-mono text-neutral-500">
                Taxes and shipping confirmed on final step. Cash on delivery available across
                Bangladesh.
              </p>

              <button
                type="button"
                onClick={() => router.push("/contact")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#047857] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#065F46] transition-colors"
              >
                Proceed to Secure Checkout
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="rounded-lg bg-white border border-neutral-200 p-3.5 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0" />
                <p className="text-[10px] text-neutral-600 leading-snug">
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
