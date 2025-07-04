import { motion } from "framer-motion";
import Image from "next/image";
import profileImage from "../Images/profile_image.jpg";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Text content */}
          <div>
            <motion.span
              className="inline-block mb-6 text-xl font-medium text-blue-500 dark:text-blue-300"
              variants={itemVariants}
            >
              Business Consulting Agency
            </motion.span>
            <motion.h1
              className="mb-4 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              We're Help Growing Your <br /> Business.
            </motion.h1>
            <motion.p
              className="mb-10 text-lg text-gray-600 dark:text-gray-300 max-w-xl"
              variants={itemVariants}
            >
              Lorem ipsum dolor consectetuer elite we're a creative digital your business growing up.
            </motion.p>
            <motion.div className="flex items-center gap-6" variants={itemVariants}>
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg dark:bg-blue-500 dark:hover:bg-blue-600">
                Explore More →
              </a>
              <a href="#" className="flex items-center gap-3 group">
                <span className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-blue-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 dark:border-blue-400 transition-all bg-white dark:bg-gray-900">
                  <svg className="w-7 h-7 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <polygon points="7,5 15,10 7,15" />
                  </svg>
                </span>
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">How we work</span>
              </a>
            </motion.div>
          </div>

          {/* Right: Hero image and decorations */}
          <motion.div className="relative h-[400px] lg:h-[500px] flex items-center justify-center" variants={itemVariants}>
            {/* Decorative dots */}
            <svg className="absolute -top-8 -left-8 w-24 h-24 text-blue-300 dark:text-blue-900 opacity-70" width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              {Array.from({ length: 5 }).map((_, row) => (
                Array.from({ length: 5 }).map((_, col) => (
                  <circle key={`${row}-${col}`} cx={col * 20 + 4} cy={row * 20 + 4} r="3" fill="currentColor" />
                ))
              ))}
            </svg>
            <div className="relative h-full w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src={profileImage}
                alt="Business consulting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent dark:from-gray-900/40 dark:to-transparent mix-blend-multiply rounded-lg"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
