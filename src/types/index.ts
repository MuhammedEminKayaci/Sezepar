export interface Product {
  oem_code: string;
  brand: string;
  name: string;
  category: string;
  image_url: string;
  image_path: string;
  name_en: string;
  slug: string;
  brand_slug: string;
  category_slugs: string[];
}

export interface CategoryNode {
  name: string;
  slug: string;
  count: number;
  children: CategoryNode[];
}

export interface BrandInfo {
  name: string;
  slug: string;
  count: number;
}
