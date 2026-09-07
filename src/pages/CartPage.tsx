import { useStore } from '../store'
import { getProductById, getDiscountPercent } from '../data'

export function CartPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryCharge,
    cartTotal,
    navigate,
  } = useStore()

  const cartProducts = cart.map((item) => ({
    item,
    product: getProductById(item.productId),
  }))

  if (cartProducts.length === 0) {
    return (
      <div className="empty-page">
        <div className="empty-page-icon">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet!</p>
        <button className="btn-primary" onClick={() => navigate({ name: 'products' })}>
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="page-banner">
        <div className="page-banner-content">
          <h1>Shopping Cart</h1>
          <p>{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</p>
        </div>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cartProducts.map(({ item, product }) => {
            if (!product) return null
            const discount = getDiscountPercent(product.price, product.oldPrice)
            return (
              <div className="cart-list-item" key={item.productId}>
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => navigate({ name: 'product', id: product.id })}
                />
                <div className="cart-list-info">
                  <h3 onClick={() => navigate({ name: 'product', id: product.id })}>
                    {product.name}
                  </h3>
                  <p className="product-category">{product.category}</p>
                  <div className="cart-list-price">
                    <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="old-price">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                    <span className="discount-tag">{discount}% off</span>
                  </div>
                  <div className="cart-list-controls">
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
                    <span className="item-total">
                      ₹{(product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <button
                      className="btn-text danger"
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

        <aside className="cart-summary-panel">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({cart.length} items)</span>
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
          <button className="btn-primary" onClick={() => navigate({ name: 'checkout' })}>
            Proceed to Checkout
          </button>
          <button className="btn-secondary" onClick={() => navigate({ name: 'products' })}>
            Continue Shopping
          </button>
        </aside>
      </div>
    </div>
  )
}
