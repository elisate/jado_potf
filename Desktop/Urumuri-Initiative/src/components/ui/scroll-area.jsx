"use client";
import React from "react";

export function ScrollArea({ children, className = "", ...props }) {
  return (
    <div
      className={`overflow-auto max-h-[400px] rounded ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
