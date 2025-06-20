import React, { useState } from 'react';
import {
  Car,
  Calendar,
  CreditCard,
  Key,
  ChevronRight,
  Play,
} from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [mobileActiveStep, setMobileActiveStep] = useState(0);

  const steps = [
    {
      icon: <Car />,
      title: 'Browse & Select',
      description: 'Choose from our diverse fleet of vehicles',
      details:
        'Filter cars by category, fuel type, and transmission. Get full specs, pricing, and real images.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: <Calendar />,
      title: 'Book Your Dates',
      description: 'Pick your rental period and get instant pricing',
      details:
        'Select pickup and return dates. Pricing updates automatically based on your selection.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      icon: <CreditCard />,
      title: 'Secure Payment',
      description: 'Pay safely with multiple payment options',
      details:
        'Use mobile money, card, or wallet. Get instant confirmation and digital receipts.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: <Key />,
      title: 'Pick Up & Drive',
      description: 'Collect your car and hit the road',
      details:
        'Arrive with your confirmation, complete inspection, grab the keys, and go.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  const nextStep = () => {
    setMobileActiveStep((prev) => (prev + 1) % steps.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Renting a car has never been easier. Just follow these steps.
          </p>
        </div>

        {/* Desktop Steps */}
        <div className="hidden lg:block mb-20">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 to-orange-200 transform -translate-y-1/2" />
            <div className="relative grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-center transition-transform cursor-pointer ${
                    activeStep === index ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                    {React.cloneElement(step.icon, { className: 'w-8 h-8' })}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mx-auto mb-2 text-sm font-bold text-gray-700">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  <div
                    className={`transition-all duration-500 text-sm text-gray-500 ${
                      activeStep === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    {step.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Interactive Steps */}
        <div className="lg:hidden mb-20">
          {/* Progress Bar */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === mobileActiveStep 
                      ? 'bg-blue-500 w-8' 
                      : index < mobileActiveStep 
                        ? 'bg-green-500 w-3' 
                        : 'bg-gray-300 w-3'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Current Step Card */}
          <div className={`${steps[mobileActiveStep].bgColor} rounded-2xl p-6 mb-6 transition-all duration-500 transform`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${steps[mobileActiveStep].color} flex items-center justify-center text-white mr-4`}>
                  {React.cloneElement(steps[mobileActiveStep].icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-bold text-gray-500 mr-2">STEP {mobileActiveStep + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{steps[mobileActiveStep].title}</h3>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-3 text-lg">{steps[mobileActiveStep].description}</p>
            <p className="text-gray-600 text-sm mb-6">{steps[mobileActiveStep].details}</p>
            
            {/* Action Button */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setMobileActiveStep(index)}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                      index === mobileActiveStep
                        ? `${steps[index].textColor} bg-white shadow-md`
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={nextStep}
                className={`flex items-center px-4 py-2 rounded-full bg-white ${steps[mobileActiveStep].textColor} font-semibold text-sm shadow-sm hover:shadow-md transition-all`}
              >
                {mobileActiveStep === steps.length - 1 ? (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Get Started
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mini Step Preview */}
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setMobileActiveStep(index)}
                className={`p-3 rounded-lg text-center transition-all ${
                  index === mobileActiveStep
                    ? `${step.bgColor} ${step.textColor} shadow-md`
                    : index < mobileActiveStep
                      ? 'bg-green-50 text-green-600'
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  index === mobileActiveStep
                    ? `bg-gradient-to-br ${step.color} text-white`
                    : index < mobileActiveStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {React.cloneElement(step.icon, { className: 'w-4 h-4' })}
                </div>
                <span className="text-xs font-medium">{step.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>



        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-3">Ready to Ride?</h3>
          <p className="text-blue-100 mb-5 max-w-xl mx-auto">
            Join thousands who trust us for smooth and secure rentals.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300">
            Browse Cars Now
          </button>
        </div>
      </div>
    </section>
  );
}