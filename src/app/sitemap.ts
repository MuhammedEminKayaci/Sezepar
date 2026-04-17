import type { MetadataRoute } from "next";
import { getAllProducts, getBrands, buildCategoryTree } from "@/lib/products";
import type { CategoryNode } from "@/types";

const BASE_URL = "https://sezepar.com";

// Collect all category paths from tree recursively
function collectCategoryPaths(
  nodes: CategoryNode[],
  prefix: string[] = []
): string[][] {
  const paths: string[][] = [];
  for (const node of nodes) {
    const current = [...prefix, node.slug];
    paths.push(current);
    if (node.children.length > 0) {
      paths.push(...collectCategoryPaths(node.children, current));
    }
  }
  return paths;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const brands = getBrands();
  const tree = buildCategoryTree();
  const categoryPaths = collectCategoryPaths(tree);

  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/kategoriler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/arama`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // Brand pages
  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${BASE_URL}/${b.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categoryPaths.map((path) => ({
    url: `${BASE_URL}/kategoriler/${path.join("/")}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Product pages (all 15k+)
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/${p.brand_slug}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...brandPages, ...categoryPages, ...productPages];
}
