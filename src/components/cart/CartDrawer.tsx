"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Trash2, Truck, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
  } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    closeCart();
    router.push("/contact");
  };

  const handleViewFullCart = () => {
    closeCart();
    router.push("/cart");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 p-6 pb-4">
          <div>
            <h2 className="font-display text-xl font-black tracking-tight text-neutral-900 uppercase">
              Your Cart
            </h2>
            <p className="text-[11px] font-semibold tracking-widest text-neutral-500 uppercase mt-0.5">
              Pro-Grade Equipment
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            aria-label="Close Cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="border-b border-neutral-200 bg-[#F4F5F4] p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800">
            <Truck className="h-4 w-4 text-emerald-700" />
            {subtotal >= freeShippingThreshold ? (
              <span className="text-emerald-800">You unlocked Free Nationwide Shipping!</span>
            ) : (
              <span>Free shipping on orders over ৳{freeShippingThreshold.toLocaleString()}</span>
            )}
          </div>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full bg-[#047857] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <p className="text-base font-bold text-neutral-900">Your cart is empty</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Explore our player edition matchday jerseys and custom tournament teamwear.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  router.push("/products");
                }}
                className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-[#047857] px-4 py-2 text-xs font-bold uppercase text-white shadow-xs"
              >
                Browse Jerseys
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-neutral-100 pb-5 last:border-b-0"
              >
                {/* Thumbnail */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-[#F9F9F9] p-1.5">
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-bold text-neutral-900 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-bold text-neutral-500 uppercase mt-0.5">
                        Size: {item.size}
                      </p>
                      {item.customName && (
                        <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                          Custom: {item.customName} #{item.customNumber || ""}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-neutral-300 rounded-md bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 transition-colors rounded-l-md"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-neutral-900 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 transition-colors rounded-r-md"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="font-display text-sm font-black text-neutral-900">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Actions */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 bg-white p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                Subtotal
              </span>
              <span className="font-display text-2xl font-black text-neutral-900">
                ৳{subtotal.toLocaleString()}
              </span>
            </div>

            <p className="text-[11px] font-mono text-neutral-500">
              Taxes and shipping calculated at checkout.
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#047857] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#065F46] transition-colors"
              >
                Secure Checkout
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleViewFullCart}
                className="w-full inline-flex items-center justify-center rounded-md border border-neutral-900 bg-white py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                View Full Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
