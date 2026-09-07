import { useStore } from '../store'

export function MyOrdersPage() {
  const { orders, navigate } = useStore()

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const paymentLabels: Record<string, string> = {
    cod: 'Cash on Delivery',
    upi: 'UPI',
    credit: 'Credit Card',
    debit: 'Debit Card',
  }

  if (orders.length === 0) {
    return (
      <div className="empty-page">
        <div className="empty-page-icon">📦</div>
        <h2>No orders yet</h2>
        <p>When you place an order, it will appear here.</p>
        <button className="btn-primary" onClick={() => navigate({ name: 'products' })}>
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="page-banner">
        <div className="page-banner-content">
          <h1>My Orders</h1>
          <p>{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div
            className="order-card"
            key={order.id}
            onClick={() => navigate({ name: 'order', orderId: order.id })}
          >
            <div className="order-card-header">
              <div>
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">{formatDate(order.date)}</span>
              </div>
              <span className={`order-status-badge ${order.status}`}>
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="order-card-items">
              {order.items.slice(0, 3).map((item) => (
                <div className="order-product-thumb" key={item.productId}>
                  <img src={item.image} alt={item.name} />
                  <span className="thumb-qty">{item.quantity}</span>
                </div>
              ))}
              {order.items.length > 3 && (
                <span className="more-items">+{order.items.length - 3} more</span>
              )}
            </div>

            <div className="order-card-footer">
              <span className="order-total">₹{order.total.toLocaleString('en-IN')}</span>
              <span className="order-payment">{paymentLabels[order.payment.method]}</span>
              <span className="order-track-link">Track →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
