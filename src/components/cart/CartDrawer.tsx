"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { X, Trash2, Truck, Plus, Minus, ArrowRight, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, freeShippingThreshold } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  // Track which item IDs are selected for checkout
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Only retain valid selections, do not auto-select all items by default
  useEffect(() => {
    setSelectedIds((prev) => prev.filter((id) => items.some((it) => it.id === id)));
  }, [items]);

  useEffect(() => {
    if (pathname === "/checkout" && isOpen) {
      closeCart();
    }
  }, [pathname, isOpen, closeCart]);

  if (!isOpen || pathname === "/checkout") return null;

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

  const selectedItems = items.filter((it) => selectedIds.includes(it.id));
  const selectedSubtotal = selectedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const isNoneSelected = selectedItems.length === 0;
  const isAllSelected = items.length > 0 && selectedIds.length === items.length;
  const freeShippingProgress = Math.min(100, (selectedSubtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    if (isNoneSelected) return;
    try {
      localStorage.setItem("asfa_cart", JSON.stringify(selectedItems));
    } catch {
      // ignore
    }
    closeCart();
    router.push("/checkout");
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
        <div className="flex items-start justify-between border-b border-neutral-200 p-5 sm:p-6 pb-4">
          <div>
            <h2 className="font-display text-xl font-black tracking-tight text-neutral-900 uppercase">
              Your Cart
            </h2>
            <p className="text-[11px] font-mono font-semibold tracking-widest text-neutral-500 uppercase mt-0.5">
              Pro-Grade Equipment ({selectedIds.length}/{items.length} Selected)
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="Close Cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="border-b border-neutral-200 bg-[#F4F5F4] p-4">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-neutral-800">
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-emerald-700" />
              {selectedSubtotal >= freeShippingThreshold ? (
                <span className="text-emerald-800">Free Shipping Unlocked!</span>
              ) : (
                <span>Free shipping over ৳{freeShippingThreshold.toLocaleString()}</span>
              )}
            </span>
            <span className="text-emerald-800">৳{selectedSubtotal.toLocaleString()}</span>
          </div>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden bg-neutral-200">
            <div
              className="h-full bg-[#047857] transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Select All Bar (if multiple items) */}
        {items.length > 1 && (
          <div className="flex items-center justify-between border-b border-neutral-200 bg-[#FAFAF8] px-5 py-2 text-xs font-mono">
            <button
              type="button"
              onClick={selectAll}
              className="flex items-center gap-2 font-bold text-neutral-800 hover:text-[#047857] transition-colors cursor-pointer"
            >
              <span
                className={`flex h-4 w-4 items-center justify-center border-2 transition-all rounded-xs ${
                  isAllSelected
                    ? "border-[#047857] bg-[#047857] text-white"
                    : "border-neutral-400 bg-white text-transparent"
                }`}
              >
                <Check className="h-3 w-3 stroke-[3]" />
              </span>
              <span className="uppercase text-[11px]">
                {isAllSelected ? "Deselect All" : "Select All"}
              </span>
            </button>
            <span className="text-neutral-500 text-[11px]">
              {selectedIds.length} item{selectedIds.length === 1 ? "" : "s"} selected
            </span>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 mb-4">
                <ShoppingBag className="h-8 w-8 text-neutral-600" />
              </div>
              <p className="text-base font-bold text-neutral-900 font-mono uppercase">
                Your cart is empty
              </p>
              <p className="text-xs text-neutral-500 font-mono mt-1 max-w-xs">
                Explore our player edition matchday jerseys and custom tournament teamwear.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  router.push("/products");
                }}
                className="mt-5 inline-flex items-center gap-1.5 bg-[#047857] px-4 py-2 text-xs font-mono font-bold uppercase text-white shadow-xs hover:bg-[#065f46] transition-colors cursor-pointer"
              >
                Browse Jerseys
              </button>
            </div>
          ) : (
            items.map((item) => {
              const isSelected = selectedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3.5 border-b border-neutral-100 pb-5 last:border-b-0 transition-all ${
                    isSelected ? "opacity-100" : "opacity-45"
                  }`}
                >
                  {/* Checkbox on Far Left */}
                  <button
                    type="button"
                    onClick={() => toggleSelect(item.id)}
                    aria-label={`Select ${item.name} for checkout`}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 rounded-xs transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#047857] bg-[#047857] text-white shadow-2xs"
                        : "border-neutral-400 bg-white hover:border-black"
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </button>

                  {/* Thumbnail */}
                  <div className="relative h-18 w-18 shrink-0 overflow-hidden border border-neutral-200 bg-[#F9F9F9] p-1.5 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-neutral-900 leading-snug truncate">
                          {item.name}
                        </h3>
                        <p className="text-[11px] font-mono font-bold text-neutral-500 uppercase mt-0.5">
                          SIZE: {item.size}
                        </p>
                        {item.customName && (
                          <p className="text-[10px] font-mono text-emerald-700 font-semibold mt-0.5 truncate">
                            Custom: {item.customName} #{item.customNumber || ""}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1 shrink-0 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3 font-mono">
                      <div className="flex items-center border border-neutral-300 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 text-neutral-600 hover:bg-neutral-100 transition-colors"
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
                          className="px-2 py-1 text-neutral-600 hover:bg-neutral-100 transition-colors"
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
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout Actions */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 bg-white p-5 sm:p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between font-mono">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                SUBTOTAL
              </span>
              <span className="font-display text-2xl font-black text-neutral-900">
                ৳{selectedSubtotal.toLocaleString()}
              </span>
            </div>

            <p className="text-[11px] font-mono text-neutral-500">
              Taxes and shipping calculated at checkout.
            </p>

            <div className="space-y-2.5 pt-1 font-mono">
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isNoneSelected}
                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isNoneSelected
                    ? "bg-neutral-200 text-neutral-400 border border-neutral-300 cursor-not-allowed"
                    : "bg-[#047857] hover:bg-[#065F46] text-white shadow-xs"
                }`}
              >
                {isNoneSelected
                  ? "Select Items to Checkout"
                  : `SECURE CHECKOUT (${selectedItems.length})`}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleViewFullCart}
                className="w-full inline-flex items-center justify-center border border-neutral-900 bg-white hover:bg-neutral-50 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors cursor-pointer"
              >
                VIEW FULL CART
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
