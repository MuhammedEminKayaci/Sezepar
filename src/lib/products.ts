import productsData from "@/data/products.json";
import type { Product, CategoryNode, BrandInfo } from "@/types";

const products = productsData as Product[];

// ─── Tüm ürünler ───
export function getAllProducts(): Product[] {
  return products;
}

// ─── Markaya göre ürünler ───
export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((p) => p.brand_slug === brandSlug);
}

// ─── Tek ürün (brand + slug) ───
export function getProduct(
  brandSlug: string,
  slug: string
): Product | undefined {
  return products.find(
    (p) => p.brand_slug === brandSlug && p.slug === slug
  );
}

// ─── Marka listesi ───
export function getBrands(): BrandInfo[] {
  const map = new Map<string, BrandInfo>();
  for (const p of products) {
    const existing = map.get(p.brand_slug);
    if (existing) {
      existing.count++;
    } else {
      map.set(p.brand_slug, {
        name: p.brand,
        slug: p.brand_slug,
        count: 1,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

// ─── Kategori ağacı oluştur ───
export function buildCategoryTree(brandSlug?: string): CategoryNode[] {
  const filtered = brandSlug
    ? products.filter((p) => p.brand_slug === brandSlug)
    : products;

  const tree: CategoryNode[] = [];

  for (const p of filtered) {
    const parts = p.category.split(" > ");
    const slugs = p.category_slugs;
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      const slug = slugs[i] || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      let node = current.find((n) => n.slug === slug);
      if (!node) {
        node = { name, slug, count: 0, children: [] };
        current.push(node);
      }
      node.count++;
      current = node.children;
    }
  }

  const sortTree = (nodes: CategoryNode[]) => {
    nodes.sort((a, b) => b.count - a.count);
    for (const n of nodes) sortTree(n.children);
  };
  sortTree(tree);

  return tree;
}

// ─── Kategoriye göre ürünler ───
export function getProductsByCategory(
  categorySlugs: string[],
  brandSlug?: string
): Product[] {
  return products.filter((p) => {
    if (brandSlug && p.brand_slug !== brandSlug) return false;
    return categorySlugs.every((slug, i) => p.category_slugs[i] === slug);
  });
}

// ─── Arama ───
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.oem_code.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      (p.name_en && p.name_en.toLowerCase().includes(q))
  );
}

// ─── Benzer ürünler ───
export function getSimilarProducts(
  product: Product,
  limit: number = 8
): Product[] {
  return products
    .filter(
      (p) =>
        p.oem_code !== product.oem_code &&
        p.category === product.category &&
        p.brand === product.brand
    )
    .slice(0, limit);
}

// ─── İstatistikler ───
export function getStats() {
  const brands = getBrands();
  return {
    totalProducts: products.length,
    totalBrands: brands.length,
    brands,
  };
}
