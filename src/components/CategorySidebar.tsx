"use client";

import { useState } from "react";
import type { CategoryNode } from "@/types";

function CategoryItem({
  node,
  brandSlug,
  activeCategory,
  depth,
}: {
  node: CategoryNode;
  brandSlug: string;
  activeCategory?: string;
  depth: number;
}) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = node.children.length > 0;
  const isActive = activeCategory === node.slug;

  const href = `/${brandSlug}?kategori=${node.slug}`;

  return (
    <div>
      <div className="flex items-center">
        {hasChildren && (
          <button
            onClick={() => setOpen(!open)}
            className="p-1 mr-1 text-[#666] hover:text-white transition-colors"
            aria-label={open ? "Kapat" : "Aç"}
          >
            <svg
              className={`w-3 h-3 transition-transform ${open ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {!hasChildren && <span className="w-5" />}

        <a
          href={href}
          className={`flex-1 py-1.5 text-sm truncate transition-colors ${
            isActive
              ? "text-amber-500 font-medium"
              : "text-[#a3a3a3] hover:text-white"
          }`}
        >
          {node.name}
          <span className="ml-1 text-xs text-[#555]">({node.count})</span>
        </a>
      </div>

      {open && hasChildren && (
        <div className="ml-4 border-l border-[#262626]">
          {node.children.map((child) => (
            <CategoryItem
              key={child.slug}
              node={child}
              brandSlug={brandSlug}
              activeCategory={activeCategory}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CategorySidebar({
  tree,
  brandSlug,
  activeCategory,
}: {
  tree: CategoryNode[];
  brandSlug: string;
  activeCategory?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden flex items-center gap-2 w-full px-4 py-3 bg-[#141414] border border-[#262626] rounded-xl text-sm text-[#a3a3a3] mb-4"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm4 8a1 1 0 011-1h8a1 1 0 010 2H8a1 1 0 01-1-1zm2 8a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
        </svg>
        Kategoriler
        <svg className={`w-4 h-4 ml-auto transition-transform ${mobileOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Sidebar content */}
      <aside className={`${mobileOpen ? "block" : "hidden"} lg:block`}>
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
            Kategoriler
          </h3>
          <div className="space-y-0.5">
            <a
              href={`/${brandSlug}`}
              className={`block py-1.5 text-sm transition-colors ${
                !activeCategory
                  ? "text-amber-500 font-medium"
                  : "text-[#a3a3a3] hover:text-white"
              }`}
            >
              Tümü
            </a>
            {tree.map((node) => (
              <CategoryItem
                key={node.slug}
                node={node}
                brandSlug={brandSlug}
                activeCategory={activeCategory}
                depth={0}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
