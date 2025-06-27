import { useEffect, useState } from 'react'
import {
   Search, Filter, Edit3, Trash2, Eye,
  CheckCircle, Clock, MapPin, User, Car
} from 'lucide-react'

interface Booking {
  id: number
  pickupTime: string
  returnTime: string
  priceEstimate: string
  confirmed: boolean
  createdAt: string
  user: {
    id: number
    name: string
    email: string
  }
  car: {
    make: string
    model: string
    location: string
  }
}

const AdminBookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filtered, setFiltered] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [confirmedFilter, setConfirmedFilter] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
        const res = await fetch(`${baseUrl}/bookings`)
        if (!res.ok) throw new Error('Failed to fetch bookings')
        const data = await res.json()
        setBookings(data)
        setFiltered(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  useEffect(() => {
    let result = bookings

    if (searchTerm.trim()) {
      result = result.filter(
        b =>
          b.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (locationFilter) {
      result = result.filter(b => b.car.location === locationFilter)
    }

    if (confirmedFilter) {
      result = result.filter(b => b.confirmed.toString() === confirmedFilter)
    }

    if (startDate && endDate) {
      result = result.filter(b => {
        const pickup = new Date(b.pickupTime)
        return pickup >= new Date(startDate) && pickup <= new Date(endDate)
      })
    }

    setFiltered(result)
    setCurrentPage(1)
  }, [searchTerm, locationFilter, confirmedFilter, startDate, endDate, bookings])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      setBookings(prev => prev.filter(b => b.id !== id))
    }
  }

  const handleConfirmBooking = (id: number) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, confirmed: true } : b))
    )
  }

  const clearFilters = () => {
    setSearchTerm('')
    setLocationFilter('')
    setConfirmedFilter('')
    setStartDate('')
    setEndDate('')
  }

  const getUniqueLocations = () => {
    return [...new Set(bookings.map(b => b.car.location))]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-red-200">
          <div className="text-red-500 text-center">
            <p className="text-lg font-semibold">Error Loading Bookings</p>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
              <p className="text-gray-600 mt-1">Manage and monitor all rental bookings</p>
            </div>
            <div className="bg-blue-50 px-3 py-2 rounded-lg text-blue-700 font-medium text-center">
              {filtered.length} Total Bookings
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users, cars..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {getUniqueLocations().map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <select
                value={confirmedFilter}
                onChange={e => setConfirmedFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="true">Confirmed</option>
                <option value="false">Pending</option>
              </select>

              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Customer', 'Vehicle', 'Rental Period', 'Price', 'Status', 'Actions'].map(header => (
                    <th key={header} className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginated.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{booking.user.name}</div>
                          <div className="text-sm text-gray-500">{booking.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Car className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.car.make} {booking.car.model}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {booking.car.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>Pickup: {new Date(booking.pickupTime).toLocaleString()}</div>
                        <div className="text-gray-500">Return: {new Date(booking.returnTime).toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      KSh {booking.priceEstimate}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      {booking.confirmed ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Confirmed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => alert('View details')} className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => alert('Edit booking')} className="text-green-600 hover:text-green-900">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {!booking.confirmed && (
                          <button onClick={() => handleConfirmBooking(booking.id)} className="text-blue-600 hover:text-blue-900">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => handleDelete(booking.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={itemsPerPage}
                onChange={e => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                {[5, 10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>

            <div className="text-sm text-gray-700 text-center">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} results
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBookingManagement
