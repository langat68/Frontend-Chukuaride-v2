
import { Quote, Star } from 'lucide-react';

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
];

const Testimonials = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-20" id="testimonials">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Real stories from real drivers who’ve enjoyed the Chukuaride experience.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow hover:shadow-md transition"
          >
            <Quote className="text-blue-500 h-6 w-6 mb-4" />
            <p className="text-gray-700 text-base mb-4">"{testimonial.quote}"</p>

            <div className="flex items-center gap-2 mb-2">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
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
