const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const BUCKET = "product-images";

/**
 * Generates a public URL for a product image stored in Supabase Storage.
 * @param imagePath - e.g. "bobcat/01000152.jpg"
 */
export function getProductImageUrl(imagePath: string): string {
  if (!imagePath) return "/placeholder-product.svg";
  // Strip leading "images/" prefix if present
  const cleanPath = imagePath.replace(/^images\//, "");
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${cleanPath}`;
}
