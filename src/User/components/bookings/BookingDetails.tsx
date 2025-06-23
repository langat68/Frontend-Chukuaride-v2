import type { Booking } from '../../../types/index'

type Props = {
  booking: Booking
}

export default function BookingDetails({ booking }: Props) {
  return (
    <div>
      <h3>Booking Details</h3>
      <p>Booking ID: {booking.id}</p>
      <p>User ID: {booking.userId}</p>
      <p>Car ID: {booking.carId}</p>
      <p>Pickup: {new Date(booking.pickupTime).toLocaleString()}</p>
      <p>Return: {new Date(booking.returnTime).toLocaleString()}</p>
      <p>Price Estimate: KES {booking.priceEstimate?.toFixed(2)}</p>
      <p>Status: {booking.confirmed ? 'Confirmed' : 'Not Confirmed'}</p>
    </div>
  )
}
