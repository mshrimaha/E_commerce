import { useMemo, useState, useEffect } from 'react'
import { useStore } from '../store'
import { categories, products, searchProducts, getProductsByCategory } from '../data'
import { ProductCard } from '../components/ProductCard'

type SortOption = 'popularity' | 'price-low' | 'price-high' | 'rating'

export function ProductListPage() {
  const { page, navigate } = useStore()
  const pageData = page.name === 'products' ? page : { name: 'products' as const }

  const initialCategory = pageData.category ?? 'All'
  const initialSearch = pageData.search ?? ''

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [maxPrice, setMaxPrice] = useState(100000)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState<SortOption>('popularity')

  useEffect(() => {
    if (page.name === 'products') {
      setSelectedCategory(page.category ?? 'All')
      setSearchTerm(page.search ?? '')
    }
  }, [page])

  const allCategories = ['All', ...categories.map((c) => c.name)]

  const filteredProducts = useMemo(() => {
    let result: typeof products

    if (searchTerm) {
      result = searchProducts(searchTerm)
    } else if (selectedCategory !== 'All') {
      result = getProductsByCategory(selectedCategory)
    } else {
      result = products
    }

    result = result.filter(
      (p) => p.price <= maxPrice && p.rating >= minRating
    )

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'popularity':
        result = [...result].sort((a, b) => b.reviews - a.reviews)
        break
    }

    return result
  }, [searchTerm, selectedCategory, maxPrice, minRating, sortBy])

  const clearFilters = () => {
    setSelectedCategory('All')
    setSearchTerm('')
    setMaxPrice(100000)
    setMinRating(0)
    setSortBy('popularity')
    navigate({ name: 'products' })
  }

  const title = searchTerm
    ? `Search Results for "${searchTerm}"`
    : selectedCategory === 'All'
    ? 'All Products'
    : selectedCategory

  return (
    <div className="product-list-page">
      <div className="page-banner">
        <div className="page-banner-content">
          <h1>{title}</h1>
          <p>{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      <div className="product-list-layout">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="link-button" onClick={clearFilters}>
              Clear All
            </button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <div className="category-filter-list">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  className={selectedCategory === cat ? 'active' : ''}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setSearchTerm('')
                    if (cat === 'All') {
                      navigate({ name: 'products' })
                    } else {
                      navigate({ name: 'products', category: cat })
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Max Price: ₹{maxPrice.toLocaleString('en-IN')}</h4>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
          </div>

          <div className="filter-group">
            <h4>Minimum Rating</h4>
            <div className="rating-filter">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  className={minRating === r ? 'active' : ''}
                  onClick={() => setMinRating(r)}
                >
                  {r === 0 ? 'All' : `${r}★ & above`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="products-main">
          <div className="sort-bar">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search for something else.</p>
              <button className="btn-primary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
