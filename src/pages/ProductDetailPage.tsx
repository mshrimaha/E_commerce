import { useState } from 'react'
import { useStore } from '../store'
import { getProductById, getDiscountPercent, products } from '../data'
import { StarRating } from '../components/StarRating'
import { ReviewSection } from '../components/ReviewSection'
import { ProductCard } from '../components/ProductCard'

export function ProductDetailPage() {
  const { page, navigate, addToCart, toggleWishlist, wishlist, setShowCartPanel } =
    useStore()
  const productId = page.name === 'product' ? page.id : 0
  const product = getProductById(productId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <button className="btn-primary" onClick={() => navigate({ name: 'products' })}>
          Browse Products
        </button>
      </div>
    )
  }

  const discount = getDiscountPercent(product.price, product.oldPrice)
  const isWishlisted = wishlist.includes(product.id)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product.id, quantity)
    setShowCartPanel(true)
  }

  const handleBuyNow = () => {
    addToCart(product.id, quantity)
    navigate({ name: 'checkout' })
  }

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    })
  }

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <button onClick={() => navigate({ name: 'home' })}>Home</button>
        <span>›</span>
        <button onClick={() => navigate({ name: 'products', category: product.category })}>
          {product.category}
        </button>
        <span>›</span>
        <span>{product.name}</span>
      </div>

      <div className="product-detail-layout">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img
              src={product.images[selectedImage] ?? product.image}
              alt={product.name}
            />
            {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
          </div>
          {product.images.length > 1 && (
            <div className="thumbnail-row">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info-main">
          <p className="product-category">{product.category}</p>
          <h1 className="product-title">{product.name}</h1>

          <div className="product-rating-row">
            <StarRating rating={product.rating} size={18} showNumber reviews={product.reviews} />
          </div>

          <div className="product-price-row">
            <span className="price-large">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="old-price-large">₹{product.oldPrice.toLocaleString('en-IN')}</span>
            {discount > 0 && <span className="discount-text">{discount}% off</span>}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-features">
            <h4>Key Features</h4>
            <ul>
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <button className="btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn-accent" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              className={`btn-icon ${isWishlisted ? 'wishlisted' : ''}`}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
            >
              {isWishlisted ? '♥' : '♡'}
            </button>
          </div>

          <div className="delivery-info">
            <div className="delivery-item">
              <span className="delivery-icon">🚚</span>
              <div>
                <p className="delivery-title">Free Delivery</p>
                <p className="delivery-text">
                  Get it by {formatDate(new Date(Date.now() + 5 * 86400000).toISOString())}
                </p>
              </div>
            </div>
            <div className="delivery-item">
              <span className="delivery-icon">↩️</span>
              <div>
                <p className="delivery-title">7-Day Returns</p>
                <p className="delivery-text">Easy replacement or refund</p>
              </div>
            </div>
            <div className="delivery-item">
              <span className="delivery-icon">✅</span>
              <div>
                <p className="delivery-title">Warranty</p>
                <p className="delivery-text">1-year manufacturer warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewSection productId={product.id} />

      {/* Related Products */}
      {related.length > 0 && (
        <section className="related-products">
          <h2>You May Also Like</h2>
          <div className="products-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
