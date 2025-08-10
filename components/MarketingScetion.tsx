import Image from "next/image";
import MarketingImage from "../Images/Marketing.png";

const features = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="text-indigo-500">
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
        <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "24/7 Expert Support Team",
    color: "text-indigo-500",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="text-orange-400">
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
        <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Modern Web & Mobile Solutions",
    color: "text-orange-400",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="text-cyan-400">
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
        <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Fast & Reliable IT Services",
    color: "text-cyan-400",
  },
];

const MarketingScetion = () => {
  return (
    <section className="py-0 lg:py-24 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Left: Image with abstract shapes */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Abstract background shapes */}
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-60 -z-10" />
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply opacity-50 -z-10" />
          <div className="relative w-[400px] h-[460px] md:w-[480px] md:h-[540px] rounded-[40%] overflow-hidden shadow-xl">
            <Image
              src={MarketingImage}
              alt="Softicore IT Services"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="rounded-[40%]"
              priority
            />
          </div>
        </div>
        {/* Right: Content */}
        <div className="flex-1 max-w-xl">
          <div className="text-indigo-500 font-semibold mb-2 text-lg">Why Choose Softicore IT</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Your Trusted Partner for <br /> Digital Success
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            We help businesses grow with modern technology solutions. Our team creates websites, mobile apps, and software that work perfectly for your business needs. We make technology simple and effective.
          </p>
          <ul className="space-y-5 mb-10">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-4">
                <span className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 ${feature.color}`}>
                  {feature.icon}
                </span>
                <span className="text-lg text-gray-800 dark:text-gray-200 font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-10 py-4 rounded-lg text-lg shadow transition-all">
            Start Your Project &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketingScetion;