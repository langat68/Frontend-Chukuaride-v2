import React, { useState } from 'react'
import { User, Calendar, CreditCard, MessageSquare, Star, HelpCircle, RefreshCw, Download, Bell, Settings, LogOut, Plus } from 'lucide-react'

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

export default function UserDashboard() {
  const [user] = useState<User>(() => {
    // Try to get user from localStorage first
    try {
      const stored = localStorage.getItem('user')
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Could not access localStorage, using fallback user')
    }
    
    // Fallback user (change this ID to match your actual user)
    return {
      id: 21, // Updated to match your user ID
      name: "User",
      email: "user@example.com", 
      role: "customer"
    }
  })

  const [data, setData] = useState<any[]>([])
  const [active, setActive] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = async (type: string) => {
    setLoading(true)
    setActive(type)
    
    const endpointMap: Record<string, string> = {
      bookings: `/bookings/by-user?userId=${user.id}`,
      rentals: `/rentals/by-user?userId=${user.id}`,
      payments: `/payments/by-user?userId=${user.id}`,
      feedback: `/feedback/by-user?userId=${user.id}`,
      support: `/support-requests/by-user?userId=${user.id}`,
    }

    try {
      const res = await fetch(`${baseUrl}${endpointMap[type]}`)
      const result = await res.json()
      setData(result)
    } catch (err) {
      console.error(`Error fetching ${type}:`, err)
      setData([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'confirmed':
        return 'text-green-600 bg-green-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'cancelled':
      case 'failed':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const navItems = [
    { key: 'bookings', label: 'My Bookings', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { key: 'rentals', label: 'My Rentals', icon: User, color: 'from-purple-500 to-purple-600' },
    { key: 'payments', label: 'My Payments', icon: CreditCard, color: 'from-green-500 to-green-600' },
    { key: 'feedback', label: 'My Feedback', icon: Star, color: 'from-yellow-500 to-yellow-600' },
    { key: 'support', label: 'Support Requests', icon: HelpCircle, color: 'from-red-500 to-red-600' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow group">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">New Booking</span>
              </div>
            </button>
            
            <button className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow group">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Download Report</span>
              </div>
            </button>
            
            <button className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow group">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Contact Support</span>
              </div>
            </button>
            
            <button 
              onClick={() => active && fetchData(active)}
              className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow group"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Refresh Data</span>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Account</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  onClick={() => fetchData(item.key)}
                  className={`p-6 rounded-xl border transition-all duration-200 group ${
                    active === item.key
                      ? 'bg-white shadow-lg border-blue-200 ring-2 ring-blue-500 ring-opacity-20'
                      : 'bg-white hover:shadow-md hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">{item.label}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            ) : (
              <>
                {active === 'bookings' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      My Bookings
                    </h3>
                    {data.map((b: Booking) => (
                      <div key={b.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Pickup Time</p>
                            <p className="font-medium">{new Date(b.pickupTime).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Return Time</p>
                            <p className="font-medium">{new Date(b.returnTime).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Price Estimate</p>
                            <p className="font-medium text-green-600">KES {b.priceEstimate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              b.confirmed ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'
                            }`}>
                              {b.confirmed ? 'Confirmed' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {active === 'rentals' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <User className="w-5 h-5 mr-2 text-purple-500" />
                      My Rentals
                    </h3>
                    {data.map((r: Rental) => (
                      <div key={r.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(r.status)}`}>
                              {r.status}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="font-medium">{r.durationHours} hours</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Cost</p>
                            <p className="font-medium text-green-600">KES {r.totalCost}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {active === 'payments' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-green-500" />
                      My Payments
                    </h3>
                    {data.map((p: Payment) => (
                      <div key={p.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="font-medium text-green-600">KES {p.amount}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(p.status)}`}>
                              {p.status}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Paid At</p>
                            <p className="font-medium">{new Date(p.paidAt).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {active === 'feedback' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      My Feedback
                    </h3>
                    {data.map((f: Feedback) => (
                      <div key={f.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < f.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">({f.rating}/5)</span>
                          </div>
                          <p className="text-gray-700">{f.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {active === 'support' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-red-500" />
                      Support Requests
                    </h3>
                    {data.map((s: Support) => (
                      <div key={s.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-gray-700 mb-2">{s.message}</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              s.responded ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                            }`}>
                              {s.responded ? 'Responded' : 'Pending Response'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {active && data.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">No {active} found</p>
                    <p className="text-gray-400 text-sm mt-1">Your {active} will appear here when available</p>
                  </div>
                )}

                {!active && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">Welcome to your dashboard</p>
                    <p className="text-gray-400 text-sm mt-1">Select a section above to view your data</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}