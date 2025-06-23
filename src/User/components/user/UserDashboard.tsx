import React, { useEffect, useState } from 'react'

type Booking = {
  id: number
  pickupTime: string
  returnTime: string
  priceEstimate: string
  confirmed: boolean
  car?: {
    make: string
    model: string
    imageUrl?: string
  }
}

type User = {
  id: number
  name: string
  email: string
  role: string
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser)
      setUser(parsedUser)

      fetchBookings(parsedUser.id)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchBookings = async (userId: number) => {
    try {
      const res = await fetch(`http://localhost:3000/bookings?userId=${userId}`)
      const data = await res.json()
      setBookings(data)
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading your dashboard...</div>
  }

  if (!user) {
    return <div className="p-8 text-center text-red-600">User not logged in.</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-lime-600">Welcome back, {user.name}!</h2>
      <p className="text-gray-600 mb-6">Here are your current bookings:</p>

      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div key={b.id} className="border rounded p-4 shadow bg-white">
              <div className="font-medium mb-2">
                {b.car ? `${b.car.make} ${b.car.model}` : 'Unknown Car'}
              </div>
              <p className="text-sm text-gray-600">Pickup: {new Date(b.pickupTime).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Return: {new Date(b.returnTime).toLocaleString()}</p>
              <p className="text-sm text-gray-700">KES {b.priceEstimate}</p>
              <p className={`text-sm mt-1 font-semibold ${b.confirmed ? 'text-green-600' : 'text-amber-500'}`}>
                {b.confirmed ? 'Confirmed' : 'Pending'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
