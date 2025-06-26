import  { useState, useEffect } from 'react'
import {
  User as UserIcon, Calendar, CreditCard, Star, HelpCircle, RefreshCw
} from 'lucide-react'
import userImage from '../../../assets/images/Hero1.jpg'

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
  { key: 'bookings', label: 'Bookings', icon: Calendar },
  { key: 'rentals', label: 'Active Rentals', icon: UserIcon },
  { key: 'payments', label: 'Payments', icon: CreditCard },
  { key: 'feedback', label: 'Reviews', icon: Star },
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

  const [active, setActive] = useState('rentals')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [bookingCount, setBookingCount] = useState(0)
  const [rentalCount, setRentalCount] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [averageRating, setAverageRating] = useState(0)

  const fetchData = async (type: string) => {
    if (!user) return
    setLoading(true)
    setActive(type)
    try {
      const res = await fetch(`${baseUrl}/${type}/by-user?userId=${user.id}`)
      const result = await res.json()
      setData(result)

      if (type === 'bookings') setBookingCount(result.length)
      if (type === 'rentals') setRentalCount(result.length)
      if (type === 'payments') {
        const total = result.reduce((sum: number, p: Payment) => sum + parseFloat(p.amount), 0)
        setTotalSpent(total)
      }
      if (type === 'feedback') {
        const avg = result.length ? result.reduce((sum: number, f: Feedback) => sum + f.rating, 0) / result.length : 0
        setAverageRating(avg)
      }
    } catch (err) {
      console.error(err)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchData('rentals')
    }
  }, [user])

  const getStatusColor = (status?: string) => {
    const s = status?.toLowerCase?.()
    switch (s) {
      case 'completed':
      case 'confirmed':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'failed':
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-4">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => fetchData(key)}
              className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition ${
                active === key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <h3 className="text-sm text-gray-500">Total Bookings</h3>
            <p className="text-2xl font-bold text-blue-700">{bookingCount}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <h3 className="text-sm text-gray-500">Active Rentals</h3>
            <p className="text-2xl font-bold text-green-700">{rentalCount}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <h3 className="text-sm text-gray-500">Total Spent</h3>
            <p className="text-2xl font-bold text-purple-700">KES {totalSpent}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <h3 className="text-sm text-gray-500">Avg Rating</h3>
            <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-blue-600 text-white rounded-xl p-6 flex items-center gap-6 shadow">
          <img src={userImage} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white shadow" />
          <div>
            <h2 className="text-2xl font-semibold mb-1">Welcome back, {user?.name || 'User'}!</h2>
            <p className="text-sm text-blue-100">Member since 6/15/2023</p>
          </div>
        </div>

        {/* Dynamic Panel */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          {loading ? (
            <div className="text-center text-gray-500 flex items-center justify-center gap-2">
              <RefreshCw className="animate-spin" /> Loading...
            </div>
          ) : (
            <>
              {active === 'bookings' &&
                data.map((b: Booking) => (
                  <div key={b.id} className="border p-4 rounded">
                    <p><strong>Pickup:</strong> {new Date(b.pickupTime).toLocaleString()}</p>
                    <p><strong>Return:</strong> {new Date(b.returnTime).toLocaleString()}</p>
                    <p><strong>Estimate:</strong> KES {b.priceEstimate}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(b.confirmed ? 'confirmed' : 'pending')}`}>
                      {b.confirmed ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                ))}

              {active === 'rentals' &&
                data.map((r: Rental) => (
                  <div key={r.id} className="border p-4 rounded">
                    <p><strong>Status:</strong> <span className={`${getStatusColor(r.status)} px-2 py-1 rounded text-xs`}>{r.status}</span></p>
                    <p><strong>Duration:</strong> {r.durationHours} hours</p>
                    <p><strong>Total Cost:</strong> KES {r.totalCost}</p>
                  </div>
                ))}

              {active === 'payments' &&
                data.map((p: Payment) => (
                  <div key={p.id} className="border p-4 rounded">
                    <p><strong>Amount:</strong> KES {p.amount}</p>
                    <p><strong>Status:</strong> <span className={`${getStatusColor(p.status)} px-2 py-1 rounded text-xs`}>{p.status}</span></p>
                    <p><strong>Paid At:</strong> {new Date(p.paidAt).toLocaleString()}</p>
                  </div>
                ))}

              {active === 'feedback' &&
                data.map((f: Feedback) => (
                  <div key={f.id} className="border p-4 rounded">
                    <p><strong>Rating:</strong> {f.rating}/5</p>
                    <p>{f.comment}</p>
                  </div>
                ))}

              {active === 'support' &&
                data.map((s: Support) => (
                  <div key={s.id} className="border p-4 rounded">
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
      </main>
    </div>
  )
}
