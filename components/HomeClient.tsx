'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CategoryFilter from '@/components/CategoryFilter'
import ProductGrid from '@/components/ProductGrid'
import { api } from '@/lib/api'
import { Business, Category, Product } from '@/types'

interface HomeClientProps {
  initialBusiness: Business
  initialCategories: Category[]
}

export default function HomeClient({
  initialBusiness,
  initialCategories,
}: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('1')
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setPage(1)
    api
      .getProductsCatalog({
        categoryId: selectedCategory === '1' ? undefined : selectedCategory,
        page: 1,
        limit: 24,
      })
      .then((res) => {
        setProducts(res.items)
        setTotalPages(res.totalPages)
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [selectedCategory])

  const loadMore = () => {
    const nextPage = page + 1
    if (nextPage > totalPages || loadingMore) return
    setLoadingMore(true)
    api
      .getProductsCatalog({
        categoryId: selectedCategory === '1' ? undefined : selectedCategory,
        page: nextPage,
        limit: 24,
      })
      .then((res) => {
        setProducts((prev) => [...prev, ...res.items])
        setPage(nextPage)
      })
      .finally(() => setLoadingMore(false))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header businessName={initialBusiness.name} />
      <Hero business={initialBusiness} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter
          categories={initialCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <ProductGrid products={products} />
              {page < totalPages && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                  >
                    {loadingMore ? 'Cargando...' : 'Cargar más'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <footer className="bg-gray-50 border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">{initialBusiness.name}</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              {initialBusiness.socialMedia?.instagram && (
                <a
                  href={initialBusiness.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
              )}
              {initialBusiness.socialMedia?.facebook && (
                <a
                  href={initialBusiness.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
