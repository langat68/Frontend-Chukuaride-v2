import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/store/hooks';
import { fetchCars } from '../../../Redux/store/thunks/carThunks';
import { CarCard } from './CarCard';
import type { Car } from '../../../types';

export const CarList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cars, loading, error } = useAppSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-10">Loading cars...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {cars.map((car: Car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};