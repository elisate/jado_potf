"use client";
import React from "react";

export function Badge({ children, className = "", variant = "default", ...props }) {
  const variantClasses = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
