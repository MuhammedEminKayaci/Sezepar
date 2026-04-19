export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-8">
        <div className="h-4 w-20 bg-[#f3f4f6] rounded animate-pulse" />
        <div className="h-4 w-4 bg-[#f3f4f6] rounded animate-pulse" />
        <div className="h-4 w-24 bg-[#f3f4f6] rounded animate-pulse" />
        <div className="h-4 w-4 bg-[#f3f4f6] rounded animate-pulse" />
        <div className="h-4 w-32 bg-[#f3f4f6] rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image skeleton */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden">
          <div className="aspect-square bg-[#f3f4f6] animate-pulse" />
        </div>

        {/* Info skeleton */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="h-8 w-36 bg-amber-500/10 rounded-lg animate-pulse" />
          <div className="space-y-2">
            <div className="h-9 w-4/5 bg-[#f3f4f6] rounded-lg animate-pulse" />
            <div className="h-9 w-3/5 bg-[#f3f4f6] rounded-lg animate-pulse" />
          </div>
          <div className="h-4 w-48 bg-[#f3f4f6] rounded animate-pulse" />

          {/* Table skeleton */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center px-4 py-3 border-b border-[#e5e7eb] last:border-0">
                <div className="h-4 w-20 bg-[#f3f4f6] rounded animate-pulse" />
                <div className="h-4 w-32 bg-[#f3f4f6] rounded animate-pulse ml-12" />
              </div>
            ))}
          </div>

          {/* CTA skeleton */}
          <div className="h-14 bg-green-50 rounded-xl animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 bg-[#f3f4f6] rounded-xl animate-pulse" />
            <div className="h-12 bg-[#f3f4f6] rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
