import type { Metadata } from "next";
import Link from "next/link";
import { buildCategoryTree } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/config";
import type { CategoryNode } from "@/types";

export const metadata: Metadata = {
  title: `Kategoriler | ${SITE_CONFIG.name}`,
  description:
    "İş makinesi yedek parça kategorileri. Filtre, pompa, conta, hidrolik ve daha fazlası.",
};

function CategoryCard({ node, depth = 0 }: { node: CategoryNode; depth?: number }) {
  const href = `/kategoriler/${node.slug}`;

  return (
    <div>
      <Link
        href={href}
        className="group block bg-[#141414] border border-[#262626] rounded-xl p-5 hover:border-amber-500/30 hover:bg-[#1a1a1a] transition-all duration-200"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold group-hover:text-amber-500 transition-colors">
            {node.name}
          </h3>
          <span className="text-xs text-[#666] bg-[#1a1a1a] group-hover:bg-[#222] px-2 py-1 rounded-full transition-colors">
            {node.count.toLocaleString("tr-TR")} ürün
          </span>
        </div>
        {node.children.length > 0 && (
          <p className="text-xs text-[#555] line-clamp-1">
            {node.children
              .slice(0, 5)
              .map((c) => c.name)
              .join(", ")}
            {node.children.length > 5 && ` +${node.children.length - 5}`}
          </p>
        )}
      </Link>
    </div>
  );
}

export default function CategoriesPage() {
  const tree = buildCategoryTree();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#666] mb-6">
        <Link href="/" className="hover:text-white transition-colors">
          Ana Sayfa
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Kategoriler</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Tüm Kategoriler
        </h1>
        <p className="text-[#a3a3a3]">
          {tree.length} ana kategori · Tüm markalar dahil
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tree.map((node) => (
          <CategoryCard key={node.slug} node={node} />
        ))}
      </div>
    </div>
  );
}
