import type { Rental } from '../../../types'

type Props = {
  rentals: Rental[]
}

export default function UserRentals({ rentals }: Props) {
  return (
    <div>
      <h3>My Rentals</h3>
      {rentals.length === 0 ? <p>No rentals yet.</p> : (
        rentals.map(r => (
          <div key={r.id}>
            <p>Rental #{r.id}</p>
            <p>Status: {r.status}</p>
            <p>Duration: {r.durationHours ?? 'N/A'} hrs</p>
            <p>Cost: KES {r.totalCost?.toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  )
}
