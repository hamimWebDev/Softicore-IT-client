import TypeWriter from "@/hooks/TypeWriter/TypeWriter";
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
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text content */}
          <div>
            <motion.span
              className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium mb-6"
              variants={itemVariants}
            >
              Full Stack Developer
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 pb-8"
            >
              <h3 className="text-3xl sm:text-4xl font-light text-blue-400">
                Hello, I'm
              </h3>
              <h1 className="text-5xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Md. Hamim Howlader Asif
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-semibold text-blue-400"
            >
              <TypeWriter />
            </motion.div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg"
              variants={itemVariants}
            >
              I'm a MERN stack developer passionate about creating interactive
              applications and experiences on the web.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                href="/Hamim_s_Resume-1.pdf"
                download="Hamim_Resume.pdf"
                className="inline-block mt-2 lg:mt-5"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative p-[2px] lg:p-4  text-lg font-semibold text-white rounded-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                  <span className="relative flex items-center gap-2">
                    <span>Download Resume</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </span>
                </motion.button>
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                href="/Md. Hamim _ Cv_.pdf"
                download="Md. Hamim _ Cv_.pdf"
                className="inline-block mt-2 lg:mt-5"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative p-[2px] lg:p-4  text-lg font-semibold text-white rounded-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-pink-500 to-purple-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                  <span className="relative flex items-center gap-2">
                    <span>Download Cv</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </span>
                </motion.button>
              </motion.a>
              
            </motion.div>
          </div>

          {/* Hero image or illustration */}
          <motion.div
            className="relative h-[400px] lg:h-[500px]"
            variants={itemVariants}
          >
            <div className="relative h-full w-full rounded-lg overflow-hidden">
              <Image
                src={profileImage}
                alt="Developer working on code"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent mix-blend-multiply rounded-lg"></div>
            </div>

            {/* Animated decorations */}
            <motion.div
              className="absolute -top-8 -right-8 w-64 h-64 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-16 -left-16 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
