import Image from "next/image";
import { useState } from "react";
import FaqImage from "../Images/faq.jpg";

const faqs = [
  {
    question: "1. What services does Softicore IT provide?",
    answer: "We provide web development, mobile app development, software solutions, and IT consulting services to help your business grow."
  },
  {
    question: "2. How long does it take to complete a project?",
    answer: "Project time depends on size and complexity. Small websites take 2-4 weeks, while large applications may take 2-6 months. We always discuss timeline with you first."
  },
  {
    question: "3. Do you provide support after project completion?",
    answer: "Yes, we provide free support for 3 months after project completion. After that, we offer maintenance packages to keep your system running smoothly."
  },
  {
    question: "4. Can you work with my existing business system?",
    answer: "Yes, we can integrate our solutions with your current systems. We study your existing setup and make sure everything works together properly."
  },
  {
    question: "5. How much does a project cost?",
    answer: "Cost depends on your specific needs. We provide free consultation to understand your requirements and give you a clear price quote before starting work."
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
          <div className="text-indigo-500 font-semibold mb-2 text-lg">Frequently Asked Questions</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Got Questions? <br /> We Have Answers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Find answers to common questions about our IT services. If you don't see what you're looking for, feel free to contact us directly.
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

