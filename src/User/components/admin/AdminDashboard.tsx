import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Car,
  CreditCard,
  Users,
  Key,
  BarChart3,
  Settings,
  Bell,
} from 'lucide-react';

interface DashboardData {
  bookings?: {
    active?: number;
    today?: number;
  };
  rentals?: {
    ongoing?: number;
    overdue?: number;
  };
  payments?: {
    monthly?: number;
    total?: number;
  };
  users?: {
    total?: number;
    active?: number;
  };
  cars?: {
    available?: number;
    rented?: number;
  };
  metrics?: {
    completionRate?: string;
    utilization?: string;
    paymentSuccess?: string;
  };
}

interface AdminDashboardProps {
  dashboardData: DashboardData;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ dashboardData }) => {
  const navigate = useNavigate();

  // ... rest of the component


  const buttons = [
    {
      label: 'Bookings',
      path: '/admin/bookings',
      icon: Calendar,
      description: 'View and manage all reservations',
      color: 'from-blue-500 to-blue-600',
      stats: dashboardData?.bookings?.active || '-',
      subStats: dashboardData?.bookings?.today
        ? `${dashboardData.bookings.today} today`
        : '',
    },
    {
      label: 'Rentals',
      path: '/admin/rentals',
      icon: Key,
      description: 'Track ongoing and completed rentals',
      color: 'from-emerald-500 to-emerald-600',
      stats: dashboardData?.rentals?.ongoing || '-',
      subStats: dashboardData?.rentals?.overdue
        ? `${dashboardData.rentals.overdue} overdue`
        : '',
    },
    {
      label: 'Payments',
      path: '/admin/payments',
      icon: CreditCard,
      description: 'Monitor transactions and billing',
      color: 'from-violet-500 to-violet-600',
      stats: dashboardData?.payments?.monthly
        ? `$${dashboardData.payments.monthly}`
        : '-',
      subStats: 'this month',
    },
    {
      label: 'Users',
      path: '/admin/users',
      icon: Users,
      description: 'Manage customer accounts',
      color: 'from-orange-500 to-orange-600',
      stats: dashboardData?.users?.total || '-',
      subStats: dashboardData?.users?.active
        ? `${dashboardData.users.active} active`
        : '',
    },
    {
      label: 'Cars',
      path: '/admin/cars',
      icon: Car,
      description: 'Fleet management and maintenance',
      color: 'from-red-500 to-red-600',
      stats: dashboardData?.cars?.available || '-',
      subStats: dashboardData?.cars?.rented
        ? `${dashboardData.cars.rented} rented`
        : '',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Manage your rental business</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin</h2>
          <p className="text-gray-600">Here's what's happening with your business today.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buttons.map(({ label, path, icon: Icon, description, color, stats, subStats }) => (
            <div
              key={label}
              onClick={() => navigate(path)}
              className="group cursor-pointer bg-white/70 backdrop-blur-sm hover:bg-white border border-gray-200/50 hover:border-gray-300/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats}</div>
                  {subStats && <div className="text-xs text-gray-500">{subStats}</div>}
                </div>
              </div>

              {/* Card Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {label}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  <span>Manage {label.toLowerCase()}</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {dashboardData && (
          <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {dashboardData.metrics?.completionRate || '-'}
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {dashboardData.metrics?.utilization || '-'}
                </div>
                <div className="text-sm text-gray-600">Fleet Utilization</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-600">
                  {dashboardData.payments?.total ? `$${dashboardData.payments.total}` : '-'}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {dashboardData.metrics?.paymentSuccess || '-'}
                </div>
                <div className="text-sm text-gray-600">Payment Success</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
