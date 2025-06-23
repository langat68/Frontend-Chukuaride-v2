import { useState, useEffect } from 'react'
import type { Booking } from '../../../types'

export default function UserBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings')
        if (!response.ok) {
          throw new Error('Failed to fetch bookings')
        }
        const data = await response.json()
        setBookings(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  if (loading) return <div>Loading bookings...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h3>My Bookings</h3>
      {bookings.length === 0 ? <p>No bookings yet.</p> : (
        bookings.map(b => (
          <div key={b.id}>
            <p>Car #{b.carId}</p>
            <p>From: {new Date(b.pickupTime).toLocaleString()}</p>
            <p>To: {new Date(b.returnTime).toLocaleString()}</p>
            <p>Status: {b.confirmed ? 'Confirmed' : 'Pending'}</p>
          </div>
        ))
      )}
    </div>
  )
}