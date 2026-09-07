import { useStore } from '../store'
import { categories, products, getDiscountPercent } from '../data'
import { ProductCard } from '../components/ProductCard'

export function HomePage() {
  const { navigate } = useStore()

  const featured = products.filter((p) => p.badge === 'Best Seller').slice(0, 4)
  const deals = [...products]
    .sort((a, b) => getDiscountPercent(b.price, b.oldPrice) - getDiscountPercent(a.price, a.oldPrice))
    .slice(0, 4)
  const trending = products.filter((p) => p.badge === 'Trending').slice(0, 4)
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4)
  const newArrivals = products.slice(-4)

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      text: 'ShopEase has become my go-to for online shopping. The product quality and delivery speed are amazing!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/11106825/pexels-photo-11106825.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      text: 'Great prices and a huge selection. I found exactly what I needed at a fraction of the cost elsewhere.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    },
    {
      name: 'Anjali Patel',
      location: 'Bangalore',
      text: 'The wishlist and cart features make it so easy to track products I love. Highly recommend ShopEase!',
      rating: 4,
      avatar: 'https://images.pexels.com/photos/36646353/pexels-photo-36646353.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    },
    {
      name: 'Vikram Singh',
      location: 'Jaipur',
      text: 'Smooth checkout and fast delivery. The order tracking feature keeps me updated every step of the way.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/39317887/pexels-photo-39317887.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    },
  ]

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO SHOPEASE</p>
          <h1>
            Everything You Need,
            <br />
            <span>All in One Place.</span>
          </h1>
          <p className="hero-text">
            Discover amazing products, great prices and exciting deals.
            Shop smarter with ShopEase — quality you can trust, delivered to your door.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate({ name: 'products' })}>
              Shop Now →
            </button>
            <button className="btn-outline" onClick={() => navigate({ name: 'products', category: 'Electronics' })}>
              Explore Electronics
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.pexels.com/photos/6868625/pexels-photo-6868625.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Online Shopping"
          />
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-item">
          <span className="promo-icon">🚚</span>
          <div>
            <h4>Free Delivery</h4>
            <p>On orders above ₹500</p>
          </div>
        </div>
        <div className="promo-item">
          <span className="promo-icon">↩️</span>
          <div>
            <h4>7-Day Returns</h4>
            <p>Easy & hassle-free</p>
          </div>
        </div>
        <div className="promo-item">
          <span className="promo-icon">🔒</span>
          <div>
            <h4>Secure Payments</h4>
            <p>100% protected</p>
          </div>
        </div>
        <div className="promo-item">
          <span className="promo-icon">💬</span>
          <div>
            <h4>24/7 Support</h4>
            <p>Always here to help</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="category-section">
        <p className="section-small">SHOP BY CATEGORY</p>
        <h2>Explore Categories</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="category-card"
              onClick={() => navigate({ name: 'products', category: cat.name })}
            >
              <img src={cat.image} alt={cat.name} loading="lazy" />
              <span className="category-overlay">
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="home-products-section">
        <div className="section-header">
          <div>
            <p className="section-small">HANDPICKED FOR YOU</p>
            <h2>Featured Products</h2>
          </div>
          <button className="link-button" onClick={() => navigate({ name: 'products' })}>
            View All →
          </button>
        </div>
        <div className="products-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Deals */}
      <section className="home-products-section alt-bg">
        <div className="section-header">
          <div>
            <p className="section-small">LIMITED TIME</p>
            <h2>Best Deals</h2>
          </div>
          <button className="link-button" onClick={() => navigate({ name: 'products' })}>
            View All →
          </button>
        </div>
        <div className="products-grid">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="home-products-section">
        <div className="section-header">
          <div>
            <p className="section-small">HOT RIGHT NOW</p>
            <h2>Trending Products</h2>
          </div>
          <button className="link-button" onClick={() => navigate({ name: 'products' })}>
            View All →
          </button>
        </div>
        <div className="products-grid">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="home-products-section alt-bg">
        <div className="section-header">
          <div>
            <p className="section-small">CUSTOMER FAVORITES</p>
            <h2>Top Rated Products</h2>
          </div>
          <button className="link-button" onClick={() => navigate({ name: 'products' })}>
            View All →
          </button>
        </div>
        <div className="products-grid">
          {topRated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="home-products-section">
        <div className="section-header">
          <div>
            <p className="section-small">FRESH ARRIVALS</p>
            <h2>New Arrivals</h2>
          </div>
          <button className="link-button" onClick={() => navigate({ name: 'products' })}>
            View All →
          </button>
        </div>
        <div className="products-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why ShopEase */}
      <section className="why-section">
        <p className="section-small">WHY CHOOSE US</p>
        <h2>Why ShopEase?</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Get the best deals on quality products with our competitive pricing and regular discounts.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">📦</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery to your doorstep. Track your order every step of the way.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">✅</div>
            <h3>Quality Assured</h3>
            <p>Every product is carefully selected and quality-checked before it reaches you.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">🛡️</div>
            <h3>Secure Shopping</h3>
            <p>Your data and payments are always protected with industry-standard security.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <p className="section-small">CUSTOMER STORIES</p>
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-stars">
                {'★'.repeat(t.rating)}
                {'☆'.repeat(5 - t.rating)}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <img src={t.avatar} alt={t.name} />
                <div>
                  <p className="author-name">{t.name}</p>
                  <p className="author-location">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
