import React, { useState, useEffect } from 'react';
import { User, Menu, X, Car, Phone, MapPin, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Fleet', href: '#fleet', hasSubmenu: true },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];

  const fleetCategories = [
    { name: 'Economy Cars', icon: <Car className="w-4 h-4" /> },
    { name: 'Luxury Vehicles', icon: <Car className="w-4 h-4" /> },
    { name: 'SUVs & Trucks', icon: <Car className="w-4 h-4" /> },
    { name: 'Electric Cars', icon: <Car className="w-4 h-4" /> }
  ];

  return (
    <>
      <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
                Chukuaride
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  <a
                    href={item.href}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-lime-600 font-medium transition-colors duration-200 relative"
                  >
                    {item.name}
                    {item.hasSubmenu && <ChevronDown className="ml-1 w-4 h-4" />}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-500 to-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  
                  {/* Fleet Submenu */}
                  {item.hasSubmenu && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="py-2">
                        {fleetCategories.map((category, idx) => (
                          <a
                            key={idx}
                            href={`#fleet-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors duration-200"
                          >
                            {category.icon}
                            <span className="ml-3">{category.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Phone */}
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+254 700 123 456</span>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Nairobi</span>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-lime-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-lime-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Account</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="py-2">
                      <a href="#signin" className="block px-4 py-3 text-sm text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors duration-200">
                        Sign In
                      </a>
                      <a href="#signup" className="block px-4 py-3 text-sm text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors duration-200">
                        Create Account
                      </a>
                      <div className="border-t border-gray-100 my-1"></div>
                      <a href="#dashboard" className="block px-4 py-3 text-sm text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors duration-200">
                        My Bookings
                      </a>
                      <a href="#profile" className="block px-4 py-3 text-sm text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition-colors duration-200">
                        Profile Settings
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-700 hover:text-lime-600 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  <a
                    href={item.href}
                    className="block py-3 text-lg font-medium text-gray-700 hover:text-lime-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                  
                  {/* Mobile Fleet Submenu */}
                  {item.hasSubmenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {fleetCategories.map((category, idx) => (
                        <a
                          key={idx}
                          href={`#fleet-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center py-2 text-sm text-gray-600 hover:text-lime-600 transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Contact Info */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>+254 700 123 456</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>

              {/* Mobile User Actions */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <button className="w-full bg-gradient-to-r from-lime-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-lime-600 hover:to-emerald-700 transition-all duration-200">
                  Sign In
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:border-lime-500 hover:text-lime-600 transition-all duration-200">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Click outside to close dropdowns */}
      {(isUserMenuOpen || isOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default Navbar;