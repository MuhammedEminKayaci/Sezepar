export default function BrandLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-4 w-20 bg-[#f3f4f6] rounded animate-pulse" />
        <div className="h-4 w-4 bg-[#f3f4f6] rounded animate-pulse" />
        <div className="h-4 w-28 bg-[#f3f4f6] rounded animate-pulse" />
      </div>

      {/* Title skeleton */}
      <div className="mb-8">
        <div className="h-10 w-72 bg-[#f3f4f6] rounded-lg animate-pulse mb-2" />
        <div className="h-5 w-40 bg-[#f3f4f6] rounded animate-pulse" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar skeleton */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-4">
            <div className="h-5 w-24 bg-[#f3f4f6] rounded animate-pulse mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 bg-[#f3f4f6] rounded-lg animate-pulse"
                  style={{ animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden"
              >
                <div className="aspect-square bg-[#f3f4f6] animate-pulse" style={{ animationDelay: `${i * 30}ms` }} />
                <div className="p-3 space-y-2">
                  <div className="h-3 w-20 bg-[#f3f4f6] rounded animate-pulse" />
                  <div className="h-4 w-full bg-[#f3f4f6] rounded animate-pulse" />
                  <div className="h-3 w-24 bg-[#f3f4f6] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
