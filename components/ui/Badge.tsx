import React from "react";
import clsx from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "solid";
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "solid",
  className = "",
  children,
  ...props
}) => {
  return (
    <span
      className={clsx(
        "inline-block px-3 py-1 rounded-full text-xs font-semibold",
        variant === "outline"
          ? "border border-primary text-primary bg-transparent"
          : "bg-primary text-white",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge; 