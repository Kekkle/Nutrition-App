import { motion } from "framer-motion";
import type { ReactNode, MouseEventHandler } from "react";

type ButtonVariant = "primary" | "secondary" | "success";
type ButtonSize = "sm" | "md" | "lg";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-md hover:bg-primary/90",
  secondary:
    "bg-surface-raised text-primary border-[3px] border-primary shadow-md hover:bg-primary-light/20",
  success: "bg-success text-white shadow-md hover:bg-success/90",
};

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-body font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50";

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim()}
    >
      {children}
    </motion.button>
  );
}
