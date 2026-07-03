import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  full?: boolean;
  type?: "button" | "submit";
}

const VARIANTS = {
  primary:
    "bg-gradient-to-r from-tangerine to-coral text-white shadow-pop hover:brightness-105",
  secondary:
    "bg-white text-deepsea border-2 border-deepsea/10 shadow-card hover:border-lagoon/40",
  ghost: "bg-transparent text-deepsea/60 hover:text-deepsea",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  full = false,
  type = "button",
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.96, y: 2 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      className={`
        ${VARIANTS[variant]}
        ${full ? "w-full" : ""}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        font-display font-bold text-lg rounded-2xl px-6 py-3.5
        transition-colors select-none
      `}
    >
      {children}
    </motion.button>
  );
}
