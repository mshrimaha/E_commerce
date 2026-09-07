import { useState } from 'react'
import { useStore } from '../store'
import { StarRating } from './StarRating'

type ReviewSectionProps = {
  productId: number
}

export function ReviewSection({ productId }: ReviewSectionProps) {
  const { addReview, getReviewsForProduct } = useStore()
  const productReviews = getReviewsForProduct(productId)
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    addReview({ productId, name: name.trim(), rating, text: text.trim() })
    setName('')
    setRating(5)
    setText('')
  }

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="review-section">
      <h3>Customer Reviews ({productReviews.length})</h3>

      <form className="review-form" onSubmit={handleSubmit}>
        <h4>Write a Review</h4>
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <div className="star-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${(hoverRating || rating) >= star ? 'active' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your experience..."
            rows={3}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Submit Review
        </button>
      </form>

      <div className="reviews-list">
        {productReviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          productReviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-header">
                <div className="review-avatar">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="reviewer-name">{review.name}</p>
                  <StarRating rating={review.rating} size={14} />
                </div>
                <span className="review-date">{formatDate(review.date)}</span>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
