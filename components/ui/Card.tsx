import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "glass" | "elevated";
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: FC<CardProps> = ({
  children,
  variant = "default",
  className = "",
  onClick,
  hover = true,
}) => {
  const baseClasses = "rounded-xl transition-all duration-300";
  
  const variantClasses = {
    default: "bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700",
    glass: "bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-lg",
    elevated: "bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700",
  };

  const hoverClasses = hover ? "hover:shadow-xl hover:-translate-y-1" : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickableClasses} ${className}`;

  const CardComponent = onClick ? motion.div : motion.div;

  return (
    <CardComponent
      className={classes}
      onClick={onClick}
      whileHover={hover && onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      {children}
    </CardComponent>
  );
};

export default Card; 