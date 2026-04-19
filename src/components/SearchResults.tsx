"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useCallback } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import type { Product } from "@/types";

const ITEMS_PER_PAGE = 24;

export function SearchResults({ allProducts }: { allProducts: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const marka = searchParams.get("marka") || "";
  const sayfa = parseInt(searchParams.get("sayfa") || "1", 10);
  const currentPage = isNaN(sayfa) || sayfa < 1 ? 1 : sayfa;

  const [inputValue, setInputValue] = useState(query);

  // Search logic
  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return allProducts.filter(
      (p) =>
        p.oem_code.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        (p.name_en && p.name_en.toLowerCase().includes(q))
    );
  }, [query, allProducts]);

  // Brand counts for filters
  const brandCounts = useMemo(() => {
    const map = new Map<string, { name: string; slug: string; count: number }>();
    for (const p of searchResults) {
      const existing = map.get(p.brand_slug);
      if (existing) {
        existing.count++;
      } else {
        map.set(p.brand_slug, { name: p.brand, slug: p.brand_slug, count: 1 });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [searchResults]);

  // Apply brand filter
  const filtered = useMemo(() => {
    if (!marka) return searchResults;
    return searchResults.filter((p) => p.brand_slug === marka);
  }, [searchResults, marka]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const page = Math.min(currentPage, totalPages || 1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const products = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Build base URL for pagination
  const baseUrl = marka
    ? `/arama?q=${encodeURIComponent(query)}&marka=${marka}`
    : `/arama?q=${encodeURIComponent(query)}`;

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = inputValue.trim();
      if (q) {
        router.push(`/arama?q=${encodeURIComponent(q)}`);
      }
    },
    [inputValue, router]
  );

  const handleBrandFilter = useCallback(
    (brandSlug: string) => {
      if (brandSlug === marka) {
        router.push(`/arama?q=${encodeURIComponent(query)}`);
      } else {
        router.push(`/arama?q=${encodeURIComponent(query)}&marka=${brandSlug}`);
      }
    },
    [query, marka, router]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#9ca3af] mb-6">
        <Link href="/" className="hover:text-[#111827] transition-colors">
          Ana Sayfa
        </Link>
        <span>/</span>
        <span className="text-[#111827] font-medium">Arama</span>
      </nav>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="OEM kodu veya parça adı ile arayın..."
            className="w-full h-14 pl-12 pr-32 bg-white border border-[#e5e7eb] rounded-xl text-[#111827] text-lg placeholder-[#9ca3af] focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
            autoFocus
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors text-sm"
          >
            Ara
          </button>
        </div>
      </form>

      {/* Results Header */}
      {query && (
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-1">
            &ldquo;{query}&rdquo; için sonuçlar
          </h1>
          <p className="text-[#6b7280]">
            {filtered.length.toLocaleString("tr-TR")} ürün bulundu
            {marka && (
              <span>
                {" "}
                ·{" "}
                <button
                  onClick={() => router.push(`/arama?q=${encodeURIComponent(query)}`)}
                  className="text-amber-500 hover:text-amber-400 transition-colors"
                >
                  Filtreyi kaldır ✕
                </button>
              </span>
            )}
          </p>
        </div>
      )}

      {/* Content */}
      {query ? (
        searchResults.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Brand Filters - Sidebar */}
            {brandCounts.length > 1 && (
              <div className="lg:w-56 shrink-0">
                <div className="bg-white border border-[#e5e7eb] rounded-xl p-4 lg:sticky lg:top-24">
                  <h3 className="text-sm font-semibold text-[#111827] mb-3">Markaya Göre</h3>
                  <div className="space-y-1">
                    {brandCounts.map((b) => (
                      <button
                        key={b.slug}
                        onClick={() => handleBrandFilter(b.slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          marka === b.slug
                            ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                            : "text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]"
                        }`}
                      >
                        <span>{b.name}</span>
                        <span className="text-xs text-[#9ca3af]">{b.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((p) => (
                  <ProductCard key={`${p.brand_slug}-${p.slug}`} product={p} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl={baseUrl}
              />
            </div>
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-20">
            <svg
              className="w-20 h-20 mx-auto mb-6 text-[#d1d5db]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 className="text-xl font-bold text-[#111827] mb-2">Sonuç Bulunamadı</h2>
            <p className="text-[#6b7280] mb-6 max-w-md mx-auto">
              &ldquo;{query}&rdquo; araması için sonuç bulunamadı. Farklı bir OEM kodu veya parça adı deneyebilirsiniz.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              {["Filtre", "Pompa", "Conta Takımı", "Conta", "Piston"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInputValue(s);
                    router.push(`/arama?q=${encodeURIComponent(s)}`);
                  }}
                  className="px-4 py-2 bg-[#f3f4f6] border border-[#e5e7eb] rounded-lg text-[#6b7280] hover:text-[#111827] hover:border-amber-500/30 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="text-center py-20">
          <svg
            className="w-20 h-20 mx-auto mb-6 text-[#d1d5db]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-[#111827] mb-2">Parça Arayın</h2>
          <p className="text-[#6b7280] max-w-md mx-auto">
            OEM kodu, parça adı veya İngilizce isim ile arama yapabilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
}
