import { useStore } from '../store'
import { OrderTracking } from '../components/OrderTracking'

export function OrderDetailPage() {
  const { page, getOrderById, advanceOrderStatus, navigate } = useStore()
  const orderId = page.name === 'order' ? page.orderId : ''
  const order = getOrderById(orderId)

  if (!order) {
    return (
      <div className="empty-page">
        <h2>Order not found</h2>
        <button className="btn-primary" onClick={() => navigate({ name: 'orders' })}>
          View All Orders
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
    <div className="order-detail-page">
      <div className="breadcrumb">
        <button onClick={() => navigate({ name: 'orders' })}>My Orders</button>
        <span>›</span>
        <span>Order #{order.id}</span>
      </div>

      <div className="order-detail-header">
        <div>
          <h1>Order #{order.id}</h1>
          <p className="order-date">Placed on {formatDate(order.date)}</p>
        </div>
        <span className={`order-status-badge ${order.status}`}>
          {order.status.replace(/_/g, ' ')}
        </span>
      </div>

      <div className="order-detail-section">
        <h3>Delivery Tracking</h3>
        <OrderTracking
          status={order.status}
          onAdvance={() => advanceOrderStatus(order.id)}
        />
      </div>

      <div className="order-detail-layout">
        <div className="order-detail-main">
          <div className="order-detail-section">
            <h3>Delivery Address</h3>
            <div className="confirmation-address">
              <p className="address-name">{order.address.fullName}</p>
              <p>{order.address.house}, {order.address.area}</p>
              <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
              <p>Phone: {order.address.phone}</p>
            </div>
          </div>

          <div className="order-detail-section">
            <h3>Ordered Products</h3>
            <div className="confirmation-products">
              {order.items.map((item) => (
                <div className="confirmation-product" key={item.productId}>
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => navigate({ name: 'product', id: item.productId })}
                  />
                  <div>
                    <p className="product-name">{item.name}</p>
                    <p className="product-qty">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="product-price">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-detail-section">
            <h3>Payment Method</h3>
            <p>{paymentLabels[order.payment.method] ?? order.payment.method}</p>
          </div>
        </div>

        <aside className="order-detail-summary">
          <h3>Order Summary</h3>
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
            <span>Total</span>
            <strong>₹{order.total.toLocaleString('en-IN')}</strong>
          </div>
        </aside>
      </div>

      <div className="confirmation-actions">
        <button className="btn-primary" onClick={() => navigate({ name: 'orders' })}>
          View All Orders
        </button>
        <button className="btn-outline" onClick={() => navigate({ name: 'home' })}>
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
