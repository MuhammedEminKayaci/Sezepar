import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/config";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: `Arama | ${SITE_CONFIG.name}`,
  description: "İş makinesi yedek parça arama. OEM kodu veya parça adı ile arayın.",
};

export default function SearchPage() {
  const allProducts = getAllProducts();

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <SearchResults allProducts={allProducts} />
    </Suspense>
  );
}
