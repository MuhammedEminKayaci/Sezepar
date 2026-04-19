import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="text-[10rem] md:text-[14rem] font-black text-[#f3f4f6] leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3">
          Sayfa Bulunamadı
        </h1>
        <p className="text-[#6b7280] mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/kategoriler"
            className="px-6 py-3 bg-white border border-[#e5e7eb] hover:border-amber-400/50 text-[#111827] rounded-xl transition-all"
          >
            Kategorilere Göz At
          </Link>
        </div>
      </div>
    </div>
  );
}
