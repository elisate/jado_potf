// src/components/organisation/LoanRequestForm.jsx
"use client";

import { useState } from "react";

export default function LoanRequestForm({ onSubmitLoan }) {
  const [formData, setFormData] = useState({
    employeeName: "",
    amount: "",
    reason: "",
    repaymentPeriod: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitLoan) onSubmitLoan(formData);
    setFormData({
      employeeName: "",
      amount: "",
      reason: "",
      repaymentPeriod: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Request a Loan</h2>
      <div className="mb-2">
        <label className="block">Employee Name</label>
        <input
          type="text"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block">Amount (RWF)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Repayment Period (months)</label>
        <input
          type="number"
          name="repaymentPeriod"
          value={formData.repaymentPeriod}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-200"
      >
        Submit Loan Request
      </button>
    </form>
  );
}
