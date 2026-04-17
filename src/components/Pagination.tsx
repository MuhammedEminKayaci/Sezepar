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
          className="px-3 py-2 text-sm text-[#a3a3a3] hover:text-white bg-[#141414] border border-[#262626] rounded-lg hover:border-[#404040] transition-colors"
        >
          ‹
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-[#333] bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg cursor-not-allowed">
          ‹
        </span>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 py-2 text-sm text-[#555]">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={getUrl(p)}
            className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
              p === currentPage
                ? "bg-amber-500 border-amber-500 text-black font-semibold"
                : "text-[#a3a3a3] hover:text-white bg-[#141414] border-[#262626] hover:border-[#404040]"
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
          className="px-3 py-2 text-sm text-[#a3a3a3] hover:text-white bg-[#141414] border border-[#262626] rounded-lg hover:border-[#404040] transition-colors"
        >
          ›
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-[#333] bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg cursor-not-allowed">
          ›
        </span>
      )}
    </div>
  );
}
