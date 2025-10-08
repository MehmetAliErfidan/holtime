"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-turquoise)] focus:border-transparent transition-colors ${
          error
            ? "border-[var(--accent-red)] focus:ring-[var(--accent-red)]"
            : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-[var(--accent-red)]">{error}</p>
      )}
    </div>
  );
}
