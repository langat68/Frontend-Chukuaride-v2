// src/pages/admin/AdminCarManagement.tsx
import React, { useEffect, useState } from 'react';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  location: string;
}

const AdminCarManagement = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/cars`);
        if (!res.ok) throw new Error('Failed to fetch cars');
        const data = await res.json();
        setCars(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Car Inventory Management</h1>
      {loading ? (
        <p>Loading cars...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Make</th>
              <th className="border px-4 py-2">Model</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td className="border px-4 py-2">{car.id}</td>
                <td className="border px-4 py-2">{car.make}</td>
                <td className="border px-4 py-2">{car.model}</td>
                <td className="border px-4 py-2">{car.year}</td>
                <td className="border px-4 py-2">{car.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCarManagement;