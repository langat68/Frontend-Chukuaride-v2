import React, { useEffect, useState } from 'react';

interface Rental {
  id: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string; // e.g., 'active', 'completed', 'cancelled'
}

const AdminRentalManagement = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/rentals`);
        if (!res.ok) throw new Error('Failed to fetch rentals');
        const data = await res.json();
        setRentals(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rental Management</h1>
      {loading ? (
        <p>Loading rentals...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Car ID</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td className="border px-4 py-2">{rental.id}</td>
                <td className="border px-4 py-2">{rental.userId}</td>
                <td className="border px-4 py-2">{rental.carId}</td>
                <td className="border px-4 py-2">{new Date(rental.startDate).toLocaleString()}</td>
                <td className="border px-4 py-2">{new Date(rental.endDate).toLocaleString()}</td>
                <td className="border px-4 py-2">KES {rental.totalPrice}</td>
                <td className="border px-4 py-2">{rental.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminRentalManagement;
