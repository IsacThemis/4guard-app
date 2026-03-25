import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  isLoading,
  className,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white hover:opacity-90 active:scale-[0.98] shadow-sm",
    secondary: "bg-primary-container text-white hover:opacity-90 active:scale-[0.98]",
    ghost: "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--surface-high)] active:bg-[var(--surface-container)]",
    danger: "bg-secondary text-white hover:opacity-90 active:scale-[0.98] shadow-sm",
    outline: "bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--surface-high)] active:bg-[var(--surface-container)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-semibold",
    md: "px-4 py-2 text-sm font-semibold",
    lg: "px-6 py-3 text-base font-bold",
    icon: "p-2",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer font-inter whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
}
