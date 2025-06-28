import { useState, useEffect } from 'react'
import {
  User, Calendar, CreditCard, Star, HelpCircle, RefreshCw, Car, Menu, X, 
  TrendingUp, Clock, CheckCircle, AlertCircle, MapPin, Fuel, Users, Settings
} from 'lucide-react'

const baseUrl = 'http://localhost:3000'

const navItems = [
  { key: 'browse', label: 'Browse Cars', icon: Car, color: 'text-blue-600' },
  { key: 'bookings', label: 'Bookings', icon: Calendar, color: 'text-green-600' },
  { key: 'rentals', label: 'Active Rentals', icon: Clock, color: 'text-purple-600' },
  { key: 'payments', label: 'Payments', icon: CreditCard, color: 'text-orange-600' },
  { key: 'feedback', label: 'Reviews', icon: Star, color: 'text-yellow-600' },
  { key: 'support', label: 'Support', icon: HelpCircle, color: 'text-indigo-600' }
]

interface CarType {
  id: string
  make: string
  model: string
  pricePerDay: number
  transmission: string
  fuel: string
  capacity: number
  images?: { imageUrl: string }[]
  location?: string
  year?: number
}

interface BookCarModalProps {
  carId: string
  carName: string
  carPrice: number
  onClose: () => void
}

const BookCarModal = ({  carName, carPrice, onClose }: BookCarModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Book {carName}</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Daily Rate</p>
            <p className="text-2xl font-bold text-blue-600">KES {carPrice}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Booking functionality would be implemented here')
                onClose()
              }}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UserDashboard() {
  const [user] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [active, setActive] = useState('rentals')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [bookingCount, setBookingCount] = useState(0)
  const [rentalCount, setRentalCount] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [cars, setCars] = useState<CarType[]>([])
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null)

  const fetchData = async (type: string) => {
    if (!user) return
    setLoading(true)
    setActive(type)
    setSidebarOpen(false)
    
    try {
      if (type === 'browse') {
        const res = await fetch(`${baseUrl}/cars/available`)
        const cars = await res.json()
        setCars(cars)
        setData([])
      } else {
        const res = await fetch(`${baseUrl}/${type}/by-user?userId=${user.id}`)
        const result = await res.json()
        setData(result)

        // Update stats based on fetched data
        if (type === 'bookings') setBookingCount(result.length)
        if (type === 'rentals') setRentalCount(result.length)
        if (type === 'payments') {
          const total = result.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0)
          setTotalSpent(total)
        }
        if (type === 'feedback') {
          const avg = result.length ? result.reduce((sum: number, f: any) => sum + f.rating, 0) / result.length : 0
          setAverageRating(avg)
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setData([])
      setCars([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      // Fetch initial data for rentals and stats
      fetchData('rentals')
      fetchStats()
    }
  }, [user])

  // Fetch all stats on component mount
  const fetchStats = async () => {
    if (!user) return
    
    try {
      // Fetch bookings count
      const bookingsRes = await fetch(`${baseUrl}/bookings/by-user?userId=${user.id}`)
      const bookingsData = await bookingsRes.json()
      setBookingCount(bookingsData.length)

      // Fetch rentals count
      const rentalsRes = await fetch(`${baseUrl}/rentals/by-user?userId=${user.id}`)
      const rentalsData = await rentalsRes.json()
      setRentalCount(rentalsData.length)

      // Fetch payments total
      const paymentsRes = await fetch(`${baseUrl}/payments/by-user?userId=${user.id}`)
      const paymentsData = await paymentsRes.json()
      const total = paymentsData.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0)
      setTotalSpent(total)

      // Fetch feedback average
      const feedbackRes = await fetch(`${baseUrl}/feedback/by-user?userId=${user.id}`)
      const feedbackData = await feedbackRes.json()
      const avg = feedbackData.length ? feedbackData.reduce((sum: number, f: any) => sum + f.rating, 0) / feedbackData.length : 0
      setAverageRating(avg)
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  const getStatusColor = (status?: string) => {
    const s = status?.toLowerCase?.()
    switch (s) {
      case 'completed':
      case 'confirmed':
      case 'active':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200'
      case 'pending':
        return 'text-amber-700 bg-amber-50 border-amber-200'
      case 'failed':
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status?: string) => {
    const s = status?.toLowerCase?.()
    switch (s) {
      case 'completed':
      case 'confirmed':
      case 'active':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'failed':
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Car className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">RentaCar</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full w-72 bg-white/95 backdrop-blur-md border-r border-gray-200 px-6 py-8 z-50 transform transition-all duration-300 ease-in-out shadow-xl lg:shadow-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:block
      `}>
        <div className="flex items-center gap-3 mb-10 mt-8 lg:mt-0">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">RentaCar</h2>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => fetchData(key)}
              className={`flex items-center w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active === key
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md border border-blue-100'
                  : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 transition-colors ${active === key ? 'text-blue-600' : color}`} />
              {label}
              {active === key && (
                <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 space-y-8 pt-24 lg:pt-0 overflow-x-hidden">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl border-4 border-white/30 shadow-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h2>
              <p className="text-blue-100 mb-4">Ready to hit the road? Your next adventure awaits.</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Premium Member</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Since June 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Bookings', value: bookingCount, icon: Calendar, color: 'from-blue-500 to-blue-600', bg: 'from-blue-50 to-blue-100' },
            { label: 'Active Rentals', value: rentalCount, icon: Clock, color: 'from-green-500 to-green-600', bg: 'from-green-50 to-green-100' },
            { label: 'Total Spent', value: `KES ${totalSpent.toLocaleString()}`, icon: CreditCard, color: 'from-purple-500 to-purple-600', bg: 'from-purple-50 to-purple-100' },
            { label: 'Avg Rating', value: averageRating.toFixed(1), icon: Star, color: 'from-yellow-500 to-yellow-600', bg: 'from-yellow-50 to-yellow-100' }
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.bg} p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.label}</h3>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        {active === 'browse' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Available Cars</h3>
              <div className="text-sm text-gray-500">{cars.length} cars available</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div key={car.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={car.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop'}
                      alt={car.make}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {car.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{car.make} {car.model}</h2>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{car.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">KES {car.pricePerDay.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">per day</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Settings className="w-4 h-4" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="w-4 h-4" />
                        <span>{car.fuel}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{car.capacity} seats</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCar(car)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 capitalize">{active}</h3>
              <p className="text-gray-600 mt-1">Manage your {active} history and details</p>
            </div>
            
            <div className="p-8">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center gap-3 text-gray-500">
                    <RefreshCw className="animate-spin w-6 h-6" />
                    <span className="text-lg">Loading your {active}...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {active === 'bookings' &&
                    data.map((b: any) => (
                      <div key={b.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="space-y-3 flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Pickup Time</p>
                                <p className="text-base text-gray-900">{new Date(b.pickupTime).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Return Time</p>
                                <p className="text-base text-gray-900">{new Date(b.returnTime).toLocaleString()}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Price Estimate</p>
                              <p className="text-xl font-bold text-blue-600">KES {b.priceEstimate.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(b.confirmed ? 'confirmed' : 'pending')}
                            <span className={`text-sm font-medium px-4 py-2 rounded-xl border ${getStatusColor(b.confirmed ? 'confirmed' : 'pending')}`}>
                              {b.confirmed ? 'Confirmed' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                  {active === 'payments' &&
                    data.map((p: any) => (
                      <div key={p.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="space-y-3 flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Amount</p>
                                <p className="text-xl font-bold text-purple-600">KES {parseFloat(p.amount).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Paid At</p>
                                <p className="text-base text-gray-900">{new Date(p.paidAt).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(p.status)}
                            <span className={`text-sm font-medium px-4 py-2 rounded-xl border ${getStatusColor(p.status)}`}>
                              {p.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                  {active === 'feedback' &&
                    data.map((f: any) => (
                      <div key={f.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500 fill-current" />
                              <span className="text-lg font-bold text-gray-900">{f.rating}/5</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(f.createdAt || Date.now()).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-700 leading-relaxed">{f.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                  {active === 'support' &&
                    data.map((s: any) => (
                      <div key={s.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-gray-700 leading-relaxed">{s.message}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(s.responded ? 'completed' : 'pending')}
                              <span className={`text-sm font-medium px-4 py-2 rounded-xl border ${s.responded ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-700 bg-red-50 border-red-200'}`}>
                                {s.responded ? 'Responded' : 'Pending'}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Submitted: {new Date(s.createdAt || Date.now()).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}

                  {data.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        {(() => {
                          const activeItem = navItems.find(item => item.key === active);
                          if (activeItem) {
                            const IconComponent = activeItem.icon;
                            return <IconComponent className="w-8 h-8 text-gray-400" />;
                          }
                          return null;
                        })()}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No {active} found</h3>
                      <p className="text-gray-500">Your {active} will appear here once you have some activity.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedCar && (
          <BookCarModal
            carId={selectedCar.id}
            carName={`${selectedCar.make} ${selectedCar.model}`}
            carPrice={selectedCar.pricePerDay}
            onClose={() => {
              setSelectedCar(null)
              fetchData('bookings')
            }}
          />
        )}
      </main>
    </div>
  )
}


/*import { useState, useEffect } from 'react'
import {
  User as UserIcon, Calendar, CreditCard, Star, HelpCircle, RefreshCw, Car
} from 'lucide-react'
import userImage from '../../../assets/images/Hero1.jpg'
import BookCarModal from '../user/BookCarModal'
import type { Car as CarType } from '../../../types'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const navItems = [
  { key: 'browse', label: 'Browse Cars', icon: Car },
  { key: 'bookings', label: 'Bookings', icon: Calendar },
  { key: 'rentals', label: 'Active Rentals', icon: UserIcon },
  { key: 'payments', label: 'Payments', icon: CreditCard },
  { key: 'feedback', label: 'Reviews', icon: Star },
  { key: 'support', label: 'Support', icon: HelpCircle }
]

export default function UserDashboard() {
  const [user] = useState(() => {
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
  const [cars, setCars] = useState<CarType[]>([])
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null)

  const fetchData = async (type: string) => {
    if (!user) return
    setLoading(true)
    setActive(type)
    try {
      if (type === 'browse') {
        const res = await fetch(`${baseUrl}/cars/available`)
        const cars = await res.json()
        setCars(cars)
        setData([])
      } else {
        const res = await fetch(`${baseUrl}/${type}/by-user?userId=${user.id}`)
        const result = await res.json()
        setData(result)

        if (type === 'bookings') setBookingCount(result.length)
        if (type === 'rentals') setRentalCount(result.length)
        if (type === 'payments') {
          const total = result.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0)
          setTotalSpent(total)
        }
        if (type === 'feedback') {
          const avg = result.length ? result.reduce((sum: number, f: any) => sum + f.rating, 0) / result.length : 0
          setAverageRating(avg)
        }
      }
    } catch (err) {
      console.error(err)
      setData([])
      setCars([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchData('rentals')
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

      <main className="flex-1 p-10 space-y-10">
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

        <div className="bg-blue-600 text-white rounded-xl p-6 flex items-center gap-6 shadow">
          <img src={userImage} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white shadow" />
          <div>
            <h2 className="text-2xl font-semibold mb-1">Welcome back, {user?.name || 'User'}!</h2>
            <p className="text-sm text-blue-100">Member since 6/15/2023</p>
          </div>
        </div>

        {active === 'browse' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow p-4">
                <img
  src={car.images?.[0]?.imageUrl || '/placeholder-car.jpg'}
  alt={car.make}
  className="w-full h-40 object-cover rounded mb-4"
/>

                <h2 className="text-lg font-semibold">{car.make} {car.model}</h2>
                <p className="text-sm text-gray-600">KES {car.pricePerDay} / day</p>
                <p className="text-xs text-gray-400">{car.transmission} • {car.fuel} • {car.capacity} passengers</p>

                <button
                  onClick={() => setSelectedCar(car)}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            {loading ? (
              <div className="text-center text-gray-500 flex items-center justify-center gap-2">
                <RefreshCw className="animate-spin" /> Loading...
              </div>
            ) : (
              <>
                {active === 'bookings' &&
                  data.map((b: any) => (
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
                  data.map((r: any) => (
                    <div key={r.id} className="border p-4 rounded">
                      <p><strong>Status:</strong> <span className={`${getStatusColor(r.status)} px-2 py-1 rounded text-xs`}>{r.status}</span></p>
                      <p><strong>Duration:</strong> {r.durationHours} hours</p>
                      <p><strong>Total Cost:</strong> KES {r.totalCost}</p>
                    </div>
                  ))}

                {active === 'payments' &&
                  data.map((p: any) => (
                    <div key={p.id} className="border p-4 rounded">
                      <p><strong>Amount:</strong> KES {p.amount}</p>
                      <p><strong>Status:</strong> <span className={`${getStatusColor(p.status)} px-2 py-1 rounded text-xs`}>{p.status}</span></p>
                      <p><strong>Paid At:</strong> {new Date(p.paidAt).toLocaleString()}</p>
                    </div>
                  ))}

                {active === 'feedback' &&
                  data.map((f: any) => (
                    <div key={f.id} className="border p-4 rounded">
                      <p><strong>Rating:</strong> {f.rating}/5</p>
                      <p>{f.comment}</p>
                    </div>
                  ))}

                {active === 'support' &&
                  data.map((s: any) => (
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
              </>
            )}
          </div>
        )}

        {selectedCar && (
          <BookCarModal
            carId={selectedCar.id}
            carName={`${selectedCar.make} ${selectedCar.model}`}
            carPrice={selectedCar.pricePerDay}
            onClose={() => {
              setSelectedCar(null)
              fetchData('bookings')
            }}
          />
        )}
      </main>
    </div>
  )
} */