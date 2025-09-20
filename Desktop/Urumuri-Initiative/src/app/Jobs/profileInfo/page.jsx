"use client";
import React from "react";

export default function ProfileFormModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            &#x2715;
          </button>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Complete Your Profile
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="fullname">
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="skills">
                Skills / Experience
              </label>
              <textarea
                id="skills"
                placeholder="Briefly describe your skills or work experience"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
