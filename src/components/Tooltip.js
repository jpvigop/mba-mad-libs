"use client";

import React from 'react';

/**
 * Reusable tooltip component
 */
export function Tooltip({ children, position = "bottom" }) {
  return (
    <div className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-sm tooltip">
      {children}
      <div
        className={`absolute w-2 h-2 bg-gray-800 transform ${
          position === "top" ? "top-full left-1/2 -translate-x-1/2 -mt-1 rotate-45" :
          position === "bottom" ? "bottom-full left-1/2 -translate-x-1/2 -mb-1 rotate-45" :
          position === "left" ? "left-full top-1/2 -translate-y-1/2 -ml-1 rotate-45" :
          "right-full top-1/2 -translate-y-1/2 -mr-1 rotate-45"
        }`}
      />
    </div>
  );
}
