import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductsByBrand, buildCategoryTree, getBrands } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/config";
import { ProductCard } from "@/components/ProductCard";
import { CategorySidebar } from "@/components/CategorySidebar";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";

const ITEMS_PER_PAGE = 24;

const validBrands = ["caterpillar", "jcb", "bobcat", "manitou", "merlo"];

type Props = {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  return validBrands.map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const brands = getBrands();
  const brandInfo = brands.find((b) => b.slug === brand);
  if (!brandInfo) return {};

  return {
    title: `${brandInfo.name} Yedek Parça | ${SITE_CONFIG.name}`,
    description: `${brandInfo.name} iş makineleri için ${brandInfo.count.toLocaleString("tr-TR")} yedek parça. OEM kalitesinde parçalar.`,
  };
}

export default async function BrandPage({ params, searchParams }: Props) {
  const { brand } = await params;

  if (!validBrands.includes(brand)) {
    notFound();
  }

  const sp = await searchParams;
  const kategori = typeof sp.kategori === "string" ? sp.kategori : undefined;
  const sayfa = typeof sp.sayfa === "string" ? parseInt(sp.sayfa, 10) : 1;
  const currentPage = isNaN(sayfa) || sayfa < 1 ? 1 : sayfa;

  const allProducts = getProductsByBrand(brand);
  const brands = getBrands();
  const brandInfo = brands.find((b) => b.slug === brand)!;
  const tree = buildCategoryTree(brand);

  // Filter by category if set
  const filtered = kategori
    ? allProducts.filter((p) =>
        p.category_slugs.some((s) => s === kategori)
      )
    : allProducts;

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const page = Math.min(currentPage, totalPages || 1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const products = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Base URL for pagination
  const baseUrl = kategori ? `/${brand}?kategori=${kategori}` : `/${brand}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#666] mb-6">
        <Link href="/" className="hover:text-white transition-colors">
          Ana Sayfa
        </Link>
        <span>/</span>
        <span className="text-white font-medium">{brandInfo.name}</span>
        {kategori && (
          <>
            <span>/</span>
            <span className="text-amber-500">{kategori}</span>
          </>
        )}
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {brandInfo.name} Yedek Parça
        </h1>
        <p className="text-[#a3a3a3]">
          {filtered.length.toLocaleString("tr-TR")} ürün bulundu
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <CategorySidebar
            tree={tree}
            brandSlug={brand}
            activeCategory={kategori}
          />
        </div>

        {/* Products */}
        <div className="flex-1">
          {products.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="text-center py-20 text-[#666]">
              <svg className="w-16 h-16 mx-auto mb-4 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p>Bu kategoride ürün bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
