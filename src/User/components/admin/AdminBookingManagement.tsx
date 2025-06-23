
// src/pages/admin/AdminBookingManagement.tsx
import React, { useEffect, useState } from 'react';

interface Booking {
  id: number;
  userId: number;
  carId: number;
  pickupTime: string;
  returnTime: string;
}

const AdminBookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/bookings`);
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Management</h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Car ID</th>
              <th className="border px-4 py-2">Pickup</th>
              <th className="border px-4 py-2">Return</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td className="border px-4 py-2">{b.id}</td>
                <td className="border px-4 py-2">{b.userId}</td>
                <td className="border px-4 py-2">{b.carId}</td>
                <td className="border px-4 py-2">{new Date(b.pickupTime).toLocaleString()}</td>
                <td className="border px-4 py-2">{new Date(b.returnTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookingManagement;