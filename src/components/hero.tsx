// Image imports at the top
import heroImage1 from '../assets/images/hero1.jpg';
import heroImage2 from '../assets/images/hero.jpg';
import heroImage3 from '../assets/images/hero2.jpg';

import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Clock, Shield, Star, Calendar, Users, Play, ChevronDown, Car, Zap } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Use imported images instead of URLs
  const heroImages = [
    heroImage1,
    heroImage2,
    heroImage3
  ];



  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gray-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Header Content */}
        <div className={`text-center max-w-4xl mx-auto mb-12 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          
          {/* Trust Badge */}
          <div className="inline-flex items-center bg-gray-900/90 backdrop-blur-sm border border-gray-300 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2 text-blue-400" />
            Kenya's #1 Car Rental Service
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Drive Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dreams Today
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Premium car rentals across Kenya. From city drives to safari adventures, 
            we've got the perfect ride for every journey.
          </p>

          {/* Creative Book Now Button */}
          <div className="flex justify-center mb-8">
            <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-purple-500/25 border-2 border-transparent hover:border-white/20">
              {/* Animated background sparkle effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Button content */}
              <span className="relative flex items-center justify-center">
                <Car className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Book Your Ride
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              
              {/* Pulse effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Image Carousel - Enlarged and Repositioned */}
        <div className={`relative max-w-6xl mx-auto mb-8 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '300ms' }}>
          <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
              >
                <img
                  src={image}
                  alt={`Premium vehicle ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute top-4 right-4 flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white w-6' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Feature Highlights - Enhanced for White Background */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '700ms' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h4 className="text-gray-900 font-bold mb-2">24/7 Support</h4>
            <p className="text-gray-600 text-sm">Round-the-clock assistance wherever you go</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-4" />
            <h4 className="text-gray-900 font-bold mb-2">Fully Insured</h4>
            <p className="text-gray-600 text-sm">Comprehensive coverage for peace of mind</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl">
            <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
            <h4 className="text-gray-900 font-bold mb-2">Instant Booking</h4>
            <p className="text-gray-600 text-sm">Reserve your car in under 2 minutes</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-16">
          <ChevronDown className="w-6 h-6 text-gray-400 mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;