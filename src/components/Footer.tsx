import { useStore } from '../store'
import { categories } from '../data'

export function Footer() {
  const { navigate } = useStore()

  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>ShopEase</h3>
        <p>Your simple and smart shopping destination. Quality products at unbeatable prices, delivered to your doorstep.</p>
      </div>
      <div className="footer-section">
        <h4>Shop</h4>
        <ul>
          {categories.slice(0, 6).map((cat) => (
            <li key={cat.name}>
              <button onClick={() => navigate({ name: 'products', category: cat.name })}>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-section">
        <h4>Customer Service</h4>
        <ul>
          <li><button onClick={() => navigate({ name: 'orders' })}>My Orders</button></li>
          <li><button onClick={() => navigate({ name: 'wishlist' })}>My Wishlist</button></li>
          <li><button onClick={() => navigate({ name: 'home' })}>Track Order</button></li>
          <li><button onClick={() => navigate({ name: 'home' })}>Return Policy</button></li>
          <li><button onClick={() => navigate({ name: 'home' })}>Help Center</button></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Why ShopEase?</h4>
        <ul>
          <li>Free delivery over ₹500</li>
          <li>Secure payments</li>
          <li>7-day easy returns</li>
          <li>24/7 customer support</li>
          <li>100% genuine products</li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ShopEase | E-Commerce Web Application</p>
      </div>
    </footer>
  )
}
