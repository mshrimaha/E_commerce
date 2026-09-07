import { useState } from 'react'
import { useStore } from '../store'
import { getProductById } from '../data'
import type { PaymentInfo } from '../types'

export function CheckoutPage() {
  const {
    cart,
    cartSubtotal,
    deliveryCharge,
    cartTotal,
    addresses,
    addAddress,
    deleteAddress,
    placeOrder,
    navigate,
  } = useStore()

  const [step, setStep] = useState(1)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses[0]?.id ?? null
  )
  const [showAddressForm, setShowAddressForm] = useState(addresses.length === 0)
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    house: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [payment, setPayment] = useState<PaymentInfo>({
    method: 'cod',
  })

  const cartProducts = cart.map((item) => ({
    item,
    product: getProductById(item.productId),
  }))

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId)

  if (cart.length === 0) {
    return (
      <div className="empty-page">
        <div className="empty-page-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add products before checking out!</p>
        <button className="btn-primary" onClick={() => navigate({ name: 'products' })}>
          Browse Products
        </button>
      </div>
    )
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = addAddress(addressForm)
    setAddressForm({
      fullName: '',
      phone: '',
      house: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
    })
    setShowAddressForm(false)
    setSelectedAddressId(newId)
  }

  const handlePlaceOrder = () => {
    if (!selectedAddress) return
    const order = placeOrder(selectedAddress, payment)
    navigate({ name: 'confirmation', orderId: order.id })
  }

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  }

  const estimatedDate = formatDate(new Date(Date.now() + 5 * 86400000).toISOString())

  return (
    <div className="checkout-page">
      <div className="page-banner">
        <div className="page-banner-content">
          <h1>Checkout</h1>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="step-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Address</span>
        </div>
        <div className={`step-line ${step > 1 ? 'done' : ''}`} />
        <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Delivery</span>
        </div>
        <div className={`step-line ${step > 2 ? 'done' : ''}`} />
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <span className="step-number">3</span>
          <span className="step-label">Payment</span>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-main">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="checkout-step">
              <h2>Delivery Address</h2>

              {addresses.length > 0 && !showAddressForm && (
                <div className="address-list">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`address-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                      />
                      <div className="address-info">
                        <p className="address-name">{addr.fullName}</p>
                        <p>{addr.house}, {addr.area}</p>
                        <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p>Phone: {addr.phone}</p>
                      </div>
                      <button
                        className="btn-text danger"
                        onClick={(e) => {
                          e.preventDefault()
                          deleteAddress(addr.id)
                          if (selectedAddressId === addr.id) {
                            setSelectedAddressId(null)
                          }
                        }}
                      >
                        Delete
                      </button>
                    </label>
                  ))}
                </div>
              )}

              {showAddressForm ? (
                <form className="address-form" onSubmit={handleSaveAddress}>
                  <h3>{addresses.length > 0 ? 'Add New Address' : 'Add Your Address'}</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        required
                        value={addressForm.fullName}
                        onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>House / Street</label>
                    <input
                      type="text"
                      required
                      value={addressForm.house}
                      onChange={(e) => setAddressForm({ ...addressForm, house: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Area / Locality</label>
                    <input
                      type="text"
                      required
                      value={addressForm.area}
                      onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        required
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        required
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={addressForm.pincode}
                      onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Save Address</button>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setShowAddressForm(false)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <button
                  className="btn-outline"
                  onClick={() => setShowAddressForm(true)}
                >
                  + Add New Address
                </button>
              )}

              {selectedAddress && (
                <button
                  className="btn-primary checkout-nav-btn"
                  onClick={() => setStep(2)}
                >
                  Continue to Delivery →
                </button>
              )}
            </div>
          )}

          {/* Step 2: Delivery */}
          {step === 2 && (
            <div className="checkout-step">
              <h2>Delivery Details</h2>

              {selectedAddress && (
                <div className="delivery-address-card">
                  <h4>Delivering To</h4>
                  <p className="address-name">{selectedAddress.fullName}</p>
                  <p>{selectedAddress.house}, {selectedAddress.area}</p>
                  <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                  <p>Phone: {selectedAddress.phone}</p>
                </div>
              )}

              <div className="delivery-items">
                <h4>Products in This Order</h4>
                {cartProducts.map(({ item, product }) => {
                  if (!product) return null
                  return (
                    <div className="delivery-product" key={item.productId}>
                      <img src={product.image} alt={product.name} />
                      <div>
                        <p className="delivery-product-name">{product.name}</p>
                        <p className="delivery-product-qty">Qty: {item.quantity}</p>
                      </div>
                      <span className="delivery-product-price">
                        ₹{(product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="delivery-eta">
                <span className="delivery-icon">🚚</span>
                <p>Estimated Delivery: <strong>{estimatedDate}</strong></p>
              </div>

              <div className="checkout-nav">
                <button className="btn-secondary" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button className="btn-primary" onClick={() => setStep(3)}>
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="checkout-step">
              <h2>Payment Method</h2>

              <div className="payment-options">
                <label className={`payment-option ${payment.method === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment.method === 'cod'}
                    onChange={() => setPayment({ method: 'cod' })}
                  />
                  <div>
                    <p className="payment-title">Cash on Delivery</p>
                    <p className="payment-desc">Pay when your order arrives</p>
                  </div>
                </label>

                <label className={`payment-option ${payment.method === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment.method === 'upi'}
                    onChange={() => setPayment({ method: 'upi' })}
                  />
                  <div>
                    <p className="payment-title">UPI</p>
                    <p className="payment-desc">Pay using any UPI app</p>
                  </div>
                </label>

                {payment.method === 'upi' && (
                  <div className="payment-fields">
                    <div className="form-group">
                      <label>UPI ID</label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={payment.upiId ?? ''}
                        onChange={(e) => setPayment({ ...payment, upiId: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <label className={`payment-option ${payment.method === 'credit' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment.method === 'credit'}
                    onChange={() => setPayment({ method: 'credit' })}
                  />
                  <div>
                    <p className="payment-title">Credit Card</p>
                    <p className="payment-desc">Visa, Mastercard, RuPay</p>
                  </div>
                </label>

                {payment.method === 'credit' && (
                  <div className="payment-fields">
                    <div className="form-group">
                      <label>Card Holder Name</label>
                      <input
                        type="text"
                        value={payment.cardName ?? ''}
                        onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={payment.cardNumber ?? ''}
                        onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={payment.cardExpiry ?? ''}
                          onChange={(e) => setPayment({ ...payment, cardExpiry: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="password"
                          placeholder="***"
                          maxLength={3}
                          value={payment.cardCvv ?? ''}
                          onChange={(e) => setPayment({ ...payment, cardCvv: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <label className={`payment-option ${payment.method === 'debit' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment.method === 'debit'}
                    onChange={() => setPayment({ method: 'debit' })}
                  />
                  <div>
                    <p className="payment-title">Debit Card</p>
                    <p className="payment-desc">All major bank cards</p>
                  </div>
                </label>

                {payment.method === 'debit' && (
                  <div className="payment-fields">
                    <div className="form-group">
                      <label>Card Holder Name</label>
                      <input
                        type="text"
                        value={payment.cardName ?? ''}
                        onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={payment.cardNumber ?? ''}
                        onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={payment.cardExpiry ?? ''}
                          onChange={(e) => setPayment({ ...payment, cardExpiry: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="password"
                          placeholder="***"
                          maxLength={3}
                          value={payment.cardCvv ?? ''}
                          onChange={(e) => setPayment({ ...payment, cardCvv: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="checkout-nav">
                <button className="btn-secondary" onClick={() => setStep(2)}>
                  ← Back
                </button>
                <button className="btn-accent" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <aside className="checkout-summary">
          <h3>Price Details</h3>
          <div className="summary-row">
            <span>Price ({cart.length} items)</span>
            <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total Payable</span>
            <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
          </div>
        </aside>
      </div>
    </div>
  )
}
