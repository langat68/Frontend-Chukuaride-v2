// Enhanced Professional UserDashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  User as UserIcon,
  Calendar,
  CreditCard,
  Star,
  HelpCircle,
  RefreshCw,
  Car as CarIcon,
  ChevronRight,
  Activity,
  TrendingUp
} from 'lucide-react';
import BookCarModal from '../user/BookCarModal';
import type { Car } from '../../../types/index';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://chukuaride3.onrender.com';

const UserDashboard: React.FC = () => {
  const [user] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [data, setData] = useState({
    bookings: [],
    rentals: [],
    payments: [],
    feedback: [],
    supportRequests: []
  });

  const [availableCars, setAvailableCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (type: string) => {
    if (!user) return;
    try {
      const endpoint = type === 'supportRequests' ? 'support' : type;
      const res = await fetch(`${baseUrl}/${endpoint}/by-user?userId=${user.id}`);
      const json = await res.json();
      setData((prev) => ({ ...prev, [type]: json }));
    } catch (err) {
      console.error(`Failed to fetch ${type}:`, err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${baseUrl}/cars/available`);
      const json = await res.json();
      setAvailableCars(json);
    } catch (err) {
      console.error('Failed to fetch available cars:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData('bookings');
      fetchData('rentals');
      fetchData('payments');
      fetchData('feedback');
      fetchData('supportRequests');
      fetchStats();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl shadow-lg ring-4 ring-white bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <UserIcon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Welcome back, {user.name}
                </h1>
                <p className="text-gray-600 text-lg">Here's your activity overview</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <Activity className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <DashboardCard icon={<Calendar />} label="Bookings" value={data.bookings.length} bgColor="bg-gradient-to-br from-blue-500 to-blue-600" isLoading={isLoading} />
          <DashboardCard icon={<RefreshCw />} label="Rentals" value={data.rentals.length} bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600" isLoading={isLoading} />
          <DashboardCard icon={<CreditCard />} label="Payments" value={data.payments.length} bgColor="bg-gradient-to-br from-purple-500 to-purple-600" isLoading={isLoading} />
          <DashboardCard icon={<Star />} label="Feedback" value={data.feedback.length} bgColor="bg-gradient-to-br from-amber-500 to-orange-500" isLoading={isLoading} />
          <DashboardCard icon={<HelpCircle />} label="Support" value={data.supportRequests.length} bgColor="bg-gradient-to-br from-red-500 to-red-600" isLoading={isLoading} />
          <DashboardCard icon={<CarIcon />} label="Available Cars" value={availableCars.length} bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600" isLoading={isLoading} />
        </div>

        {/* Cars Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Our Fleet</h2>
              <p className="text-gray-600">Discover premium vehicles for your next journey</p>
            </div>
            <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
              <span className="font-medium">View All</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableCars.map((car) => {
                const images = Array.isArray(car.images) ? car.images : [];
                return (
                  <div
                    key={car.id}
                    className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => setSelectedCar(car)}
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4 bg-gradient-to-br from-gray-100 to-gray-200">
                      {images[0]?.imageUrl ? (
                        <img
                          src={images[0].imageUrl}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                          <div className="text-center">
                            <CarIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                            <div className="text-sm font-medium text-slate-500">
                              {car.make} {car.model}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-xs font-semibold text-gray-700">Available</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {car.make} {car.model}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-2xl font-bold text-gray-900">
                            KES {car.pricePerDay.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500">/day</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Book Now</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!isLoading && availableCars.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CarIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Cars Available</h3>
              <p className="text-gray-600">Check back later for new vehicles.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedCar && (
          <BookCarModal
            carId={selectedCar.id}
            carName={`${selectedCar.make} ${selectedCar.model}`}
            carPrice={selectedCar.pricePerDay}
            user={user}
            onClose={() => {
              setSelectedCar(null);
              fetchData('bookings');
            }}
          />
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({
  icon,
  label,
  value,
  bgColor,
  isLoading
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  isLoading: boolean;
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 hover:shadow-md transition-all duration-200">
    {isLoading ? (
      <div className="animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-4">
        <div className={`${bgColor} text-white p-3 rounded-xl shadow-lg`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-gray-600 text-sm font-medium truncate">{label}</p>
        </div>
      </div>
    )}
  </div>
);

export default UserDashboard;
