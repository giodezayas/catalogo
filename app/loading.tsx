export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="h-16 border-b border-gray-100 bg-gray-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-10 bg-gray-200 rounded w-48 mb-8" />
        <div className="flex gap-2 mb-8 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 w-24 bg-gray-200 rounded-full shrink-0" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-9 bg-gray-200 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
