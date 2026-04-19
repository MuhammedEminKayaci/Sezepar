import Link from "next/link";
import Image from "next/image";
import { getBrands, getStats, buildCategoryTree, getProductsByBrand } from "@/lib/products";
import { SearchBar } from "@/components/SearchBar";
import { SITE_CONFIG } from "@/lib/config";
import { BrandSlider } from "@/components/BrandSlider";
import { ProductSlider } from "@/components/ProductSlider";
import type { Product } from "@/types";

// Kategori ikonları
const CATEGORY_ICONS: Record<string, string> = {
  "motor-parcalari": "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h1m12-8V7a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2h1",
  "motor-bakim-parcalari": "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
  "hidrolik-parcalar": "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  "elektrik-parcalari": "M13 10V3L4 14h7v7l9-11h-7z",
  "govde-parcalari": "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  "alt-takim-parcalari": "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
};

export default function Home() {
  const stats = getStats();
  const brands = getBrands();
  const categories = buildCategoryTree();

  // Farklı markalardan ve kategorilerden çeşitli ürünler
  const showcaseProducts = (() => {
    const seen = new Set<string>();
    const result: Product[] = [];
    for (const b of brands) {
      const prods = getProductsByBrand(b.slug).filter((p) => p.image_path);
      const categories = new Set<string>();
      for (const p of prods) {
        const catKey = p.category_slugs?.[0] || p.category;
        if (!seen.has(p.slug) && !categories.has(catKey)) {
          result.push(p);
          seen.add(p.slug);
          categories.add(catKey);
          if (categories.size >= 3) break;
        }
      }
    }
    return result.slice(0, 15);
  })();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/stock/hero.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-24 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-medium text-amber-500 tracking-wide uppercase">
                {stats.totalProducts.toLocaleString("tr-TR")}+ Yedek Parça Stokta
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className="text-white">İş Makinesi</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Yedek Parça
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#a3a3a3] mb-10 max-w-xl leading-relaxed">
              Caterpillar, JCB, Bobcat, Manitou ve Merlo için
              <span className="text-white font-medium"> OEM kalitesinde</span> yedek parça tedarikçiniz.
            </p>

            {/* Search */}
            <div className="max-w-xl mb-6">
              <SearchBar />
            </div>
            <p className="text-xs text-[#666]">
              Örnek: <span className="text-[#888]">370-4008</span>,{" "}
              <span className="text-[#888]">yakıt pompası</span>,{" "}
              <span className="text-[#888]">turboşarjer</span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── İSTATİSTİKLER ─── */}
      <section className="border-y border-amber-200/60 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-black text-amber-600">
              {stats.totalProducts.toLocaleString("tr-TR")}+
            </div>
            <div className="text-sm text-[#6b7280] mt-1">Yedek Parça</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-amber-600">{stats.totalBrands}</div>
            <div className="text-sm text-[#6b7280] mt-1">Dünya Markası</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-amber-600">{categories.length}+</div>
            <div className="text-sm text-[#6b7280] mt-1">Ürün Kategorisi</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-amber-500">7/24</div>
            <div className="text-sm text-[#6b7280] mt-1">Destek Hattı</div>
          </div>
        </div>
      </section>

      {/* ─── MARKALAR SLIDER ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Yetkili Tedarikçi</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mt-2 mb-3">Dünya Markaları</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto mb-3" />
            <p className="text-[#6b7280] max-w-lg mx-auto">
              Sektörün lider markalarının orijinal yedek parçalarına tek noktadan ulaşın.
            </p>
          </div>

          <BrandSlider brands={brands} />
        </div>
      </section>

      {/* ─── NEDEN BİZ ─── */}
      <section className="border-t border-amber-200/60 bg-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Sol: Görsel */}
            <div className="relative rounded-3xl overflow-hidden h-[400px] lg:h-[500px]">
              <Image
                src="/stock/excavator.jpg"
                alt="İş makinesi"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 to-transparent" />
              {/* Overlay Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <div className="text-2xl font-black text-amber-500">15+</div>
                    <div className="text-xs text-white/80">Yıllık Tecrübe</div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <div className="text-2xl font-black text-white">500+</div>
                    <div className="text-xs text-white/80">Mutlu Müşteri</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ: İçerik */}
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Neden SEZEPAR</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mt-2 mb-6">
                Güvenilir Tedarikçiniz
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-6" />
              <p className="text-[#6b7280] mb-8">
                Yıllardır sektöre hizmet veren tecrübemizle yanınızdayız.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                    title: "OEM Kalite Garantisi",
                    desc: "Tüm parçalar orijinal OEM standartlarında üretilmiştir.",
                  },
                  {
                    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                    title: "Hızlı Teslimat",
                    desc: "Stokta bulunan ürünler aynı gün kargoya verilir.",
                  },
                  {
                    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
                    title: "Teknik Destek",
                    desc: "Uzman ekibimiz 7/24 teknik destek sunuyor.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group flex gap-4 items-start bg-white border border-amber-100 rounded-2xl p-5 hover:border-amber-400/40 hover:shadow-md hover:shadow-amber-500/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/15 transition-colors">
                      <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#111827] mb-1">{item.title}</h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VİTRİN ÜRÜNLERİ SLIDER ─── */}
      <section>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Ürün Vitrini</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mt-2">
                Öne Çıkan Ürünler
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-3" />
            </div>
            <Link
              href="/kategoriler"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 transition-colors"
            >
              Tüm Ürünler
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <ProductSlider products={showcaseProducts} />

          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/kategoriler"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-amber-500 border border-amber-500/30 rounded-xl hover:bg-amber-500/10 transition-colors"
            >
              Tüm Ürünler →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── KATEGORİLER ─── */}
      <section className="border-t border-amber-200/60 bg-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Kategoriler</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mt-2 mb-3">
              Parça Kategorileri
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto mb-3" />
            <p className="text-[#6b7280]">İhtiyacınıza göre doğru kategoriyi seçin</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories
              .filter((c) => c.slug !== "diger-parcalar" && c.slug !== "otomotiv")
              .slice(0, 6)
              .map((cat) => {
                const iconPath = CATEGORY_ICONS[cat.slug];
                return (
                  <Link
                    key={cat.slug}
                    href={`/kategoriler/${cat.slug}`}
                    className="group relative bg-white border border-amber-100 rounded-2xl p-6 hover:border-amber-400/40 hover:bg-amber-50/50 hover:shadow-md hover:shadow-amber-500/5 transition-all duration-300 overflow-hidden"
                  >
                    {/* Subtle corner glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/15 transition-colors">
                        {iconPath ? (
                          <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-[#111827] mb-1 group-hover:text-amber-600 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-[#9ca3af]">
                        {cat.count.toLocaleString("tr-TR")} ürün
                      </p>

                      {/* Sub-categories preview */}
                      {cat.children.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {cat.children.slice(0, 3).map((sub) => (
                            <span
                              key={sub.slug}
                              className="text-[10px] text-amber-700/60 bg-amber-50 px-2 py-0.5 rounded-full"
                            >
                              {sub.name}
                            </span>
                          ))}
                          {cat.children.length > 3 && (
                            <span className="text-[10px] text-[#d1d5db] px-1">
                              +{cat.children.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/kategoriler"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-amber-500 border border-amber-500/30 rounded-xl hover:bg-amber-500/10 transition-colors"
            >
              Tüm Kategoriler
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HIZLI ERİŞİM BANDI ─── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/arama"
            className="group flex items-center gap-4 bg-white border border-amber-100 rounded-2xl p-6 hover:border-amber-400/40 hover:shadow-md hover:shadow-amber-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[#111827] group-hover:text-amber-600 transition-colors">OEM Kodu ile Ara</h3>
              <p className="text-xs text-[#9ca3af]">Parça numarasını girin, anında bulun</p>
            </div>
          </Link>

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Merhaba, yedek parça hakkında bilgi almak istiyorum.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-white border border-[#e5e7eb] rounded-2xl p-6 hover:border-[#25D366]/30 hover:shadow-md hover:shadow-green-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[#111827] group-hover:text-[#25D366] transition-colors">WhatsApp Destek</h3>
              <p className="text-xs text-[#9ca3af]">Hemen yazın, anında yanıt alın</p>
            </div>
          </a>

          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="group flex items-center gap-4 bg-white border border-[#e5e7eb] rounded-2xl p-6 hover:border-blue-500/20 hover:shadow-md hover:shadow-blue-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[#111827] group-hover:text-blue-500 transition-colors">Bizi Arayın</h3>
              <p className="text-xs text-[#9ca3af]">{SITE_CONFIG.phone}</p>
            </div>
          </a>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/stock/construction-site.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/85 to-[#0a0a0a]/70" />
            <div className="absolute inset-0 bg-amber-500/5" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative p-10 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 backdrop-blur-sm">
              <span className="text-xs font-medium text-amber-500">Ücretsiz Teklif</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Aradığınız Parçayı Bulamadınız mı?
            </h2>
            <p className="text-[#888] mb-8 max-w-lg mx-auto">
              OEM kodunu veya parça bilgisini gönderin, <span className="text-white">en kısa sürede</span> size özel teklif hazırlayalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Merhaba, yedek parça hakkında bilgi almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 text-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp ile Teklif Al
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Hemen Arayın
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
