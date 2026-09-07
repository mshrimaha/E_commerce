import { StoreProvider, useStore } from './store'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CartPanel } from './components/CartPanel'
import { HomePage } from './pages/HomePage'
import { ProductListPage } from './pages/ProductListPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { WishlistPage } from './pages/WishlistPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderConfirmationPage } from './pages/OrderConfirmationPage'
import { MyOrdersPage } from './pages/MyOrdersPage'
import { OrderDetailPage } from './pages/OrderDetailPage'
import './App.css'

function PageRouter() {
  const { page } = useStore()

  switch (page.name) {
    case 'home':
      return <HomePage />
    case 'products':
      return <ProductListPage />
    case 'product':
      return <ProductDetailPage />
    case 'wishlist':
      return <WishlistPage />
    case 'cart':
      return <CartPage />
    case 'checkout':
      return <CheckoutPage />
    case 'confirmation':
      return <OrderConfirmationPage />
    case 'orders':
      return <MyOrdersPage />
    case 'order':
      return <OrderDetailPage />
    default:
      return <HomePage />
  }
}

function AppContent() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <PageRouter />
      </main>
      <Footer />
      <CartPanel />
    </div>
  )
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}

export default App
