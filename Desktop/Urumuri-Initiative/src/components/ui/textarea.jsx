"use client";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 ${className}`}
      {...props}
    />
  );
}
