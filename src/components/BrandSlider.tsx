"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandData {
  slug: string;
  name: string;
  count: number;
}

interface BrandSliderProps {
  brands: BrandData[];
}

const BRAND_LOGO_PATHS: Record<string, string> = {
  caterpillar: "/logos/caterpillar.png",
  jcb: "/logos/jcb.png",
  bobcat: "/logos/bobcat.svg",
  manitou: "/logos/manitou.png",
  merlo: "/logos/merlo.png",
};

const BRAND_COLORS_MAP: Record<string, string> = {
  caterpillar: "#FFCD11",
  jcb: "#FFB800",
  bobcat: "#E31937",
  manitou: "#E2001A",
  merlo: "#009639",
};

const BRAND_BG_IMAGES: Record<string, string> = {
  caterpillar: "/brand-bg/caterpillar.jpg",
  jcb: "/brand-bg/jcb.jpg",
  bobcat: "/brand-bg/bobcat.jpg",
  manitou: "/brand-bg/manitou.jpg",
  merlo: "/brand-bg/merlo.jpg",
};

const BRAND_DESCRIPTIONS: Record<string, string> = {
  caterpillar: "Ekskavatör & Yükleyici",
  jcb: "Kazıcı & Yükleyici",
  bobcat: "Mini Yükleyici",
  manitou: "Teleskopik Yükleyici",
  merlo: "Teleskopik Forklift",
};

export function BrandSlider({ brands }: BrandSliderProps) {
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
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <div className="relative group/slider overflow-x-clip">
      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 border border-[#e5e7eb] flex items-center justify-center text-[#374151] hover:bg-[#f9fafb] shadow-lg transition-all backdrop-blur-sm -translate-x-4 opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0"
          aria-label="Geri"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 border border-[#e5e7eb] flex items-center justify-center text-[#374151] hover:bg-[#f9fafb] shadow-lg transition-all backdrop-blur-sm translate-x-4 opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0"
          aria-label="İleri"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth py-6 -mx-6 px-6"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {brands.map((b) => {
          const color = BRAND_COLORS_MAP[b.slug] || "#f59e0b";
          const bgImage = BRAND_BG_IMAGES[b.slug];

          return (
            <Link
              key={b.slug}
              href={`/${b.slug}`}
              className="group relative flex-none w-[280px] md:w-[300px] h-[400px] bg-white border border-[#e5e7eb] rounded-3xl overflow-hidden hover:border-[#d1d5db] hover:shadow-xl transition-all duration-500"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* ── Arka Plan: Stok Makine Görseli ── */}
              {bgImage && (
                <div className="absolute inset-0">
                  <Image
                    src={bgImage}
                    alt=""
                    fill
                    className="object-cover opacity-[0.15] group-hover:opacity-[0.25] group-hover:scale-105 transition-all duration-700"
                    sizes="300px"
                  />
                </div>
              )}

              {/* ── Renk Gradient Overlay ── */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `
                    radial-gradient(ellipse at 50% 0%, ${color}10, transparent 50%),
                    radial-gradient(ellipse at 50% 100%, ${color}08, transparent 50%),
                    linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.9) 100%)
                  `,
                }}
              />

              {/* ── İçerik ── */}
              <div className="relative h-full flex flex-col z-10">

                {/* Üst: Logo — sabit yükseklik, tam ortala */}
                <div className="flex-1 flex flex-col items-center justify-center px-6 pt-8">
                  <div className="w-full h-16 flex items-center justify-center mb-4">
                    <Image
                      src={BRAND_LOGO_PATHS[b.slug] || "/logos/caterpillar.png"}
                      alt={`${b.name} logo`}
                      width={200}
                      height={64}
                      className="max-h-14 max-w-[180px] w-auto h-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                      priority
                    />
                  </div>
                  <span className="text-xs text-[#9ca3af] font-medium tracking-wider uppercase text-center">
                    {BRAND_DESCRIPTIONS[b.slug] || "İş Makinesi"}
                  </span>
                </div>

                {/* Alt: İstatistik + CTA */}
                <div className="px-6 pb-6">
                  {/* Renk çizgi */}
                  <div
                    className="h-[2px] mb-5 rounded-full"
                    style={{
                      background: `linear-gradient(to right, transparent, ${color}60, transparent)`,
                    }}
                  />

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-black text-[#111827] leading-none">
                        {b.count.toLocaleString("tr-TR")}
                      </div>
                      <div className="text-[11px] text-[#9ca3af] mt-1 font-medium">yedek parça</div>
                    </div>

                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${color}15`,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      <svg
                        className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                        style={{ color }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${color}20, 0 0 40px ${color}06`,
                }}
              />
            </Link>
          );
        })}
        {/* Spacer so last card shadow isn't clipped */}
        <div className="flex-none w-4" aria-hidden="true" />
      </div>
    </div>
  );
}
