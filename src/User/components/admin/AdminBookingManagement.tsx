import React, { useEffect, useState } from 'react';

interface Booking {
  id: number;
  pickupTime: string;
  returnTime: string;
  priceEstimate: string;
  confirmed: boolean;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  car: {
    make: string;
    model: string;
    location: string;
  };
}

const AdminBookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filtered, setFiltered] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [confirmedFilter, setConfirmedFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/bookings`);
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data);
        setFiltered(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = bookings;

    if (searchTerm.trim()) {
      result = result.filter(
        b =>
          b.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      result = result.filter(b => b.car.location === locationFilter);
    }

    if (confirmedFilter) {
      result = result.filter(b => b.confirmed.toString() === confirmedFilter);
    }

    if (startDate && endDate) {
      result = result.filter(b => {
        const pickup = new Date(b.pickupTime);
        return pickup >= new Date(startDate) && pickup <= new Date(endDate);
      });
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [searchTerm, locationFilter, confirmedFilter, startDate, endDate, bookings]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Management</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by user or car"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select
          value={locationFilter}
          onChange={e => setLocationFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Locations</option>
          <option value="Nairobi">Nairobi</option>
          <option value="Mombasa">Mombasa</option>
        </select>
        <select
          value={confirmedFilter}
          onChange={e => setConfirmedFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="true">Confirmed</option>
          <option value="false">Pending</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Car</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Pickup</th>
                <th className="border px-4 py-2">Return</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(b => (
                <tr key={b.id}>
                  <td className="border px-4 py-2">
                    {b.user.name}
                    <br />
                    <span className="text-sm text-gray-500">{b.user.email}</span>
                  </td>
                  <td className="border px-4 py-2">{b.car.make} {b.car.model}</td>
                  <td className="border px-4 py-2">{b.car.location}</td>
                  <td className="border px-4 py-2">{new Date(b.pickupTime).toLocaleString()}</td>
                  <td className="border px-4 py-2">{new Date(b.returnTime).toLocaleString()}</td>
                  <td className="border px-4 py-2">KSh {b.priceEstimate}</td>
                  <td className="border px-4 py-2 text-center">
                    {b.confirmed ? (
                      <span className="text-green-600 font-bold">✔</span>
                    ) : (
                      <span className="text-yellow-600 font-bold">Pending</span>
                    )}
                  </td>
                  <td className="border px-4 py-2 space-x-2 text-center">
                    <button className="text-blue-600 hover:underline" onClick={() => alert('Edit modal here')}>
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(b.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBookingManagement;
