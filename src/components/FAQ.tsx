import  { useState } from 'react';
import { ChevronDown, ChevronUp, Car, Clock, CreditCard, HelpCircle, MapPin, Shield } from 'lucide-react';

const FAQ = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (index: string) => {
    setOpenSection(openSection === index ? null : index);
  };

  const faqData = [
    {
      category: "Booking & Reservations",
      icon: <Car className="w-5 h-5" />,
      questions: [
        {
          question: "How do I book a car on ChukuaRide?",
          answer: "Simply browse our available cars, select your preferred vehicle, choose your pickup and return times, and complete the booking process. You'll receive a confirmation once your booking is submitted."
        },
        {
          question: "Can I modify or cancel my booking?",
          answer: "Yes, you can modify or cancel your booking through your account dashboard. Please note that cancellation policies may apply depending on how close to your pickup time you make changes."
        },
        {
          question: "What information do I need to provide when booking?",
          answer: "You'll need to provide your name, email address, phone number, and create an account. For confirmed rentals, you may need additional verification documents."
        },
        {
          question: "How far in advance can I book a car?",
          answer: "You can book a car up to several months in advance, subject to availability. We recommend booking early, especially during peak seasons or holidays."
        }
      ]
    },
    {
      category: "Pricing & Payments",
      icon: <CreditCard className="w-5 h-5" />,
      questions: [
        {
          question: "How is the rental cost calculated?",
          answer: "Our pricing is based on both hourly and daily rates. You can choose the option that best suits your needs. The total cost depends on your rental duration, car category, and any additional services."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including mobile money, credit/debit cards, and other digital payment options. Payment is processed securely through our trusted payment providers."
        },
        {
          question: "When do I need to pay for my rental?",
          answer: "Payment is typically required at the time of booking confirmation. For some rentals, a deposit may be required upfront with the balance due at pickup."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, we believe in transparent pricing. All costs including taxes and fees are clearly displayed during the booking process. Any additional charges (like fuel, damage, or late returns) will be communicated upfront."
        },
        {
          question: "Can I get a refund if I cancel?",
          answer: "Refund eligibility depends on our cancellation policy and timing. Refunds are processed through the same payment method used for booking, and refund amounts are calculated based on our terms and conditions."
        }
      ]
    },
    {
      category: "Vehicle Information",
      icon: <MapPin className="w-5 h-5" />,
      questions: [
        {
          question: "What types of cars are available?",
          answer: "We offer a diverse fleet including petrol, diesel, electric, and hybrid vehicles. Our cars come with both automatic and manual transmissions across various categories to suit different needs and budgets."
        },
        {
          question: "How do I know if a car is available?",
          answer: "All available cars are displayed on our platform with real-time availability. You can filter by location, transmission type, fuel type, and capacity to find the perfect match."
        },
        {
          question: "Where can I pick up and return the car?",
          answer: "Pickup and return locations are specified for each vehicle. We have multiple locations across different areas. The exact location will be provided in your booking confirmation."
        },
        {
          question: "What's included with my rental?",
          answer: "Each rental includes the vehicle for your specified duration. Details about what's included (insurance, fuel policy, mileage limits) are provided in the car description and booking terms."
        }
      ]
    },
    {
      category: "Rental Process",
      icon: <Clock className="w-5 h-5" />,
      questions: [
        {
          question: "What happens after I make a booking?",
          answer: "After booking, you'll receive a confirmation email. Your booking status will show as 'booked' until pickup time. We'll provide all necessary details including pickup location and contact information."
        },
        {
          question: "What do I need to bring for pickup?",
          answer: "Please bring a valid driver's license, the credit/debit card used for booking, and any identification documents. Specific requirements will be communicated when your booking is confirmed."
        },
        {
          question: "What if I'm late for pickup or return?",
          answer: "Please contact us immediately if you're running late. Late pickups may affect your rental duration, and late returns may incur additional charges based on our hourly rates."
        },
        {
          question: "Can I extend my rental period?",
          answer: "Yes, you can request to extend your rental if the vehicle is available. Extensions are subject to availability and will be charged according to our standard rates."
        }
      ]
    },
    {
      category: "Support & Safety",
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          question: "What if I have an emergency during my rental?",
          answer: "We provide 24/7 emergency support for all active rentals. Contact our emergency hotline immediately for accidents, breakdowns, or any urgent issues during your rental period."
        },
        {
          question: "How do I report an issue with my rental car?",
          answer: "You can report issues through our support system in your account, call our customer service, or use the emergency contact for urgent matters. We're here to help resolve any problems quickly."
        },
        {
          question: "What if the car is damaged or breaks down?",
          answer: "In case of damage or breakdown, stop driving immediately and contact our emergency support. We'll guide you through the next steps and arrange for assistance or replacement if needed."
        },
        {
          question: "How can I provide feedback about my experience?",
          answer: "We value your feedback! After your rental, you can rate your experience and leave comments through your account dashboard. Your feedback helps us improve our service."
        },
        {
          question: "How do I contact customer support?",
          answer: "You can reach our customer support through the support request system in your account, email us, or call our customer service line. We aim to respond to all inquiries promptly."
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about ChukuaRide car rental services. 
          Can't find what you're looking for? Contact our support team.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-6">
        {faqData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="text-blue-600 mr-3">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.category}</h2>
              </div>
            </div>

            {/* Questions */}
            <div className="divide-y divide-gray-200">
              {section.questions.map((item, questionIndex) => {
                const globalIndex = `${sectionIndex}-${questionIndex}`;
                const isOpen = openSection === globalIndex;

                return (
                  <div key={questionIndex} className="bg-white">
                    <button
                      onClick={() => toggleSection(globalIndex)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        <div className="flex-shrink-0 text-gray-400">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-4">
                        <div className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support CTA */}
      <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
        <p className="text-blue-100 mb-6 text-lg">
          Our customer support team is here to help you with any questions or concerns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
            Contact Support
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
            Call Us Now
          </button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Quick Tips</h4>
        <ul className="text-yellow-700 space-y-2">
          <li>• Book early for better availability and rates</li>
          <li>• Check your email for booking confirmations and important updates</li>
          <li>• Have your driver's license and payment card ready for pickup</li>
          <li>• Contact us immediately if you encounter any issues during your rental</li>
        </ul>
      </div>
    </div>
  );
};

export default FAQ;