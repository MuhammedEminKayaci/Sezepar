"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SITE_CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Caterpillar", href: "/caterpillar" },
  { name: "JCB", href: "/jcb" },
  { name: "Bobcat", href: "/bobcat" },
  { name: "Manitou", href: "/manitou" },
  { name: "Merlo", href: "/merlo" },
  { name: "Kategoriler", href: "/kategoriler" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

  // Focus search input when overlay opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // ESC to close search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setMobileOpen(false); }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      setSearchOpen(false);
      router.push(`/arama?q=${encodeURIComponent(q)}`);
    }
  }, [searchQuery, router]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-amber-200/60"
            : "bg-white/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-[72px] sm:h-20">

            {/* ─ Logo ─ */}
            <Link href="/" className="shrink-0 flex items-center mr-6 group opacity-90 hover:opacity-100 transition-opacity duration-200">
              <Image
                src="/logo-sezepar.png"
                alt="SEZEPAR - İş Makinesi Yedek Parça"
                width={990}
                height={615}
                className="h-20 w-auto object-contain"
                priority
              />
            </Link>

            {/* ─ Desktop Navigation (center) ─ */}
            <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 xl:px-3.5 py-2 text-[13px] font-medium text-[#6b7280] hover:text-amber-700 rounded-lg hover:bg-amber-50 transition-all duration-200 group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-full group-hover:w-5 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* ─ Right Actions ─ */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 h-9 px-3 rounded-xl text-[#374151] bg-[#f3f4f6] border border-[#e5e7eb] hover:text-amber-600 hover:bg-amber-50 hover:border-amber-200 transition-all duration-200 group md:bg-transparent md:border-transparent md:text-[#9ca3af]"
                aria-label="Arama"
              >
                <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden lg:inline text-[12px] text-[#9ca3af] group-hover:text-[#6b7280] transition-colors">
                  Ara...
                </span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-[#9ca3af] bg-[#f3f4f6] border border-[#e5e7eb] rounded-md font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Phone */}
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="hidden xl:flex items-center gap-1.5 h-9 px-3 rounded-xl text-[#6b7280] hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-[12px]">{SITE_CONFIG.phone}</span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Merhaba, yedek parça hakkında bilgi almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-green-600 hover:text-green-500 hover:bg-green-50 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              {/* CTA */}
              <Link
                href="/iletisim"
                className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-[13px] font-bold px-4 py-2 rounded-xl shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25 transition-all duration-300"
              >
                Teklif Al
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border ${
                  mobileOpen
                    ? "text-amber-600 bg-amber-50 border-amber-200"
                    : "text-[#374151] bg-[#f3f4f6] border-[#e5e7eb] hover:text-amber-600 hover:bg-amber-50 hover:border-amber-200"
                }`}
                aria-label="Menü"
              >
                <div className="flex flex-col items-center justify-center w-[18px] gap-[5px]">
                  <span className={`block h-[2px] w-full bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                  <span className={`block h-[2px] w-full bg-current rounded-full transition-all duration-200 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                  <span className={`block h-[2px] w-full bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* ── Mobile Menu — üstten aşağı açılan tam genişlik dropdown ── */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 top-20 z-[998] transition-opacity duration-300 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Menu panel */}
      <div
        className={`md:hidden fixed left-0 right-0 top-20 z-[999] transition-all duration-300 ease-out origin-top ${
          mobileOpen
            ? "opacity-100 translate-y-0 scale-y-100"
            : "opacity-0 -translate-y-3 scale-y-95 pointer-events-none"
        }`}
      >
        {/* Outer border container */}
        <div className="mx-3 rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">

          {/* Amber accent top bar */}
          <div className="h-[3px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

          {/* Nav links */}
          <nav className="px-2 pt-3 pb-2">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-[15px] font-medium text-[#374151] hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-150 group"
                style={{ transitionDelay: mobileOpen ? `${i * 30}ms` : "0ms" }}
              >
                <span>{link.name}</span>
                <svg
                  className="w-4 h-4 text-[#d1d5db] group-hover:text-amber-400 transition-colors"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="mx-4 border-t border-[#f3f4f6]" />

          {/* Contact row */}
          <div className="px-2 py-2">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f9fafb] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-[12px] text-[#9ca3af] leading-none mb-0.5">Bizi Arayın</div>
                <div className="text-[14px] font-semibold text-[#111827] group-hover:text-amber-600 transition-colors">{SITE_CONFIG.phone}</div>
              </div>
            </a>
          </div>

          {/* Divider */}
          <div className="mx-4 border-t border-[#f3f4f6]" />

          {/* CTA buttons */}
          <div className="px-3 py-3 grid grid-cols-2 gap-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Merhaba, yedek parça hakkında bilgi almak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13px] font-bold px-4 py-3 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <Link
              href="/iletisim"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-[13px] font-bold px-4 py-3 rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Teklif Al
            </Link>
          </div>
        </div>
      </div>

      {/* ── Search Overlay (Spotlight style) ── */}
      <div
        className={`fixed inset-0 z-[1000] transition-all duration-300 ${
          searchOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-xl"
          onClick={() => setSearchOpen(false)}
        />

        {/* Search Panel */}
        <div className={`relative max-w-2xl mx-auto mt-[15vh] px-4 transition-all duration-300 ease-out ${searchOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-8 scale-95 opacity-0"}`}>
          <form onSubmit={handleSearch} className="relative">
            <div className="relative bg-white border border-[#e5e7eb] rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
              {/* Input Row */}
              <div className="flex items-center px-5 gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="OEM kodu veya parça adı ile arayın..."
                  className="flex-1 h-14 bg-transparent text-[#111827] text-base placeholder-[#9ca3af] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="w-6 h-6 rounded-md bg-[#f3f4f6] flex items-center justify-center text-[#9ca3af] hover:text-[#111827] transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Bottom hint */}
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#e5e7eb] bg-[#f9fafb]">
                <span className="text-[11px] text-[#9ca3af]">
                  15.000+ ürün arasında arayın
                </span>
                <div className="flex items-center gap-2">
                  <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] text-[#6b7280] bg-white border border-[#e5e7eb] rounded font-mono">
                    Enter
                  </kbd>
                  <span className="text-[10px] text-[#9ca3af]">ara</span>
                  <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] text-[#6b7280] bg-white border border-[#e5e7eb] rounded font-mono">
                    ESC
                  </kbd>
                  <span className="text-[10px] text-[#9ca3af]">kapat</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
