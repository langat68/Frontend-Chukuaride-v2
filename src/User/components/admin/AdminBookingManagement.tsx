type Props = {
  bookingId: number
  confirmed: boolean
  onToggle: (id: number, confirmed: boolean) => void
}

export default function AdminBookingManagement({ bookingId, confirmed, onToggle }: Props) {
  return (
    <div>
      <p>Booking ID: {bookingId}</p>
      <button onClick={() => onToggle(bookingId, !confirmed)}>
        {confirmed ? 'Revoke Confirmation' : 'Confirm Booking'}
      </button>
    </div>
  )
}
