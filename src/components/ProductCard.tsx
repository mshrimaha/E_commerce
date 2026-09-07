import type { Product } from '../types'
import { getDiscountPercent } from '../data'
import { useStore } from '../store'
import { StarRating } from './StarRating'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { navigate, addToCart, toggleWishlist, wishlist, setShowCartPanel } =
    useStore()
  const discount = getDiscountPercent(product.price, product.oldPrice)
  const isWishlisted = wishlist.includes(product.id)

  const handleAddToCart = () => {
    addToCart(product.id)
    setShowCartPanel(true)
  }

  return (
    <div
      className="product-card"
      onClick={() => navigate({ name: 'product', id: product.id })}
    >
      <div className="image-container">
        <img src={product.image} alt={product.name} loading="lazy" />
        {discount > 0 && (
          <span className="discount">{discount}% OFF</span>
        )}
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`wishlist-toggle ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="rating-row">
          <StarRating rating={product.rating} size={14} showNumber reviews={product.reviews} />
        </div>
        <div className="price-row">
          <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="old-price">₹{product.oldPrice.toLocaleString('en-IN')}</span>
        </div>
        <button
          className="add-button"
          onClick={(e) => {
            e.stopPropagation()
            handleAddToCart()
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
