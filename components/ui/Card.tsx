"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className = "", title }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-[var(--gray-300)] p-6 ${className}`}
    >
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-[var(--gray-900)]">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
