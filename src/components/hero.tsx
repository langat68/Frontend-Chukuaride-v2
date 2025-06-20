import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Clock, Shield, Star, Calendar, Users } from 'lucide-react';

// Import your images here
import heroImage1 from '../assets/images/hero.jpg';
import heroImage2 from '../assets/images/Hero1.jpg';
import heroImage3 from '../assets/images/hero3.jpg';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroImages = [
    heroImage1,
    heroImage2,
    heroImage3
  ];

  const stats = [
    { icon: <MapPin className="w-6 h-6" />, value: "50+", label: "Locations" },
    { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Customers" },
    { icon: <Shield className="w-6 h-6" />, value: "100%", label: "Insured" },
    { icon: <Star className="w-6 h-6" />, value: "4.9", label: "Rating" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Content */}
          <div className={`space-y-8 transform transition-all duration-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium">
              <Shield className="w-4 h-4 mr-2 text-blue-600" />
              Trusted by businesses worldwide
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Premium Vehicle
                <span className="block text-blue-600">Rental Solutions</span>
              </h1>
              <div className="w-16 h-1 bg-blue-600"></div>
            </div>

            {/* Description */}
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg">
              Professional car rental services for corporate clients, business travelers, 
              and discerning individuals. Reliable, efficient, and always available.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center group">
                Reserve Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border border-slate-300 hover:border-slate-400 text-slate-700 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                <Calendar className="mr-2 w-5 h-5" />
                View Fleet
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-slate-200">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center lg:text-left transform transition-all duration-600 delay-${index * 100} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className="flex items-center justify-center lg:justify-start mb-2 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className={`relative transform transition-all duration-800 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <div className="relative">
              
              {/* Main Image Container */}
              <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Professional vehicle ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                  </div>
                ))}

                {/* Quality Badge */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm text-slate-900 px-4 py-2 rounded-lg font-semibold shadow-lg">
                  Premium Fleet
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-6 flex space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-white w-8' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Service Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">24/7 Service</h4>
                    <p className="text-sm text-slate-600">Round-the-clock support and assistance</p>
                  </div>
                </div>
              </div>

              {/* Background Element */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-50 rounded-full -z-10"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-slate-50 rounded-full -z-10"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
    </section>
  );
};

export default Hero;