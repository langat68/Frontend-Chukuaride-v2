import React, { useState } from 'react';
import { Car, Calendar, CreditCard, Key,  MapPin, Clock, Shield } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Browse & Select",
      description: "Choose from our diverse fleet of vehicles",
      details: "Browse cars by category, fuel type, transmission, and location. View detailed specs, pricing, and real photos.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Book Your Dates",
      description: "Pick your rental period and get instant pricing",
      details: "Select pickup and return times. Our system calculates hourly or daily rates automatically with transparent pricing.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Secure Payment",
      description: "Pay safely with multiple payment options",
      details: "Complete payment through our secure gateway. Get instant confirmation and digital receipts via email.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Pick Up & Drive",
      description: "Collect your car and hit the road",
      details: "Show your booking confirmation, complete a quick inspection, and you're ready to go. Keys in hand within minutes.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const features = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-500" />,
      title: "Multiple Locations",
      description: "Pick up from convenient locations across the city"
    },
    {
      icon: <Clock className="w-6 h-6 text-green-500" />,
      title: "Flexible Duration",
      description: "Rent by the hour or day, whatever suits your needs"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Fully Insured",
      description: "All vehicles come with comprehensive insurance coverage"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Renting a car has never been easier. Follow these simple steps to get on the road in minutes.
          </p>
        </div>

        {/* Main Steps */}
        <div className="mb-20">
          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 to-orange-200 transform -translate-y-1/2 z-0"></div>
              
              <div className="relative grid grid-cols-4 gap-8 z-10">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`group cursor-pointer transition-all duration-500 ${
                      activeStep === index ? 'scale-105' : 'hover:scale-102'
                    }`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    <div className="text-center">
                      {/* Icon Circle */}
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        {step.icon}
                      </div>
                      
                      {/* Step Number */}
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-700 mx-auto mb-4 shadow-sm">
                        {index + 1}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {step.description}
                      </p>
                      
                      {/* Detailed Description */}
                      <div className={`transition-all duration-500 overflow-hidden ${
                        activeStep === index 
                          ? 'max-h-20 opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {step.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white flex-shrink-0`}>
                  {React.cloneElement(step.icon, { className: "w-6 h-6" })}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 mr-3">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {step.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h4 className="text-lg font-semibold text-gray-900 ml-3">
                  {feature.title}
                </h4>
              </div>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who choose us for reliable, affordable car rentals.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg">
            Browse Cars Now
          </button>
        </div>
      </div>
    </section>
  );
}