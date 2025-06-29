// src/pages/FleetBrowser.tsx
import React, { useEffect, useState } from 'react'
import BookCarModal from './BookCarModal'

interface Car {
  id: number
  make: string
  model: string
  year: number
  category: string
  pricePerDay: number
  fuel: string
  transmission: string
  capacity: number
  available: boolean
  imageUrl?: string
}

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://chukuaride3.onrender.com'

const FleetBrowser: React.FC = () => {
  const [user] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [filter, setFilter] = useState({ category: '', fuel: '', maxPrice: '' })

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/cars/available`)
        if (res.ok) {
          const data = await res.json()
          setCars(data)
        }
      } catch (error) {
        console.error('Failed to fetch cars:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  const filteredCars = cars.filter(car =>
    (!filter.category || car.category === filter.category) &&
    (!filter.fuel || car.fuel === filter.fuel) &&
    (!filter.maxPrice || car.pricePerDay <= parseFloat(filter.maxPrice))
  )

  const handleBookClick = (car: Car) => {
    if (!user) {
      alert('Please log in to book a car.')
      return
    }

    if (!car.available) {
      alert('This car is currently unavailable')
      return
    }

    setSelectedCar(car)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading our fleet...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Our Fleet</h1>
        <p className="text-gray-600">Choose from our premium collection of vehicles</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h3 className="font-semibold mb-4">Filter Cars</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              value={filter.category}
              onChange={(e) => setFilter({...filter, category: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">All Categories</option>
              <option value="Economy">Economy</option>
              <option value="Compact">Compact</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
            <select 
              value={filter.fuel}
              onChange={(e) => setFilter({...filter, fuel: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">All Fuel Types</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price/Day</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={filter.maxPrice}
              onChange={(e) => setFilter({...filter, maxPrice: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <CarCard 
            key={car.id} 
            car={car} 
            onBookClick={() => handleBookClick(car)}
          />
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No cars match your filters</div>
          <button 
            onClick={() => setFilter({category: '', fuel: '', maxPrice: ''})}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Booking Modal */}
      {selectedCar && (
        <BookCarModal
          carId={selectedCar.id}
          carName={`${selectedCar.make} ${selectedCar.model}`}
          carPrice={selectedCar.pricePerDay}
          user={user}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  )
}

const CarCard: React.FC<{ car: Car, onBookClick: () => void }> = ({ car, onBookClick }) => {
  const defaultImage = "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=250&fit=crop"

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={car.imageUrl || defaultImage}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        {!car.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Currently Unavailable</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{car.year}</span>
        </div>
        
        <div className="space-y-1 mb-4 text-sm text-gray-600">
          <div className="flex justify-between"><span>Category:</span><span>{car.category}</span></div>
          <div className="flex justify-between"><span>Fuel:</span><span className="capitalize">{car.fuel}</span></div>
          <div className="flex justify-between"><span>Transmission:</span><span className="capitalize">{car.transmission}</span></div>
          <div className="flex justify-between"><span>Capacity:</span><span>{car.capacity} people</span></div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">KES {car.pricePerDay.toFixed(0)}</div>
            <div className="text-xs text-gray-500">per day</div>
          </div>
          
          <button
            onClick={onBookClick}
            disabled={!car.available}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              car.available 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {car.available ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FleetBrowser
