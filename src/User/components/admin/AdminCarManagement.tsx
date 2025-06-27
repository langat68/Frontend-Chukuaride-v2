import { useEffect, useState } from 'react';

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
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://chukuaride3.onrender.com';
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
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Car Inventory Management</h1>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading cars...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600 font-medium">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">ID</th>
                  <th className="text-left px-6 py-3 font-semibold">Make</th>
                  <th className="text-left px-6 py-3 font-semibold">Model</th>
                  <th className="text-left px-6 py-3 font-semibold">Year</th>
                  <th className="text-left px-6 py-3 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr
                    key={car.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-gray-100 transition duration-150`}
                  >
                    <td className="px-6 py-4">{car.id}</td>
                    <td className="px-6 py-4">{car.make}</td>
                    <td className="px-6 py-4">{car.model}</td>
                    <td className="px-6 py-4">{car.year}</td>
                    <td className="px-6 py-4">{car.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCarManagement;
