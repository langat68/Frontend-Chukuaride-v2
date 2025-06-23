import React from 'react';
import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/hero';
import HowItWorks from './components/Howitworks';
import Fleet from './components/Fleet';
import Testimonial from './components/Testimonial';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LoginForm from './User/components/auth/LoginForm';
import RegisterForm from './User/components/auth/RegisterForm';
import UserDashboard from './User/components/user/UserDashboard';

// Admin pages
import AdminDashboard from './User/components/admin/AdminDashboard';
import AdminUserManagement from './User/components/admin/AdminUserManagement';
import AdminCarManagement from './User/components/admin/AdminCarManagement';
import AdminBookingManagement from './User/components/admin/AdminBookingManagement';
import AdminRentalManagement from './User/components/admin/AdminRentalManagement'; // ✅ Rentals
import AdminPaymentManagement from './User/components/admin/AdminPaymentManagement'; // ✅ Payments

import './App.css';

function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Fleet />
      <Testimonial />
      <FAQ />
      <Footer />
    </>
  );
}

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.role === 'admin' ? children : <Navigate to="/" />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        <Route path="/admin/users" element={<RequireAdmin><AdminUserManagement /></RequireAdmin>} />
        <Route path="/admin/cars" element={<RequireAdmin><AdminCarManagement /></RequireAdmin>} />
        <Route path="/admin/bookings" element={<RequireAdmin><AdminBookingManagement /></RequireAdmin>} />
        <Route path="/admin/rentals" element={<RequireAdmin><AdminRentalManagement /></RequireAdmin>} />
        <Route path="/admin/payments" element={<RequireAdmin><AdminPaymentManagement /></RequireAdmin>} /> {/* ✅ Added */}
      </Routes>
    </>
  );
}

export default App;
