"use client";

import React, { useState } from "react";

export default function JobApplyPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, position: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Submitted Data:", formData);
    alert("Application Submitted Successfully!");
    setIsSubmitting(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      resume: null,
    });
  };

  return (
    <div className="min-h-screen  mt-20 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
        <h2 className="text-2xl font-bold text-center text-black mb-6">JobSeeker form </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-blue-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-blue-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-blue-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Applying For</label>
            <select
              id="position"
              value={formData.position}
              onChange={handleSelectChange}
              required
              className="w-full border border-blue-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="">Select a position</option>
              <option value="software-engineer">Builders</option>
              <option value="hr-manager">HR Manager</option>
              <option value="sales-associate">Sales Associate</option>
              <option value="marketing-specialist">Marketing Specialist</option>
            </select>
          </div>
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
            <input
              id="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border border-blue-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF, DOCX)</label>
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border border-blue-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
            {formData.resume && <p className="text-xs text-gray-500 mt-1">Selected file: {formData.resume.name}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
