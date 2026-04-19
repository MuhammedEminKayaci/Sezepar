import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProductsByCategory, buildCategoryTree, getBrands } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/config";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import type { CategoryNode } from "@/types";

const ITEMS_PER_PAGE = 24;

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Find a node in the tree by slug path
function findNode(tree: CategoryNode[], slugs: string[]): CategoryNode | null {
  let current = tree;
  let node: CategoryNode | null = null;
  for (const slug of slugs) {
    const found = current.find((n) => n.slug === slug);
    if (!found) return null;
    node = found;
    current = found.children;
  }
  return node;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tree = buildCategoryTree();
  const node = findNode(tree, slug);
  if (!node) return {};

  return {
    title: `${node.name} Yedek Parça | ${SITE_CONFIG.name}`,
    description: `${node.name} kategorisinde ${node.count.toLocaleString("tr-TR")} yedek parça. Tüm markalar.`,
  };
}

export default async function CategoryDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const marka = typeof sp.marka === "string" ? sp.marka : undefined;
  const sayfa = typeof sp.sayfa === "string" ? parseInt(sp.sayfa, 10) : 1;
  const currentPage = isNaN(sayfa) || sayfa < 1 ? 1 : sayfa;

  const tree = buildCategoryTree();
  const node = findNode(tree, slug);

  if (!node) {
    notFound();
  }

  // Get products for this category slug path
  const allProducts = getProductsByCategory(slug);
  const brands = getBrands();

  // Brand counts within results
  const brandCounts = new Map<string, number>();
  for (const p of allProducts) {
    brandCounts.set(p.brand_slug, (brandCounts.get(p.brand_slug) || 0) + 1);
  }
  const availableBrands = brands
    .filter((b) => brandCounts.has(b.slug))
    .map((b) => ({ ...b, count: brandCounts.get(b.slug)! }))
    .sort((a, b) => b.count - a.count);

  // Filter by brand
  const filtered = marka
    ? allProducts.filter((p) => p.brand_slug === marka)
    : allProducts;

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const page = Math.min(currentPage, totalPages || 1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const products = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Base URL
  const categoryPath = slug.join("/");
  const baseUrl = marka
    ? `/kategoriler/${categoryPath}?marka=${marka}`
    : `/kategoriler/${categoryPath}`;

  // Breadcrumb parts
  const breadcrumbParts: { name: string; href: string }[] = [];
  let currentTree = tree;
  for (let i = 0; i < slug.length; i++) {
    const s = slug[i];
    const n = currentTree.find((x) => x.slug === s);
    if (n) {
      breadcrumbParts.push({
        name: n.name,
        href: `/kategoriler/${slug.slice(0, i + 1).join("/")}`,
      });
      currentTree = n.children;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#9ca3af] mb-6 flex-wrap">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Ana Sayfa
        </Link>
        <span className="text-amber-300">/</span>
        <Link href="/kategoriler" className="hover:text-amber-600 transition-colors">
          Kategoriler
        </Link>
        {breadcrumbParts.map((part, i) => (
          <span key={part.href} className="flex items-center gap-2">
            <span className="text-amber-300">/</span>
            {i === breadcrumbParts.length - 1 ? (
              <span className="text-[#111827] font-medium">{part.name}</span>
            ) : (
              <Link href={part.href} className="hover:text-amber-600 transition-colors">
                {part.name}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-2">
          {node.name}
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-2" />
        <p className="text-[#6b7280]">
          {filtered.length.toLocaleString("tr-TR")} ürün
          {marka && (
            <span>
              {" · "}
              <Link
                href={`/kategoriler/${categoryPath}`}
                className="text-amber-500 hover:text-amber-400 transition-colors"
              >
                Filtreyi kaldır ✕
              </Link>
            </span>
          )}
        </p>
      </div>

      {/* Sub-categories */}
      {node.children.length > 0 && !marka && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
            Alt Kategoriler
          </h2>
          <div className="flex flex-wrap gap-2">
            {node.children.map((child) => (
              <Link
                key={child.slug}
                href={`/kategoriler/${categoryPath}/${child.slug}`}
                className="px-4 py-2 bg-white border border-amber-200 rounded-lg text-sm text-[#6b7280] hover:text-amber-700 hover:border-amber-400/50 hover:bg-amber-50 transition-all"
              >
                {child.name}
                <span className="ml-2 text-xs text-[#9ca3af]">{child.count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Brand Filter Sidebar */}
        {availableBrands.length > 1 && (
          <div className="lg:w-56 shrink-0">
            <div className="bg-white border border-amber-100 rounded-xl p-4 lg:sticky lg:top-24">
              <h3 className="text-sm font-semibold text-amber-700 mb-3">Markaya Göre</h3>
              <div className="space-y-1">
                {availableBrands.map((b) => {
                  const isActive = marka === b.slug;
                  const href = isActive
                    ? `/kategoriler/${categoryPath}`
                    : `/kategoriler/${categoryPath}?marka=${b.slug}`;
                  return (
                    <Link
                      key={b.slug}
                      href={href}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                          : "text-[#6b7280] hover:bg-amber-50 hover:text-amber-700"
                      }`}
                    >
                      <span>{b.name}</span>
                      <span className="text-xs text-[#9ca3af]">{b.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

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
            <div className="text-center py-20 text-[#9ca3af]">
              <p>Bu kategoride ürün bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
