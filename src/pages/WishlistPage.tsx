import { useStore } from '../store'
import { getProductById, getDiscountPercent } from '../data'
import { StarRating } from '../components/StarRating'

export function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart, navigate } = useStore()

  const wishlistProducts = wishlist
    .map((id) => getProductById(id))
    .filter(Boolean)

  if (wishlistProducts.length === 0) {
    return (
      <div className="empty-page">
        <div className="empty-page-icon">♡</div>
        <h2>Your wishlist is empty</h2>
        <p>Save your favorite products here for later!</p>
        <button className="btn-primary" onClick={() => navigate({ name: 'products' })}>
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="page-banner">
        <div className="page-banner-content">
          <h1>My Wishlist</h1>
          <p>{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="wishlist-items">
        {wishlistProducts.map((product) => {
          if (!product) return null
          const discount = getDiscountPercent(product.price, product.oldPrice)
          return (
            <div className="wishlist-item" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                onClick={() => navigate({ name: 'product', id: product.id })}
              />
              <div className="wishlist-item-info">
                <p className="product-category">{product.category}</p>
                <h3 onClick={() => navigate({ name: 'product', id: product.id })}>
                  {product.name}
                </h3>
                <StarRating rating={product.rating} size={14} showNumber reviews={product.reviews} />
                <div className="price-row">
                  <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="old-price">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                  <span className="discount-tag">{discount}% off</span>
                </div>
              </div>
              <div className="wishlist-item-actions">
                <button className="btn-primary" onClick={() => moveToCart(product.id)}>
                  Move to Cart
                </button>
                <button
                  className="btn-text"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
