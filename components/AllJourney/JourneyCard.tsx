import Image from "next/image";
import { motion } from "framer-motion";
import JourneySvg from "../../Images/shape.svg";

const JourneyCard: React.FC<any> = ({
  type,
  logoUrl,
  position,
  duration,
  description,
  company,
  institution,
  qualification,
}) => {
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.1,
      },
    },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.2,
      },
    },
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="w-[80%] h-[300px] overflow-hidden flex items-center mx-auto sticky top-40"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <div className="w-full h-[270px] relative group ">
        {/* Background with gradient and shadow */}
        <div className="absolute inset-0 bg-[#111827] rounded-xl border border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex flex-col h-full">
          {/* Header Section */}
          <motion.div
            className="h-[80px] xl:h-[68px] bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm flex flex-col xl:flex-row justify-center xl:justify-between items-center px-6 md:px-[84px] rounded-t-xl border-b border-gray-600/30"
            variants={headerVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex gap-3 items-center">
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="relative"
              >
                <Image
                  src={JourneySvg}
                  width={18}
                  height={18}
                  alt=""
                  className="text-blue-400"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </motion.div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {type === "experience"
                  ? position
                  : type === "education"
                  ? qualification
                  : duration}
              </h3>
            </div>
            <motion.p
              className="text-sm font-medium text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-600/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {type !== "experience" && type !== "education" ? null : duration}
            </motion.p>
          </motion.div>
          {/* Content Section */}
          <motion.div
            className="flex-1 flex items-center justify-center xl:justify-start md:py-8 md:px-16"
            variants={contentVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-6 text-center xl:text-left xl:gap-12 px-4 xl:px-0">
              {/* Remove skill rendering logic, only show experience and education */}
             
               
                <motion.div
                  className="relative w-[300px] h-[30px] xl:h-[84px] group/logo"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <Image
                    src={logoUrl}
                    fill
                    alt=""
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-contain filter drop-shadow-lg group-hover/logo:drop-shadow-xl transition-all duration-300"
                  />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              {/* )} */}
              <div className="xl:border-l xl:border-gray-600/50 xl:pl-12 w-full relative">
                {/* Decorative line */}
                <div className="hidden xl:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-500/50 to-transparent"></div>
                <motion.h3
                  className="text-xl xl:text-2xl font-bold mb-3 xl:mb-4 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {type === "experience"
                    ? company
                    : type === "education"
                    ? institution
                    : null}
                </motion.h3>
                <motion.p
                  className="text-base text-gray-300 leading-relaxed max-w-[660px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  {description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default JourneyCard;
