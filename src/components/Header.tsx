import { useState } from 'react'
import { useStore } from '../store'
import { categories } from '../data'

export function Header() {
  const { navigate, cartCount, wishlist, page, setShowCartPanel } = useStore()
  const [searchValue, setSearchValue] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = () => {
    const query = searchValue.trim()
    if (query) {
      navigate({ name: 'products', search: query })
      setSearchValue('')
      setMobileMenuOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  const wishlistCount = wishlist.length

  const isActive = (name: string) => page.name === name

  const goHome = () => {
    navigate({ name: 'home' })
    setMobileMenuOpen(false)
  }

  const selectCategory = (category: string) => {
    navigate({ name: 'products', category })
    setMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="topbar">
        <div className="logo" onClick={goHome}>
          <span className="logo-main">Shop</span>
          <span className="logo-highlight">Ease</span>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch} className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <div className="header-actions">
          <button
            className={`icon-button ${isActive('wishlist') ? 'active' : ''}`}
            onClick={() => navigate({ name: 'wishlist' })}
            aria-label="Wishlist"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
          </button>

          <button
            className="icon-button"
            onClick={() => setShowCartPanel(true)}
            aria-label="Cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </button>

          <button
            className={`icon-button ${isActive('orders') ? 'active' : ''}`}
            onClick={() => navigate({ name: 'orders' })}
            aria-label="My Orders"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11H3v10h6V11zM21 3h-6v18h6V3zM15 7H9v14h6V7z" />
            </svg>
          </button>

          <button
            className="profile-button"
            onClick={() => navigate({ name: 'orders' })}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      <nav className={`navbar ${mobileMenuOpen ? 'open' : ''}`}>
        <button onClick={goHome} className={isActive('home') ? 'active' : ''}>
          Home
        </button>
        {categories.slice(0, 8).map((cat) => (
          <button
            key={cat.name}
            onClick={() => selectCategory(cat.name)}
            className={
              page.name === 'products' &&
              'category' in page &&
              page.category === cat.name
                ? 'active'
                : ''
            }
          >
            {cat.name}
          </button>
        ))}
        <button onClick={() => setMobileMenuOpen(false)} className="navbar-more">
          More Categories
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-category-grid">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => selectCategory(cat.name)}
              className="mobile-category-item"
            >
              <span className="cat-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
