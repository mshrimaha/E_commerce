type StarRatingProps = {
  rating: number
  size?: number
  showNumber?: boolean
  reviews?: number
}

export function StarRating({
  rating,
  size = 16,
  showNumber = false,
  reviews,
}: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <span
      className="star-rating"
      style={{ fontSize: size }}
      role="img"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className="star star-full">★</span>
      ))}
      {hasHalf && <span className="star star-half">★</span>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="star star-empty">★</span>
      ))}
      {showNumber && (
        <span className="rating-number">
          {rating.toFixed(1)}
          {reviews !== undefined && ` (${reviews.toLocaleString()})`}
        </span>
      )}
    </span>
  )
}
