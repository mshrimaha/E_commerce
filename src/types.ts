export type Product = {
  id: number
  name: string
  category: string
  subcategory: string
  price: number
  oldPrice: number
  rating: number
  reviews: number
  image: string
  images: string[]
  description: string
  features: string[]
  badge?: string
}

export type CartItem = {
  productId: number
  quantity: number
}

export type Address = {
  id: string
  fullName: string
  phone: string
  house: string
  area: string
  city: string
  state: string
  pincode: string
}

export type PaymentInfo = {
  method: 'cod' | 'upi' | 'credit' | 'debit'
  upiId?: string
  cardName?: string
  cardNumber?: string
  cardExpiry?: string
  cardCvv?: string
}

export type OrderItem = {
  productId: number
  name: string
  image: string
  price: number
  quantity: number
}

export type OrderStatus = 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered'

export type Order = {
  id: string
  items: OrderItem[]
  address: Address
  payment: PaymentInfo
  total: number
  deliveryCharge: number
  date: string
  estimatedDelivery: string
  status: OrderStatus
}

export type Review = {
  id: string
  productId: number
  name: string
  rating: number
  text: string
  date: string
}

export type Page =
  | { name: 'home' }
  | { name: 'products'; category?: string; search?: string }
  | { name: 'product'; id: number }
  | { name: 'wishlist' }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'confirmation'; orderId: string }
  | { name: 'orders' }
  | { name: 'order'; orderId: string }

export type Category = {
  name: string
  icon: string
  image: string
}
