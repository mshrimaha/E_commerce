import { useStore } from '../store'

export function OrderConfirmationPage() {
  const { page, getOrderById, navigate } = useStore()
  const orderId = page.name === 'confirmation' ? page.orderId : ''
  const order = getOrderById(orderId)

  if (!order) {
    return (
      <div className="empty-page">
        <h2>Order not found</h2>
        <button className="btn-primary" onClick={() => navigate({ name: 'home' })}>
          Go Home
        </button>
      </div>
    )
  }

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const paymentLabels: Record<string, string> = {
    cod: 'Cash on Delivery',
    upi: `UPI (${order.payment.upiId ?? 'N/A'})`,
    credit: `Credit Card (****${order.payment.cardNumber?.slice(-4) ?? ''})`,
    debit: `Debit Card (****${order.payment.cardNumber?.slice(-4) ?? ''})`,
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-header">
        <div className="success-check">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
        <div className="order-id-badge">Order ID: {order.id}</div>
      </div>

      <div className="confirmation-layout">
        <div className="confirmation-main">
          <div className="confirmation-section">
            <h3>Delivery Address</h3>
            <div className="confirmation-address">
              <p className="address-name">{order.address.fullName}</p>
              <p>{order.address.house}, {order.address.area}</p>
              <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
              <p>Phone: {order.address.phone}</p>
            </div>
          </div>

          <div className="confirmation-section">
            <h3>Ordered Products</h3>
            <div className="confirmation-products">
              {order.items.map((item) => (
                <div className="confirmation-product" key={item.productId}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="product-name">{item.name}</p>
                    <p className="product-qty">Qty: {item.quantity}</p>
                  </div>
                  <span className="product-price">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="confirmation-section">
            <h3>Payment Method</h3>
            <p>{paymentLabels[order.payment.method] ?? order.payment.method}</p>
          </div>
        </div>

        <aside className="confirmation-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Order Date</span>
            <span>{formatDate(order.date)}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{(order.total - order.deliveryCharge).toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</span>
          </div>
          <div className="summary-row">
            <span>Est. Delivery</span>
            <span>{formatDate(order.estimatedDelivery)}</span>
          </div>
          <div className="summary-row total">
            <span>Total Paid</span>
            <strong>₹{order.total.toLocaleString('en-IN')}</strong>
          </div>
        </aside>
      </div>

      <div className="confirmation-actions">
        <button className="btn-primary" onClick={() => navigate({ name: 'order', orderId: order.id })}>
          Track Your Order
        </button>
        <button className="btn-secondary" onClick={() => navigate({ name: 'orders' })}>
          View All Orders
        </button>
        <button className="btn-outline" onClick={() => navigate({ name: 'home' })}>
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
