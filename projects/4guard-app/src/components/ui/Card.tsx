import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "glass" | "primary" | "surface";
  noPadding?: boolean;
}

export default function Card({ 
  children, 
  variant = "default", 
  noPadding = false,
  className,
  ...props 
}: CardProps) {
  const variants = {
    default: "bg-white border-foreground/5 shadow-sm",
    glass: "liquid-glass border-white/20 shadow-xl",
    primary: "bg-primary-container text-white border-white/10",
    surface: "bg-surface-container border-foreground/5",
  };

  return (
    <div 
      className={cn(
        "rounded-xl border transition-all duration-200",
        variants[variant],
        !noPadding && "p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
