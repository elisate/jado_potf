// src/components/organisatin/Spinner.jsx
"use client";

const Spinner = () => (
  <div className="text-center my-6">
    <div className="animate-spin h-6 w-6 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
    <p className="mt-2 text-gray-600">Processing...</p>
  </div>
);

export default Spinner;
