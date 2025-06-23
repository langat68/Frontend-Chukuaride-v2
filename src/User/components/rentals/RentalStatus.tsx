import { useState } from 'react'

type Props = {
  currentStatus: 'booked' | 'ongoing' | 'completed' | 'cancelled'
  onUpdate: (status: 'booked' | 'ongoing' | 'completed' | 'cancelled') => void
}

export default function RentalStatus({ currentStatus, onUpdate }: Props) {
  const [status, setStatus] = useState(currentStatus)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(status)
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={status} onChange={e => setStatus(e.target.value as Props['currentStatus'])}>
        <option value="booked">Booked</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <button type="submit">Update Status</button>
    </form>
  )
}
