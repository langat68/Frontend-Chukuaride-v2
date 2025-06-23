import React from 'react';
import { Link } from 'react-router-dom';
import type { Car } from '../../../types';
import { Fuel, Zap, Cog } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const getFuelIcon = (fuelType: string | undefined) => {
    switch(fuelType) {
        case 'electric': return <Zap className="w-5 h-5 mr-1" />;
        case 'hybrid': return <div className="flex items-center"><Zap className="w-5 h-5 mr-1" /><Fuel className="w-5 h-5 mr-1" /></div>;
        default: return <Fuel className="w-5 h-5 mr-1" />;
    }
  }

  return (
    <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/cars/${car.id}`}>
        <img
          src={car.images?.[0]?.imageUrl || 'https://via.placeholder.com/400x300'}
          alt={`${car.make} ${car.model}`}
          className="w-full h-56 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-bold">
          <Link to={`/cars/${car.id}`}>{car.make} {car.model}</Link>
        </h3>
        <p className="text-gray-600">{car.year} &bull; {car.category}</p>
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-gray-700">
                {getFuelIcon(car.fuel)}
                <span className="capitalize">{car.fuel}</span>
            </div>
            <div className="flex items-center text-gray-700">
                <Cog className="w-5 h-5 mr-1" />
                <span className="capitalize">{car.transmission}</span>
            </div>
        </div>
        <div className="mt-4 text-right">
          <p className="text-lg font-semibold text-gray-800">
            ${car.pricePerDay}<span className="text-sm font-normal">/day</span>
          </p>
        </div>
        <Link
          to={`/book/${car.id}`}
          className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};