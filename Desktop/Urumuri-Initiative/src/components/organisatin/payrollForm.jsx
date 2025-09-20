// src/components/organisatin/PayrollForm.jsx
"use client";

import { useState } from "react";

const PayrollForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    basicSalary: "",
    bonus: "",
    deductions: "",
    paymentDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      position: "",
      department: "",
      basicSalary: "",
      bonus: "",
      deductions: "",
      paymentDate: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4">Process Payroll</h2>
      <div className="grid grid-cols-2 gap-4">
        {["name", "position", "department", "basicSalary", "bonus", "deductions", "paymentDate"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "paymentDate" ? "date" : "text"}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit Payroll"}
      </button>
    </form>
  );
};

export default PayrollForm;
