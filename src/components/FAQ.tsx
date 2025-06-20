import  { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What documents do I need to rent a car?',
    answer: 'You need a valid driver’s license, national ID or passport, and a credit card for the deposit.',
  },
  {
    question: 'Is there a mileage limit?',
    answer: 'Most rentals come with unlimited mileage. However, check individual car terms before booking.',
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer: 'Yes, you can cancel or modify up to 24 hours before the rental starts, free of charge.',
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees. All costs are transparently listed before you confirm your booking.',
  },
  {
    question: 'What happens in case of a breakdown?',
    answer: 'We offer 24/7 roadside assistance. Just call the support number provided in your booking email.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-4 md:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm transition duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left text-lg font-medium text-gray-800 hover:bg-gray-50 focus:outline-none"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-blue-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
