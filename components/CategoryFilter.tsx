'use client'

import { Category } from '@/types'
import { motion } from 'framer-motion'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="sticky top-16 z-30 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
          {categories
            .filter((cat) => cat.visible)
            .sort((a, b) => a.order - b.order)
            .map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'text-white'
                    : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gray-900 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
