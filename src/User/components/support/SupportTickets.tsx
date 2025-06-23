import type { SupportRequest } from '../../../types/index'

type Props = {
  request: SupportRequest
  onClick?: (id: number) => void
}

export default function SupportCard({ request, onClick }: Props) {
  return (
    <div
      className="support-card"
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: request.responded ? '#f0fff0' : '#fff8f0',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={() => onClick?.(request.id)}
    >
      <p><strong>Message:</strong> {request.message}</p>
      <p><strong>Status:</strong> {request.responded ? 'Responded' : 'Pending'}</p>
      <p><small>Submitted on: {new Date(request.createdAt).toLocaleString()}</small></p>
    </div>
  )
}
