"use client";
import React, { useState } from "react";

export default function SignupOrgForm() {
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    phoneNumber: "",
    location: "",
    rdbCertificate: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "rdbCertificate") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-2">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 space-y-8">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-blue-100 rounded-full p-3 mb-2">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-1">Organization Signup</h2>
          <p className="text-gray-500 text-center text-sm">Register your organization to start managing your operations with URUMURI.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
            <input
              type="text"
              name="organizationName"
              placeholder="Enter organization name"
              value={formData.organizationName}
              onChange={handleChange}
              required
              className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Organization email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location of organization"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload RDB Certificate (PDF, DOC, PNG, JPG)</label>
            <input
              type="file"
              name="rdbCertificate"
              onChange={handleChange}
              accept=".pdf,.doc,.docx,.png,.jpg"
              required
              className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
