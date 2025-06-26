
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const buttons = [
    { label: 'Bookings', path: '/admin/bookings' },
    { label: 'Rentals', path: '/admin/rentals' },
    { label: 'Payments', path: '/admin/payments' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Cars', path: '/admin/cars' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-800 mb-12 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {buttons.map(({ label, path }) => (
          <div
            key={label}
            onClick={() => navigate(path)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-200 border border-transparent hover:border-lime-500 group"
          >
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-lime-600 transition">
              {label}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Manage {label.toLowerCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
