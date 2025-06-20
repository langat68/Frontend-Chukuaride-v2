import React, { useState } from 'react';
import { Fuel, Settings, Users, DollarSign, ChevronDown, Star, CircleX } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Fleet</h1>
          <p className="text-gray-600">Find the perfect vehicle for your needs</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-8 border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <ChevronDown className="text-blue-600 w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-800">Find Your Car</h2>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-5 gap-4">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            >
              <option value="">All Car Types</option>
              <option value="Economy">Economy</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
            </select>

            <select
              name="fuel"
              value={filters.fuel}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
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
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            >
              <option value="">Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>

            <select
              name="capacity"
              value={filters.capacity}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            >
              <option value="">Number of Seats</option>
              <option value="2">2 Seats</option>
              <option value="4">4 Seats</option>
              <option value="5">5 Seats</option>
              <option value="7">7 Seats</option>
            </select>

            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              <div className="flex-shrink-0 snap-start">
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                >
                  <option value="">Car Type</option>
                  <option value="Economy">Economy</option>
                  <option value="Luxury">Luxury</option>
                  <option value="SUV">SUV</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div className="flex-shrink-0 snap-start">
                <select
                  name="fuel"
                  value={filters.fuel}
                  onChange={handleFilterChange}
                  className="w-28 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                >
                  <option value="">Fuel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="flex-shrink-0 snap-start">
                <select
                  name="transmission"
                  value={filters.transmission}
                  onChange={handleFilterChange}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                >
                  <option value="">Gearbox</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div className="flex-shrink-0 snap-start">
                <select
                  name="capacity"
                  value={filters.capacity}
                  onChange={handleFilterChange}
                  className="w-28 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                >
                  <option value="">Seats</option>
                  <option value="2">2 Seats</option>
                  <option value="4">4 Seats</option>
                  <option value="5">5 Seats</option>
                  <option value="7">7 Seats</option>
                </select>
              </div>

              <div className="flex-shrink-0 snap-start">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredCars.length}</span> of {dummyCars.length} vehicles
          </p>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-200"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                    {car.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1">
                  <div className="flex items-center space-x-1">
                    {renderStars(car.rating)}
                    <span className="text-xs font-medium text-gray-700 ml-1">{car.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-gray-500 text-sm">{car.year}</p>
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
                  <div className="flex flex-wrap gap-1">
                    {car.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors">
                  Book Now - ${car.pricePerDay}/day
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <CircleX className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No vehicles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more options</p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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