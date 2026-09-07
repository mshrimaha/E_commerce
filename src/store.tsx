import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  Address,
  CartItem,
  Order,
  OrderStatus,
  Page,
  PaymentInfo,
  Review,
} from './types'
import { getProductById } from './data'

type StoreContextType = {
  page: Page
  navigate: (page: Page) => void

  cart: CartItem[]
  addToCart: (productId: number, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateCartQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartSubtotal: number
  deliveryCharge: number
  cartTotal: number

  wishlist: number[]
  toggleWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  moveToCart: (productId: number) => void

  addresses: Address[]
  addAddress: (address: Omit<Address, 'id'>) => string
  deleteAddress: (id: string) => void

  orders: Order[]
  placeOrder: (address: Address, payment: PaymentInfo) => Order
  getOrderById: (id: string) => Order | undefined
  advanceOrderStatus: (orderId: string) => void

  reviews: Review[]
  addReview: (review: Omit<Review, 'id' | 'date'>) => void
  getReviewsForProduct: (productId: number) => Review[]

  showCartPanel: boolean
  setShowCartPanel: (show: boolean) => void
}

const StoreContext = createContext<StoreContextType | null>(null)

function loadState<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function saveState<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

const FREE_DELIVERY_THRESHOLD = 500
const DELIVERY_CHARGE = 49

export function StoreProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>({ name: 'home' })
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadState<CartItem[]>('se_cart', [])
  )
  const [wishlist, setWishlist] = useState<number[]>(() =>
    loadState<number[]>('se_wishlist', [])
  )
  const [addresses, setAddresses] = useState<Address[]>(() =>
    loadState<Address[]>('se_addresses', [])
  )
  const [orders, setOrders] = useState<Order[]>(() =>
    loadState<Order[]>('se_orders', [])
  )
  const [reviews, setReviews] = useState<Review[]>(() =>
    loadState<Review[]>('se_reviews', [])
  )
  const [showCartPanel, setShowCartPanel] = useState(false)

  useEffect(() => saveState('se_cart', cart), [cart])
  useEffect(() => saveState('se_wishlist', wishlist), [wishlist])
  useEffect(() => saveState('se_addresses', addresses), [addresses])
  useEffect(() => saveState('se_orders', orders), [orders])
  useEffect(() => saveState('se_reviews', reviews), [reviews])

  const navigate = useCallback((p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const addToCart = useCallback((productId: number, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { productId, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const updateCartQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity < 1) return
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      )
    },
    []
  )

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback((productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }, [])

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId))
  }, [])

  const moveToCart = useCallback(
    (productId: number) => {
      addToCart(productId)
      removeFromWishlist(productId)
    },
    [addToCart, removeFromWishlist]
  )

  const addAddress = useCallback((address: Omit<Address, 'id'>): string => {
    const id = `addr_${Date.now()}`
    const newAddress: Address = { ...address, id }
    setAddresses((prev) => [...prev, newAddress])
    return id
  }, [])

  const deleteAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }, [])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getProductById(item.productId)
        return sum + (product?.price ?? 0) * item.quantity
      }, 0),
    [cart]
  )

  const deliveryCharge = useMemo(
    () =>
      cartSubtotal === 0 || cartSubtotal >= FREE_DELIVERY_THRESHOLD
        ? 0
        : DELIVERY_CHARGE,
    [cartSubtotal]
  )

  const cartTotal = cartSubtotal + deliveryCharge

  const placeOrder = useCallback(
    (address: Address, payment: PaymentInfo): Order => {
      const orderItems = cart.map((item) => {
        const product = getProductById(item.productId)!
        return {
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: item.quantity,
        }
      })
      const subtotal = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      const charge =
        subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD
          ? 0
          : DELIVERY_CHARGE
      const now = new Date()
      const deliveryDate = new Date(now)
      deliveryDate.setDate(deliveryDate.getDate() + 5)
      const order: Order = {
        id: `SE${Date.now().toString().slice(-8)}`,
        items: orderItems,
        address,
        payment,
        total: subtotal + charge,
        deliveryCharge: charge,
        date: now.toISOString(),
        estimatedDelivery: deliveryDate.toISOString(),
        status: 'confirmed',
      }
      setOrders((prev) => [order, ...prev])
      clearCart()
      return order
    },
    [cart, clearCart]
  )

  const getOrderById = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  )

  const advanceOrderStatus = useCallback((orderId: string) => {
    const statuses: OrderStatus[] = [
      'confirmed',
      'packed',
      'shipped',
      'out_for_delivery',
      'delivered',
    ]
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order
        const currentIdx = statuses.indexOf(order.status)
        const nextIdx = Math.min(currentIdx + 1, statuses.length - 1)
        return { ...order, status: statuses[nextIdx] }
      })
    )
  }, [])

  const addReview = useCallback((review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString(),
    }
    setReviews((prev) => [newReview, ...prev])
  }, [])

  const getReviewsForProduct = useCallback(
    (productId: number) => reviews.filter((r) => r.productId === productId),
    [reviews]
  )

  const value: StoreContextType = {
    page,
    navigate,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    deliveryCharge,
    cartTotal,
    wishlist,
    toggleWishlist,
    removeFromWishlist,
    moveToCart,
    addresses,
    addAddress,
    deleteAddress,
    orders,
    placeOrder,
    getOrderById,
    advanceOrderStatus,
    reviews,
    addReview,
    getReviewsForProduct,
    showCartPanel,
    setShowCartPanel,
  }

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
