import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/hero';
import HowItWorks from './components/Howitworks';
import Fleet from './components/Fleet';
import Testimonial from './components/Testimonial';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LoginForm from '././User/components/auth/LoginForm'; // ✅ import your login form
import RegisterForm from '././User/components/auth/RegisterForm';
import UserDashboard from '././User/components/user/UserDashboard';
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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} /> 
    <Route path="/user/dashboard" element={<UserDashboard />} />

      </Routes>
    </>
  );
}

export default App;
