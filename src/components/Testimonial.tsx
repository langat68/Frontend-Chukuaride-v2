import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'; // Added ChevronLeft and ChevronRight
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'James Mwangi',
    role: 'Business Executive',
    quote:
      'Chukuaride made my last-minute business trip so seamless. The car was spotless and the service was excellent!',
    rating: 5,
  },
  {
    name: 'Aisha Otieno',
    role: 'Frequent Traveler',
    quote:
      'I always book with Chukuaride when visiting family. Great prices and super reliable.',
    rating: 4,
  },
  {
    name: 'Kevin Wanjohi',
    role: 'Student',
    quote:
      'Affordable and easy to book. The app is smooth and I loved the whole experience!',
    rating: 4,
  },
  {
    name: 'Grace Nyambura',
    role: 'Tour Guide',
    quote:
      'Perfect for my clients who need reliable transportation. Always professional and on time.',
    rating: 5,
  },
  {
    name: 'David Kimani',
    role: 'Entrepreneur',
    quote:
      'The booking process is incredibly smooth. I can focus on my business while they handle transportation.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-swipe functionality for mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isMobile]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-white py-20 px-6 md:px-20" id="testimonials">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Real stories from real drivers who've enjoyed the Chukuaride experience.
        </p>
      </div>

      {/* Mobile Carousel View */}
      <div className="md:hidden relative max-w-sm mx-auto">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 bg-gray-50 border border-gray-200 p-6 shadow hover:shadow-md transition"
              >
                <Quote className="text-blue-500 h-6 w-6 mb-4" />
                <p className="text-gray-700 text-base mb-4">"{testimonial.quote}"</p>

                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i: number) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                <div className="text-sm text-gray-800 font-semibold">{testimonial.name}</div>
                <div className="text-xs text-gray-500">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-blue-500 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows (Uncommented for full functionality) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Pause/Play Button (Optional) */}
        <div className="text-center mt-4">
          <button
            onClick={() => setCurrentSlide(currentSlide)} // This resets the auto-advance timer
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Tap dots to pause auto-advance
          </button>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow hover:shadow-md transition"
          >
            <Quote className="text-blue-500 h-6 w-6 mb-4" />
            <p className="text-gray-700 text-base mb-4">"{testimonial.quote}"</p>

            <div className="flex items-center gap-2 mb-2">
              {Array.from({ length: testimonial.rating }).map((_, i: number) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              ))}
            </div>

            <div className="text-sm text-gray-800 font-semibold">{testimonial.name}</div>
            <div className="text-xs text-gray-500">{testimonial.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;