import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const imgSrc = `/${product.image_path}`;

  return (
    <Link
      href={`/${product.brand_slug}/${product.slug}`}
      className="group bg-[#141414] border border-[#262626] rounded-xl overflow-hidden hover:border-[#404040] transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-square bg-[#1a1a1a] overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="text-xs font-mono text-amber-500 mb-1">
          {product.oem_code}
        </div>
        <h3 className="text-sm text-[#ccc] line-clamp-2 leading-snug group-hover:text-white transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-1 text-xs text-[#666]">
          <span>{product.brand}</span>
          <span>·</span>
          <span className="truncate">{product.category.split(" > ").pop()}</span>
        </div>
      </div>
    </Link>
  );
}
