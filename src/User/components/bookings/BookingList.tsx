import type { Booking } from '../../../types'

type Props = {
  bookings: Booking[]
  onSelect?: (bookingId: number) => void
}

export default function BookingList({ bookings, onSelect }: Props) {
  if (bookings.length === 0) return <p>No bookings found.</p>

  return (
    <ul>
      {bookings.map((booking) => (
        <li key={booking.id} onClick={() => onSelect?.(booking.id)}>
          <p><strong>Booking #{booking.id}</strong></p>
          <p>Car ID: {booking.carId}</p>
          <p>Pickup: {new Date(booking.pickupTime).toLocaleString()}</p>
          <p>Return: {new Date(booking.returnTime).toLocaleString()}</p>
          <p>Status: {booking.confirmed ? 'Confirmed' : 'Pending'}</p>
        </li>
      ))}
    </ul>
  )
}
