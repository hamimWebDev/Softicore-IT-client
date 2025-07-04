import Image from "next/image";
import { useState } from "react";
import FaqImage from "../Images/faq.jpg";

const faqs = [
  {
    question: "1. Think ahead & boost your business?",
    answer: "Our experts help you plan strategically to ensure your business is always ahead of the curve."
  },
  {
    question: "2. How our experts consulter work?",
    answer: "Our consultants work closely with you to understand your needs and deliver tailored solutions."
  },
  {
    question: "3. What is the best tips for growth your business?",
    answer: "Focus on innovation, customer satisfaction, and continuous improvement for sustainable growth."
  },
  {
    question: "4. How to improved your business?",
    answer: "Leverage our expertise to identify opportunities and implement effective strategies."
  },
  {
    question: "5. How to improved your business?",
    answer: "Regularly review your processes and adapt to market changes with our guidance."
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-10 lg:py-24 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom mx-auto flex flex-col lg:flex-row gap-16 items-center justify-between">
        {/* Left Side */}
        <div className="flex-1 max-w-xl">
          <div className="text-indigo-500 font-semibold mb-2 text-lg">Question & Answer</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            If You need Any Other <br /> Info Check Our FAQ,s
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Lorem ipsum dolor seat ameat dui too consecteture elite more occopassional works.A consulting agency are highly trying to them to their clients.
          </p>
          <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-md">
            <Image src={FaqImage} alt="FAQ" className="object-cover w-full h-64" />
          </div>
        </div>
        {/* Right Side: Accordion */}
        <div className="flex-1 w-full max-w-2xl space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-indigo-50 dark:bg-gray-800 rounded-xl shadow-sm">
              <button
                className="w-full flex justify-between items-center px-8 py-6 text-left text-lg font-semibold text-gray-900 dark:text-white focus:outline-none"
                onClick={() => handleToggle(idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{faq.question}</span>
                <span className="ml-4 text-2xl font-bold">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-8 pb-6 text-gray-700 dark:text-gray-300 text-base animate-fade-in">
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

export default FaqSection;

