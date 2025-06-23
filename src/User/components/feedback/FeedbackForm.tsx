import { useState } from 'react'

type Props = {
  carId: number
  onSubmit: (data: { rating: number; comment: string }) => void
}

export default function FeedbackForm({  onSubmit }: Props) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating < 1 || rating > 5) {
      alert('Please select a rating between 1 and 5.')
      return
    }
    onSubmit({ rating, comment })
    setRating(0)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating:</label>
      <select value={rating} onChange={e => setRating(Number(e.target.value))} required>
        <option value={0}>Select</option>
        {[1, 2, 3, 4, 5].map(star => (
          <option key={star} value={star}>{star}</option>
        ))}
      </select>

      <label>Comment:</label>
      <textarea
        placeholder="Leave a comment..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        required
      />

      <button type="submit">Submit Feedback</button>
    </form>
  )
}
