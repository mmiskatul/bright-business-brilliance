"use client";

import { useState } from "react";

interface ProductGalleryProps {
  image: string;
  backImage?: string;
  galleryImages?: { label: string; url: string }[];
  imageAlt: string;
}

export function ProductGalleryClient({
  image,
  backImage,
  galleryImages,
  imageAlt,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(image);

  // Build list of thumbnails
  const thumbnails: { label: string; url: string }[] = [];
  if (galleryImages && galleryImages.length > 0) {
    thumbnails.push(...galleryImages);
  } else {
    thumbnails.push({ label: "Front View", url: image });
    if (backImage) {
      thumbnails.push({ label: "Back View", url: backImage });
    }
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-border bg-neutral-50 shadow-soft">
        <img
          src={activeImage}
          alt={imageAlt}
          width={1200}
          height={900}
          className="w-full h-full object-cover aspect-[4/3] transition-all duration-300"
        />
      </div>

      {thumbnails.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {thumbnails.map((thumb) => {
            const isActive = activeImage === thumb.url;
            return (
              <button
                key={thumb.url + thumb.label}
                type="button"
                onClick={() => setActiveImage(thumb.url)}
                className={`overflow-hidden rounded-xl border p-1 transition-all ${
                  isActive
                    ? "border-emerald-600 ring-2 ring-emerald-600/30 bg-emerald-50/40"
                    : "border-border hover:border-emerald-300 bg-white"
                }`}
              >
                <img
                  src={thumb.url}
                  alt={thumb.label}
                  className="h-16 w-full object-cover rounded-lg aspect-[4/3]"
                />
                <span className="block text-[10px] font-bold text-center mt-1 text-neutral-800 truncate px-1">
                  {thumb.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-white p-3 text-center">
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Fabric</span>
          <p className="text-xs font-bold text-neutral-900 mt-0.5">180 GSM Mesh</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-3 text-center">
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Printing</span>
          <p className="text-xs font-bold text-neutral-900 mt-0.5">Heat-Sealed</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-3 text-center">
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Dispatch</span>
          <p className="text-xs font-bold text-neutral-900 mt-0.5">24–48h Delivery</p>
        </div>
      </div>
    </div>
  );
}
