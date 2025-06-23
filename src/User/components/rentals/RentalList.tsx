import type { Rental } from '../../../types/index'

type Props = {
  rentals: Rental[]
  onSelect?: (id: number) => void
}

export default function RentalList({ rentals, onSelect }: Props) {
  if (rentals.length === 0) return <p>No rentals found.</p>

  return (
    <div className="rental-list">
      {rentals.map(rental => (
        <div key={rental.id} className="rental-item" onClick={() => onSelect?.(rental.id)}>
          <h4>Rental #{rental.id}</h4>
          <p>Status: {rental.status}</p>
          <p>Duration: {rental.durationHours ?? 'N/A'} hours</p>
          <p>Total: KES {rental.totalCost?.toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}
