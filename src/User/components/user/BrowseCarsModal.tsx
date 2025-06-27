// // src/pages/user/BrowseCarsModal.tsx
// import React, { useEffect, useState } from 'react'
// import type { Car } from '../../../types/index'
// import BookCarModal from './BookCarModal'

// const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// // Mock data for variety of cars (remove this when your API has real data)
// const mockCars: Car[] = [
//   {
//     id: 1, // Changed from '1' to 1
//     make: 'Toyota',
//     model: 'Camry',
//     year: 2023,
//     fuel: 'petrol',
//     transmission: 'Automatic',
//     pricePerDay: 4500,
//     imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop',
//     category: 'Sedan',
//     seats: 5,
//     features: ['Air Conditioning', 'Bluetooth', 'Backup Camera']
//   },
//   {
//     id: 2, // Changed from '2' to 2
//     make: 'Honda',
//     model: 'CR-V',
//     year: 2022,
//     fuel: 'petrol',
//     transmission: 'Automatic',
//     pricePerDay: 5200,
//     imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=250&fit=crop',
//     category: 'SUV',
//     seats: 7,
//     features: ['4WD', 'Sunroof', 'Navigation', 'Heated Seats']
//   },
//   {
//     id: 3, // Changed from '3' to 3
//     make: 'Nissan',
//     model: 'Note',
//     year: 2021,
//     fuel: 'petrol',
//     transmission: 'Manual',
//     pricePerDay: 3200,
//     imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop',
//     category: 'Hatchback',
//     seats: 5,
//     features: ['Fuel Efficient', 'Compact', 'Easy Parking']
//   },
//   {
//     id: 4, // Changed from '4' to 4
//     make: 'Mercedes-Benz',
//     model: 'C-Class',
//     year: 2023,
//     fuel: 'petrol',
//     transmission: 'Automatic',
//     pricePerDay: 8500,
//     imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=250&fit=crop',
//     category: 'Luxury',
//     seats: 5,
//     features: ['Premium Interior', 'Advanced Safety', 'Premium Sound']
//   },
//   {
//     id: 5, // Changed from '5' to 5
//     make: 'Subaru',
//     model: 'Forester',
//     year: 2022,
//     fuel: 'Petrol',
//     transmission: 'Automatic',
//     pricePerDay: 4800,
//     imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop',
//     category: 'SUV',
//     seats: 5,
//     features: ['All-Wheel Drive', 'High Ground Clearance', 'Safety Award Winner']
//   },
//   {
//     id: 6, // Changed from '6' to 6
//     make: 'Volkswagen',
//     model: 'Polo',
//     year: 2021,
//     fuel: 'Petrol',
//     transmission: 'Manual',
//     pricePerDay: 3500,
//     imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop',
//     category: 'Hatchback',
//     seats: 5,
//     features: ['Economical', 'Reliable', 'City Friendly']
//   },
//   {
//     id: 7, // Changed from '7' to 7
//     make: 'Toyota',
//     model: 'Land Cruiser',
//     year: 2023,
//     fuel: 'diesel',
//     transmission: 'Automatic',
//     pricePerDay: 9500,
//     imageUrl: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=250&fit=crop',
//     category: 'SUV',
//     seats: 8,
//     features: ['4WD', 'Off-Road Capable', 'Premium Interior', 'High Towing Capacity']
//   },
//   {
//     id: 8, // Changed from '8' to 8
//     make: 'BMW',
//     model: 'X3',
//     year: 2022,
//     fuel: 'Petrol',
//     transmission: 'Automatic',
//     pricePerDay: 7200,
//     imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop',
//     category: 'Luxury SUV',
//     seats: 5,
//     features: ['Premium Brand', 'Sport Mode', 'Panoramic Sunroof']
//   }
// ]

// interface Props {
//   onClose: () => void
// }

// const BrowseCarsModal: React.FC<Props> = ({ onClose }) => {
//   const [cars, setCars] = useState<Car[]>([])
//   const [loading, setLoading] = useState(false)
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState<string>('All')
//   const [priceRange, setPriceRange] = useState<string>('All')

//   const categories = ['All', 'Sedan', 'SUV', 'Hatchback', 'Luxury', 'Luxury SUV']
//   const priceRanges = [
//     { label: 'All', value: 'All' },
//     { label: 'Under KES 4,000', value: 'under-4000' },
//     { label: 'KES 4,000 - 6,000', value: '4000-6000' },
//     { label: 'KES 6,000 - 8,000', value: '6000-8000' },
//     { label: 'Above KES 8,000', value: 'above-8000' }
//   ]

//   useEffect(() => {
//     const fetchCars = async () => {
//       setLoading(true)
//       try {
//         const res = await fetch(`${baseUrl}/api/cars/available`)
//         const data = await res.json()
//         // If API returns empty or fails, use mock data
//         setCars(data.length > 0 ? data : mockCars)
//       } catch (err) {
//         console.error(err)
//         // Fallback to mock data if API fails
//         setCars(mockCars)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCars()
//   }, [])

//   const filteredCars = cars.filter(car => {
//     const categoryMatch = selectedCategory === 'All' || car.category === selectedCategory
    
//     let priceMatch = true
//     if (priceRange !== 'All') {
//       switch (priceRange) {
//         case 'under-4000':
//           priceMatch = car.pricePerDay < 4000
//           break
//         case '4000-6000':
//           priceMatch = car.pricePerDay >= 4000 && car.pricePerDay <= 6000
//           break
//         case '6000-8000':
//           priceMatch = car.pricePerDay >= 6000 && car.pricePerDay <= 8000
//           break
//         case 'above-8000':
//           priceMatch = car.pricePerDay > 8000
//           break
//       }
//     }
    
//     return categoryMatch && priceMatch
//   })

//   if (selectedCar) {
//     return (
//       <BookCarModal
//         carId={selectedCar.id}
//         carName={`${selectedCar.make} ${selectedCar.model}`}
//         carPrice={selectedCar.pricePerDay}
//         onClose={() => {
//           setSelectedCar(null)
//           onClose()
//         }}
//       />
//     )
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-7xl shadow-2xl max-h-[95vh] overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold">Browse Available Cars</h2>
//               <p className="text-blue-100 mt-1">Find the perfect car for your journey</p>
//             </div>
//             <button 
//               onClick={onClose} 
//               className="text-2xl hover:bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
//             >
//               ×
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="p-6 border-b bg-gray-50">
//           <div className="flex flex-wrap gap-4 items-center">
//             <div className="flex items-center gap-2">
//               <label className="text-sm font-medium text-gray-700">Category:</label>
//               <select 
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <label className="text-sm font-medium text-gray-700">Price Range:</label>
//               <select 
//                 value={priceRange}
//                 onChange={(e) => setPriceRange(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 {priceRanges.map(range => (
//                   <option key={range.value} value={range.value}>{range.label}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="ml-auto text-sm text-gray-600">
//               {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''} available
//             </div>
//           </div>
//         </div>

//         {/* Cars Grid */}
//         <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 200px)' }}>
//           {loading ? (
//             <div className="flex items-center justify-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-gray-600">Loading amazing cars...</span>
//             </div>
//           ) : filteredCars.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-gray-400 text-6xl mb-4">🚗</div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No cars match your criteria</h3>
//               <p className="text-gray-500">Try adjusting your filters to see more options</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredCars.map((car) => (
//                 <div
//                   key={car.id}
//                   className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
//                 >
//                   <div className="relative">
//                     <img
//                       src={car.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=250&fit=crop'}
//                       alt={`${car.make} ${car.model}`}
//                       className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700">
//                       {car.category}
//                     </div>
//                   </div>
                  
//                   <div className="p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="font-bold text-lg text-gray-900">{car.make} {car.model}</h3>
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                         {car.year}
//                       </span>
//                     </div>
                    
//                     <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
//                       <span className="flex items-center gap-1">
//                         <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                         {car.fuel.charAt(0).toUpperCase() + car.fuel.slice(1)}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//                         {car.transmission}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
//                         {car.seats} seats
//                       </span>
//                     </div>
                    
//                     {car.features && (
//                       <div className="mb-3">
//                         <div className="flex flex-wrap gap-1">
//                           {car.features.slice(0, 2).map((feature, index) => (
//                             <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
//                               {feature}
//                             </span>
//                           ))}
//                           {car.features.length > 2 && (
//                             <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
//                               +{car.features.length - 2} more
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     )}
                    
//                     <div className="flex justify-between items-center mt-4">
//                       <div>
//                         <span className="text-2xl font-bold text-blue-600">KES {car.pricePerDay.toLocaleString()}</span>
//                         <span className="text-sm text-gray-500">/day</span>
//                       </div>
//                       <button
//                         onClick={() => setSelectedCar(car)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
//                       >
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BrowseCarsModal