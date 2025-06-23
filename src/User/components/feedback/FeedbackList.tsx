import type { Feedback } from '../../../types/index'

type Props = {
  feedbacks: Feedback[]
}

export default function FeedbackList({ feedbacks }: Props) {
  if (feedbacks.length === 0) return <p>No reviews yet for this car.</p>

  return (
    <div className="feedback-list">
      {feedbacks.map(fb => (
        <div key={fb.id} className="feedback-item">
          <p><strong>Rating:</strong> {fb.rating} ⭐</p>
          <p><strong>Comment:</strong> {fb.comment}</p>
          <p><small>Posted on: {new Date(fb.createdAt).toLocaleDateString()}</small></p>
        </div>
      ))}
    </div>
  )
}
