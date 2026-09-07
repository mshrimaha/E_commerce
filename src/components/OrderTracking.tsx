import type { OrderStatus } from '../types'

type OrderTrackingProps = {
  status: OrderStatus
  onAdvance?: () => void
}

const STAGES: { key: OrderStatus; label: string; icon: string }[] = [
  { key: 'confirmed', label: 'Order Confirmed', icon: '✓' },
  { key: 'packed', label: 'Packed', icon: '📦' },
  { key: 'shipped', label: 'Shipped', icon: '🚚' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: '🏍️' },
  { key: 'delivered', label: 'Delivered', icon: '🏠' },
]

export function OrderTracking({ status, onAdvance }: OrderTrackingProps) {
  const currentIdx = STAGES.findIndex((s) => s.key === status)

  return (
    <div className="order-tracking">
      <div className="tracking-timeline">
        {STAGES.map((stage, idx) => {
          const isDone = idx <= currentIdx
          const isCurrent = idx === currentIdx
          return (
            <div
              key={stage.key}
              className={`tracking-stage ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
            >
              <div className="tracking-marker">
                {isDone ? <span className="marker-check">✓</span> : <span className="marker-num">{idx + 1}</span>}
              </div>
              <span className="tracking-label">{stage.label}</span>
              {idx < STAGES.length - 1 && (
                <div className={`tracking-line ${idx < currentIdx ? 'filled' : ''}`} />
              )}
            </div>
          )
        })}
      </div>

      {onAdvance && status !== 'delivered' && (
        <button className="btn-outline tracking-advance" onClick={onAdvance}>
          Simulate Next Stage
        </button>
      )}
    </div>
  )
}
