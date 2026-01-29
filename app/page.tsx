'use client'

import { useState, useMemo, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CategoryFilter from '@/components/CategoryFilter'
import ProductGrid from '@/components/ProductGrid'
import { api } from '@/lib/api'
import { Business, Category, Product } from '@/types'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('1') // Todos
  const [business, setBusiness] = useState<Business | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [businessData, categoriesData, productsData] = await Promise.all([
          api.getBusiness(),
          api.getCategories(),
          api.getProducts(),
        ])
        setBusiness(businessData)
        setCategories(categoriesData)
        setProducts(productsData)
      } catch (error) {
        console.error('Error loading data:', error)
        // Fallback to mock data on error
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredProducts = useMemo(() => {
    if (selectedCategory === '1') {
      return products.filter((p) => p.status === 'active')
    }
    return products.filter(
      (p) => p.categoryId === selectedCategory && p.status === 'active'
    )
  }, [selectedCategory, products])

  if (loading || !business) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero business={business} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className="mt-8">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
      <footer className="bg-gray-50 border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">{business.name}</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              {business.socialMedia?.instagram && (
                <a
                  href={business.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
              )}
              {business.socialMedia?.facebook && (
                <a
                  href={business.socialMedia.facebook}
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
