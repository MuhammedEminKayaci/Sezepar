"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductImageUrl } from "@/lib/supabase";

interface ProductData {
  oem_code: string;
  brand: string;
  name: string;
  slug: string;
  brand_slug: string;
  image_path?: string;
  category: string;
}

export function ProductSlider({ products }: { products: ProductData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 260;
    el.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative group/slider">
      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 border border-amber-200 flex items-center justify-center text-amber-600 hover:bg-amber-50 shadow-lg shadow-amber-500/10 transition-all backdrop-blur-sm -translate-x-3 opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0"
          aria-label="Geri"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 border border-amber-200 flex items-center justify-center text-amber-600 hover:bg-amber-50 shadow-lg shadow-amber-500/10 transition-all backdrop-blur-sm translate-x-3 opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0"
          aria-label="İleri"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Gradient masks */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((p) => (
          <Link
            key={`${p.brand_slug}-${p.slug}`}
            href={`/${p.brand_slug}/${p.slug}`}
            className="group flex-none w-[220px] md:w-[240px] bg-white border border-amber-100 rounded-2xl overflow-hidden hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300"
            style={{ scrollSnapAlign: "start" }}
          >
            {/* Image */}
            <div className="relative aspect-square bg-amber-50/30 overflow-hidden">
              {p.image_path ? (
                <Image
                  src={getProductImageUrl(p.image_path || '')}
                  alt={p.name}
                  fill
                  className="object-contain p-5 group-hover:scale-110 transition-transform duration-500"
                  sizes="240px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#d1d5db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              )}
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="text-xs font-mono text-amber-600 mb-1.5 tracking-wide">
                {p.oem_code}
              </div>
              <h3 className="text-sm text-[#374151] line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors min-h-[2.5em]">
                {p.name}
              </h3>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#9ca3af]">
                  <span className="font-medium">{p.brand}</span>
                  <span>·</span>
                  <span className="truncate max-w-[80px]">{p.category.split(" > ").pop()}</span>
                </div>
                <svg className="w-4 h-4 text-[#d1d5db] group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
