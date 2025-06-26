import React, { useState } from 'react'
import {
  User, Calendar, CreditCard, Star, HelpCircle, RefreshCw
} from 'lucide-react'

type User = {
  id: number
  email: string
  name: string
  role: string
}

type Booking = {
  id: number
  pickupTime: string
  returnTime: string
  priceEstimate: string
  confirmed: boolean
}

type Rental = {
  id: number
  status: string
  durationHours: number
  totalCost: string
}

type Payment = {
  id: number
  amount: string
  status: string
  paidAt: string
}

type Feedback = {
  id: number
  comment: string
  rating: number
}

type Support = {
  id: number
  message: string
  responded: boolean
}

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const navItems = [
  { key: 'bookings', label: 'My Bookings', icon: Calendar },
  { key: 'rentals', label: 'My Rentals', icon: User },
  { key: 'payments', label: 'My Payments', icon: CreditCard },
  { key: 'feedback', label: 'My Feedback', icon: Star },
  { key: 'support', label: 'Support', icon: HelpCircle }
]

export default function UserDashboard() {
  const [user] = useState<User>(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [active, setActive] = useState('')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async (type: string) => {
    if (!user) return
    setLoading(true)
    setActive(type)
    const endpoint = `${baseUrl}/${type}/by-user?userId=${user.id}`

    try {
      const res = await fetch(endpoint)
      const result = await res.json()
      setData(result)
    } catch (err) {
      console.error(err)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase?.()) {
      case 'completed':
      case 'confirmed':
        return 'text-green-600 bg-green-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'failed':
      case 'cancelled':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name || 'User'}</h1>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => fetchData(key)}
            className={`flex-1 p-4 rounded-lg shadow-md text-sm flex items-center gap-2 ${
              active === key ? 'bg-white border-blue-500' : 'bg-white'
            }`}
          >
            <Icon className="w-5 h-5 text-blue-500" />
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        {loading ? (
          <div className="text-center text-gray-500 flex items-center justify-center gap-2">
            <RefreshCw className="animate-spin" /> Loading...
          </div>
        ) : (
          <>
            {active === 'bookings' && data.map((b: Booking, i) => (
              <div key={b.id ?? `booking-${i}`} className="border p-3 rounded mb-3">
                <p><strong>Pickup:</strong> {new Date(b.pickupTime).toLocaleString()}</p>
                <p><strong>Return:</strong> {new Date(b.returnTime).toLocaleString()}</p>
                <p><strong>Estimate:</strong> KES {b.priceEstimate}</p>
                <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(b.confirmed ? 'confirmed' : 'pending')}`}>
                  {b.confirmed ? 'Confirmed' : 'Pending'}
                </span>
              </div>
            ))}

            {active === 'rentals' && data.map((r: Rental, i) => (
              <div key={r.id ?? `rental-${i}`} className="border p-3 rounded mb-3">
                <p><strong>Status:</strong> <span className={`${getStatusColor(r.status)} px-2 py-1 rounded text-xs`}>{r.status}</span></p>
                <p><strong>Duration:</strong> {r.durationHours} hours</p>
                <p><strong>Total Cost:</strong> KES {r.totalCost}</p>
              </div>
            ))}

            {active === 'payments' && data.map((p: Payment, i) => (
              <div key={p.id ?? `payment-${i}`} className="border p-3 rounded mb-3">
                <p><strong>Amount:</strong> KES {p.amount}</p>
                <p><strong>Status:</strong> <span className={`${getStatusColor(p.status)} px-2 py-1 rounded text-xs`}>{p.status}</span></p>
                <p><strong>Paid At:</strong> {new Date(p.paidAt).toLocaleString()}</p>
              </div>
            ))}

            {active === 'feedback' && data.map((f: Feedback, i) => (
              <div key={f.id ?? `feedback-${i}`} className="border p-3 rounded mb-3">
                <p><strong>Rating:</strong> {f.rating}/5</p>
                <p>{f.comment}</p>
              </div>
            ))}

            {active === 'support' && data.map((s: Support, i) => (
              <div key={s.id ?? `support-${i}`} className="border p-3 rounded mb-3">
                <p>{s.message}</p>
                <p className={`text-xs font-medium px-2 py-1 rounded ${s.responded ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                  {s.responded ? 'Responded' : 'Pending'}
                </p>
              </div>
            ))}

            {active && data.length === 0 && (
              <p className="text-center text-gray-400">No {active} found.</p>
            )}

            {!active && (
              <p className="text-center text-gray-500">Select a section above to view your data.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
