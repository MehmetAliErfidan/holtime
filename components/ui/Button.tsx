"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "cta" | "danger";
  size?: "sm" | "md" | "lg"; // ← EKLE
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-[var(--primary-turquoise)] text-white hover:bg-[var(--primary-dark)] focus:ring-[var(--primary-turquoise)]",
    secondary:
      "bg-white text-[var(--primary-turquoise)] border-2 border-[var(--primary-turquoise)] hover:bg-[var(--primary-pale)] focus:ring-[var(--primary-turquoise)]",
    cta: "bg-[var(--accent-coral)] text-white font-bold hover:bg-[#F97316] hover:shadow-lg focus:ring-[var(--accent-coral)]",
    danger:
      "bg-[var(--accent-red)] text-white hover:bg-[#DC2626] focus:ring-[var(--accent-red)]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Memproses...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
