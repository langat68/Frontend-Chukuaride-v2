import React, { useState } from 'react';
import { Fuel, Settings, Users, DollarSign, Filter, Star, CircleX } from 'lucide-react';

// Import images at the top
const carImages = {
  toyotaCorolla: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=300&fit=crop',
  teslaModel3: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
  landRoverDiscovery: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
  bmwX5: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
  audiA4: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
  mercedesCClass: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
};

type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  fuel: string;
  transmission: string;
  capacity: number;
  pricePerDay: number;
  image: string;
  rating: number;
  features: string[];
  category: string;
};

const dummyCars: Car[] = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    fuel: 'Petrol',
    transmission: 'Automatic',
    capacity: 5,
    pricePerDay: 50,
    image: carImages.toyotaCorolla,
    rating: 4.5,
    features: ['Fuel Efficient', 'Reliable', 'Comfortable'],
    category: 'Economy'
  },
  {
    id: 2,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    fuel: 'Electric',
    transmission: 'Automatic',
    capacity: 5,
    pricePerDay: 90,
    image: carImages.teslaModel3,
    rating: 4.8,
    features: ['Zero Emissions', 'Autopilot', 'Premium Interior'],
    category: 'Electric'
  },
  {
    id: 3,
    make: 'Land Rover',
    model: 'Discovery',
    year: 2021,
    fuel: 'Diesel',
    transmission: 'Manual',
    capacity: 7,
    pricePerDay: 120,
    image: carImages.landRoverDiscovery,
    rating: 4.6,
    features: ['Off-Road', 'Spacious', 'Luxury'],
    category: 'SUV'
  },
  {
    id: 4,
    make: 'BMW',
    model: 'X5',
    year: 2023,
    fuel: 'Petrol',
    transmission: 'Automatic',
    capacity: 5,
    pricePerDay: 110,
    image: carImages.bmwX5,
    rating: 4.7,
    features: ['Sport Mode', 'Premium Sound', 'Navigation'],
    category: 'Luxury'
  },
  {
    id: 5,
    make: 'Audi',
    model: 'A4',
    year: 2022,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    capacity: 5,
    pricePerDay: 85,
    image: carImages.audiA4,
    rating: 4.6,
    features: ['Hybrid Engine', 'Virtual Cockpit', 'Quattro AWD'],
    category: 'Luxury'
  },
  {
    id: 6,
    make: 'Mercedes',
    model: 'C-Class',
    year: 2023,
    fuel: 'Petrol',
    transmission: 'Automatic',
    capacity: 5,
    pricePerDay: 95,
    image: carImages.mercedesCClass,
    rating: 4.8,
    features: ['Luxury Interior', 'Advanced Safety', 'Smooth Ride'],
    category: 'Luxury'
  }
];

const Fleet: React.FC = () => {
  const [filters, setFilters] = useState({
    fuel: '',
    transmission: '',
    capacity: '',
    category: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      fuel: '',
      transmission: '',
      capacity: '',
      category: ''
    });
  };

  const filteredCars = dummyCars.filter((car) => {
    return (
      (!filters.fuel || car.fuel === filters.fuel) &&
      (!filters.transmission || car.transmission === filters.transmission) &&
      (!filters.capacity || car.capacity === parseInt(filters.capacity)) &&
      (!filters.category || car.category === filters.category)
    );
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="text-yellow-400 w-4 h-4 fill-current" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="text-yellow-400 opacity-50 w-4 h-4 fill-current" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Premium Fleet Collection
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Discover luxury, comfort, and performance in every ride
          </p>
          <div className="flex justify-center space-x-8 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Instant Booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Best Prices</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Filter Your Perfect Car</h2>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Categories</option>
              <option value="Economy">Economy</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
            </select>

            <select
              name="fuel"
              value={filters.fuel}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <select
              name="transmission"
              value={filters.transmission}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>

            <select
              name="capacity"
              value={filters.capacity}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Capacity</option>
              <option value="2">2 Seats</option>
              <option value="4">4 Seats</option>
              <option value="5">5 Seats</option>
              <option value="7">7 Seats</option>
            </select>

            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            Showing <span className="font-semibold text-blue-600">{filteredCars.length}</span> of <span className="font-semibold">{dummyCars.length}</span> vehicles
          </p>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {car.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1">
                    {renderStars(car.rating)}
                    <span className="text-sm font-medium text-gray-700 ml-1">{car.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-gray-500 text-sm">{car.year} Model</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Fuel className="text-blue-600 w-4 h-4" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Settings className="text-blue-600 w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="text-blue-600 w-4 h-4" />
                    <span>{car.capacity} Seats</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    <span>${car.pricePerDay}/day</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Book Now - ${car.pricePerDay}/day
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <CircleX className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No vehicles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more options</p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fleet;