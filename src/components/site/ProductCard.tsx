"use client";

import { useRouter } from "next/navigation";
import { Eye, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/site";

interface ProductCardProps {
  product: Product;
  featuredBadge?: string;
}

export function ProductCard({ product, featuredBadge }: ProductCardProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  // Parse numeric price from string "৳1,750" -> 1750
  const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ""), 10) || 1500;
  const defaultSize = product.sizes.includes("L")
    ? "L"
    : product.sizes.includes("M")
      ? "M"
      : product.sizes[0] || "L";

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    addItem({
      slug: product.slug,
      name: product.name,
      price: numericPrice,
      priceFormatted: product.price,
      size: defaultSize,
      image: product.image,
    });

    toast.success(`Added ${product.name} to Cart`, {
      description: `Size ${defaultSize} added. Click cart to checkout or customize.`,
      action: {
        label: "View Cart",
        onClick: () => openCart(),
      },
    });
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/products/${product.slug}`);
  };

  const displayBadge = featuredBadge || product.badge;

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between overflow-hidden border border-neutral-300 bg-white transition-all duration-200 hover:border-neutral-400 hover:shadow-xs cursor-pointer"
    >
      {/* ─── Top: Image Container ─── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFEFEF] flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.imageAlt || product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge on Top Left */}
        {displayBadge && (
          <span className="absolute top-2.5 left-2.5 border border-neutral-300 bg-white/95 px-2 py-0.5 text-[10px] font-mono font-bold text-neutral-800 shadow-2xs">
            {displayBadge}
          </span>
        )}

        {/* Quick Action Floating Buttons (Appear smoothly on hover) */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10">
          {/* Quick View Button */}
          <button
            type="button"
            onClick={handleViewClick}
            aria-label={`View details for ${product.name}`}
            title="View Details"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 shadow-xs hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Quick Add to Cart Button */}
          <button
            type="button"
            onClick={handleQuickAddToCart}
            aria-label={`Add ${product.name} to cart`}
            title="Quick Add to Cart"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#047857] text-white shadow-xs hover:bg-[#065f46] transition-colors cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ─── Middle: Card Body ─── */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
          {product.category}
        </span>

        <h3 className="mt-1 text-sm sm:text-base font-bold text-neutral-900 leading-snug group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>

        <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600 line-clamp-2">
          {product.summary}
        </p>

        {/* Sizes Available Row */}
        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-[11px] font-mono">
          <span className="text-neutral-500">Sizes Available:</span>
          <div className="flex gap-1">
            {["S", "M", "L", "XL", "XXL"].map((size) => {
              const isAvailable = product.sizes.includes(size);
              const isFeatured = size === "L" || size === "M";
              return (
                <span
                  key={size}
                  className={`flex h-5 w-5 items-center justify-center border text-[9px] font-bold ${
                    isAvailable && isFeatured
                      ? "border-black bg-black text-white"
                      : isAvailable
                        ? "border-neutral-300 bg-neutral-50 text-neutral-800"
                        : "border-neutral-200 bg-neutral-100 text-neutral-300 opacity-40"
                  }`}
                >
                  {size}
                </span>
              );
            })}
          </div>
        </div>

        {/* Bottom: Price Row (Clean) */}
        <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-base font-black text-neutral-900">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono font-normal text-neutral-400 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
