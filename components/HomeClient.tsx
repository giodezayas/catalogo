'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CategoryFilter from '@/components/CategoryFilter'
import ProductGrid from '@/components/ProductGrid'
import { Business, Category, Product } from '@/types'

interface HomeClientProps {
  initialBusiness: Business
  initialCategories: Category[]
  initialProducts: Product[]
}

export default function HomeClient({
  initialBusiness,
  initialCategories,
  initialProducts,
}: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('1')

  const filteredProducts = useMemo(() => {
    if (selectedCategory === '1') {
      return initialProducts.filter((p) => p.status === 'active')
    }
    return initialProducts.filter(
      (p) => p.categoryId === selectedCategory && p.status === 'active'
    )
  }, [selectedCategory, initialProducts])

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
          <ProductGrid products={filteredProducts} />
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
