import { useStore } from '../store'
import { getProductById } from '../data'
import { getDiscountPercent } from '../data'

export function CartPanel() {
  const {
    showCartPanel,
    setShowCartPanel,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryCharge,
    cartTotal,
    navigate,
  } = useStore()

  if (!showCartPanel) return null

  const cartProducts = cart.map((item) => ({
    item,
    product: getProductById(item.productId),
  }))

  const goToCart = () => {
    setShowCartPanel(false)
    navigate({ name: 'cart' })
  }

  const goToCheckout = () => {
    setShowCartPanel(false)
    navigate({ name: 'checkout' })
  }

  return (
    <div className="cart-overlay" onClick={() => setShowCartPanel(false)}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart ({cart.length})</h2>
          <button className="close-cart" onClick={() => setShowCartPanel(false)}>
            ✕
          </button>
        </div>

        {cartProducts.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h3>Your cart is empty</h3>
            <p>Add products to start shopping!</p>
            <button
              className="btn-primary"
              onClick={() => {
                setShowCartPanel(false)
                navigate({ name: 'products' })
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartProducts.map(({ item, product }) => {
                if (!product) return null
                const discount = getDiscountPercent(product.price, product.oldPrice)
                return (
                  <div className="cart-item" key={item.productId}>
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => {
                        setShowCartPanel(false)
                        navigate({ name: 'product', id: product.id })
                      }}
                    />
                    <div className="cart-item-details">
                      <h4>{product.name}</h4>
                      <div className="cart-item-price">
                        <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="old-price">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                        <span className="discount-tag">{discount}% off</span>
                      </div>
                      <div className="cart-item-controls">
                        <div className="quantity-selector">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}>
                            +
                          </button>
                        </div>
                        <button
                          className="remove-button"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
              </div>
              {deliveryCharge > 0 && (
                <p className="delivery-note">
                  Add ₹{(500 - cartSubtotal).toLocaleString('en-IN')} more for FREE delivery
                </p>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="cart-actions">
              <button className="btn-secondary" onClick={goToCart}>
                View Cart
              </button>
              <button className="btn-primary" onClick={goToCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
