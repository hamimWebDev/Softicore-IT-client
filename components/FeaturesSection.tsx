import React from "react";

const features = [
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="text-indigo-500 dark:text-indigo-400">
        <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 38c0-5.523 5.373-10 12-10s12 4.477 12 10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: "Great Team",
    desc: "According to lorem ipsum dolor sit consecteture elite."
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="text-orange-400 dark:text-orange-300">
        <path d="M24 6l16 6v8c0 10.493-7.333 16.667-16 20-8.667-3.333-16-9.507-16-20V12l16-6z" stroke="currentColor" strokeWidth="2"/>
        <path d="M18 24l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Trusted Agency",
    desc: "According to lorem ipsum dolor sit consecteture elite."
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="text-cyan-400 dark:text-cyan-300">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2"/>
        <circle cx="19" cy="22" r="1.5" fill="currentColor"/>
        <circle cx="29" cy="22" r="1.5" fill="currentColor"/>
        <path d="M20 28c1.333 1 4.667 1 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <polygon points="34,14 36,18 40,18 37,21 38,25 34,22 30,25 31,21 28,18 32,18" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
    title: "Top Rated Agency",
    desc: "According to lorem ipsum dolor sit consecteture elite."
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="text-rose-400 dark:text-rose-300">
        <circle cx="24" cy="16" r="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 38c0-4.418 4.477-8 10-8s10 3.582 10 8" stroke="currentColor" strokeWidth="2"/>
        <g>
          <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2"/>
          <rect x="35" y="33" width="2" height="6" rx="1" fill="currentColor"/>
          <rect x="33" y="35" width="6" height="2" rx="1" fill="currentColor"/>
        </g>
      </svg>
    ),
    title: "Support Alltime",
    desc: "According to lorem ipsum dolor sit consecteture elite."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Left Side */}
        <div className="flex-1 max-w-xl">
          <div className="text-indigo-500 dark:text-indigo-400 font-semibold mb-2 text-lg">Agency Features</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Consulting firm focused <br /> clients happiness.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, seieiu elitesi tempor is exercitation ullamco laboris. Lorem ipsum dolor seat ameat dui too consecteture elite.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow transition-all dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-gray-900">
            Get Started &rarr;
          </button>
        </div>
        {/* Right Side */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
          {features.map((feature, idx) => (
            <div key={idx} className="card flex flex-col items-start gap-4 p-6">
              <div className="w-12 h-12">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
