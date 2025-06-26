// src/pages/admin/AdminRentalManagement.tsx
import React, { useEffect, useState } from 'react';

interface Rental {
  id: number;
  bookingId: number;
  status: string;
  durationHours: number;
  totalCost: string;
  startedAt: string;
  endedAt: string;
  userName: string;
  userEmail: string;
  carMake: string;
  carModel: string;
  carLocation: string;
}

const AdminRentalManagement = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredRentals = rentals.filter((rental) => {
    const matchesStatus = filterStatus === 'all' || rental.status === filterStatus;
    const matchesSearch = (
      rental.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.carMake.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.carLocation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesStatus && matchesSearch;
  });

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this rental?');
    if (!confirmed) return;

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/rentals/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setRentals(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert('Error deleting rental');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rental Management</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, car..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-64"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="booked">Booked</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p>Loading rentals...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Car</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Duration (hrs)</th>
                <th className="border px-4 py-2">Total Cost</th>
                <th className="border px-4 py-2">Start</th>
                <th className="border px-4 py-2">End</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRentals.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{r.userName}<br /><span className="text-sm text-gray-500">{r.userEmail}</span></td>
                  <td className="border px-4 py-2">{r.carMake} {r.carModel}</td>
                  <td className="border px-4 py-2">{r.carLocation}</td>
                  <td className="border px-4 py-2 capitalize">{r.status}</td>
                  <td className="border px-4 py-2">{r.durationHours}</td>
                  <td className="border px-4 py-2">KES {r.totalCost}</td>
                  <td className="border px-4 py-2">{new Date(r.startedAt).toLocaleString()}</td>
                  <td className="border px-4 py-2">{new Date(r.endedAt).toLocaleString()}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => alert('Edit logic goes here')}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRentals.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500">No rentals match your search or filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRentalManagement;
