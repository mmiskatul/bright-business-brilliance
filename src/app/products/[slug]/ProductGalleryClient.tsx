"use client";

import { useState } from "react";

interface ProductGalleryProps {
  image: string;
  backImage?: string;
  galleryImages?: { label: string; url: string }[];
  imageAlt: string;
  badge?: string;
}

export function ProductGalleryClient({
  image,
  backImage,
  galleryImages,
  imageAlt,
  badge = "NEW ARRIVAL",
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(image);

  // Build thumbnail list
  const thumbnails: { label: string; url: string }[] = [];
  if (galleryImages && galleryImages.length > 0) {
    thumbnails.push(...galleryImages);
  } else {
    thumbnails.push({ label: "Front", url: image });
    if (backImage) {
      thumbnails.push({ label: "Back", url: backImage });
    }
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
      {/* Left Vertical Thumbnails */}
      {thumbnails.length > 1 && (
        <div className="flex sm:flex-col gap-2 shrink-0">
          {thumbnails.map((thumb, idx) => {
            const isActive = activeImage === thumb.url;
            return (
              <button
                key={thumb.url + idx}
                type="button"
                onClick={() => setActiveImage(thumb.url)}
                className={`h-14 w-14 sm:h-16 sm:w-16 overflow-hidden border p-1 bg-[#F9F9F9] transition-all cursor-pointer ${
                  isActive
                    ? "border-black ring-1 ring-black"
                    : "border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100"
                }`}
              >
                <img src={thumb.url} alt={thumb.label} className="h-full w-full object-contain" />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Showcase Image */}
      <div className="relative flex-1 overflow-hidden border border-neutral-300 bg-[#EFEFEF] flex items-center justify-center p-4 aspect-[3/4] sm:aspect-[4/5]">
        {badge && (
          <span className="absolute top-3 left-3 bg-black px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-white shadow-2xs">
            {badge}
          </span>
        )}
        <img
          src={activeImage}
          alt={imageAlt}
          className="h-full w-full object-contain transition-all duration-300"
        />
      </div>
    </div>
  );
}
