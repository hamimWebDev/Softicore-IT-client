import { motion } from "framer-motion";
import { FC } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "dots" | "pulse";
  className?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = "md",
  variant = "default",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  if (variant === "dots") {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${sizeClasses[size]} bg-primary-600 rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <motion.div
        className={`${sizeClasses[size]} bg-primary-600 rounded-full ${className}`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }

  return (
    <div className={`${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-gray-300 border-t-primary-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingSpinner; 