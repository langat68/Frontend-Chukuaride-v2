import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-sky-500 text-white py-16 px-6 md:px-20 text-center rounded-3xl shadow-xl my-16 mx-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to hit the road?
      </h2>
      <p className="text-lg md:text-xl mb-8">
        Book your dream ride in just a few clicks. It's fast, easy, and reliable.
      </p>
      <a
        href="/fleet"
        className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-base md:text-lg px-6 py-3 rounded-full hover:bg-gray-100 transition"
      >
        Browse Fleet <ArrowRight className="h-5 w-5 mt-[2px]" />
      </a>
    </section>
  );
};

export default CallToAction;
