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
    primary: "bg-primary text-white hover:bg-[#000555] active:scale-[0.98] shadow-sm",
    secondary: "bg-primary-container text-white hover:bg-[#151d6d] active:scale-[0.98]",
    ghost: "bg-transparent text-foreground/70 hover:bg-foreground/5 active:bg-foreground/10",
    danger: "bg-secondary text-white hover:bg-[#a00110] active:scale-[0.98] shadow-sm",
    outline: "bg-transparent border border-foreground/15 text-foreground/70 hover:bg-foreground/5 active:bg-foreground/10",
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
