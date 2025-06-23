import type { Rental } from '../../../types'

type Props = {
  rental: Rental
}

export default function RentalDetails({ rental }: Props) {
  return (
    <div className="rental-details">
      <h3>Rental ID: {rental.id}</h3>
      <p>Booking ID: {rental.bookingId}</p>
      <p>Status: {rental.status}</p>
      <p>Duration: {rental.durationHours ?? 'N/A'} hours</p>
      <p>Total Cost: KES {rental.totalCost?.toLocaleString()}</p>
      <p>Started: {rental.startedAt ? new Date(rental.startedAt).toLocaleString() : 'Not started'}</p>
      <p>Ended: {rental.endedAt ? new Date(rental.endedAt).toLocaleString() : 'Not ended'}</p>
    </div>
  )
}
