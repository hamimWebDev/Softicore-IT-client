import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  icon,
  iconPosition = "left",
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500",
    ghost: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-md",
    lg: "px-8 py-4 text-lg rounded-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {!loading && icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {!loading && icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </>
  );

  return (
    <motion.button
      whileHover={{ scale: loading || disabled ? 1 : 1.02 }}
      whileTap={{ scale: loading || disabled ? 1 : 0.98 }}
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      {content}
    </motion.button>
  );
};

export default Button; 