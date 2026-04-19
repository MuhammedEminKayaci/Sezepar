"use client";

import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];

  // Always show first
  pages.push(1);

  if (currentPage > 3) pages.push("...");

  // Show around current
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) pages.push("...");

  // Always show last
  if (totalPages > 1) pages.push(totalPages);

  const getUrl = (page: number) => {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return page === 1 ? baseUrl : `${baseUrl}${separator}sayfa=${page}`;
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={getUrl(currentPage - 1)}
          className="px-3 py-2 text-sm text-[#6b7280] hover:text-[#111827] bg-white border border-[#e5e7eb] rounded-lg hover:border-[#d1d5db] transition-colors"
        >
          ‹
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-[#d1d5db] bg-[#f9fafb] border border-[#e5e7eb] rounded-lg cursor-not-allowed">
          ‹
        </span>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 py-2 text-sm text-[#9ca3af]">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={getUrl(p)}
            className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
              p === currentPage
                ? "bg-amber-500 border-amber-500 text-black font-semibold"
                : "text-[#6b7280] hover:text-[#111827] bg-white border-[#e5e7eb] hover:border-[#d1d5db]"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={getUrl(currentPage + 1)}
          className="px-3 py-2 text-sm text-[#6b7280] hover:text-[#111827] bg-white border border-[#e5e7eb] rounded-lg hover:border-[#d1d5db] transition-colors"
        >
          ›
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-[#d1d5db] bg-[#f9fafb] border border-[#e5e7eb] rounded-lg cursor-not-allowed">
          ›
        </span>
      )}
    </div>
  );
}
