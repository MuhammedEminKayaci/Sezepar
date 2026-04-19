import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

const brands = [
  { name: "Caterpillar", slug: "caterpillar" },
  { name: "JCB", slug: "jcb" },
  { name: "Bobcat", slug: "bobcat" },
  { name: "Manitou", slug: "manitou" },
  { name: "Merlo", slug: "merlo" },
];

export function Footer() {
  return (
    <footer className="bg-[#292117] border-t-4 border-t-amber-500 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center">
                <span className="text-black font-black text-sm">SP</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-amber-200/60 leading-relaxed">
              İş makineleri için güvenilir yedek parça tedarikçiniz.
              Caterpillar, JCB, Bobcat, Manitou ve Merlo markaları.
            </p>
          </div>

          {/* Markalar */}
          <div>
            <h3 className="text-sm font-semibold text-amber-400 mb-4 uppercase tracking-wider">
              Markalar
            </h3>
            <ul className="space-y-2">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/${b.slug}`}
                    className="text-sm text-amber-200/60 hover:text-amber-400 transition-colors"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-sm font-semibold text-amber-400 mb-4 uppercase tracking-wider">
              Hızlı Linkler
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kategoriler"
                  className="text-sm text-amber-200/60 hover:text-amber-400 transition-colors"
                >
                  Tüm Kategoriler
                </Link>
              </li>
              <li>
                <Link
                  href="/arama"
                  className="text-sm text-amber-200/60 hover:text-amber-400 transition-colors"
                >
                  Ürün Ara
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-sm text-amber-200/60 hover:text-amber-400 transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-sm font-semibold text-amber-400 mb-4 uppercase tracking-wider">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm text-amber-200/60 hover:text-amber-400 transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-amber-200/60 hover:text-amber-400 transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-amber-200/60">{SITE_CONFIG.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-amber-500/20 text-center">
          <p className="text-xs text-amber-200/40">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
