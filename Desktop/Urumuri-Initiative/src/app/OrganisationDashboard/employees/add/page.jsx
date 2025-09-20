"use client";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function EmployeeForm() {
  const { toast } = useToast();
  const router = useRouter();   // ✅ Add router
  const [formData, setFormData] = useState({

    orgCode: '',
    name: '',
    phone: '',
    email: '',
    salary: '',
    employeeStatus: '',
    bankType: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://urumuri-backend.onrender.com/employee/addEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Information received!",
          description: "Thanks for filling your information. Wait for approval from your manager.",
        });
        setFormData({
          orgCode: '',
          name: '',
          phone: '',
          email: '',
          salary: '',
          employeeStatus: '',
          bankType: '',
        });
        // ✅ Redirect after success
        router.push('/OrganisationDashboard/employees');
      } else {
        alert(data.message || 'Failed to add employee');
      }
    } catch (error) {
      console.error('Error submitting employee:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Employee Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Organization Code *</label>
          <input
            type="text"
            name="orgCode"
            placeholder="e.g., ORG-XXXXXXX"
            value={formData.orgCode}
            onChange={handleChange}
            className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:ring-2 focus:ring-red-600"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone Number *</label>
            <input
              type="text"
              name="phone"
              placeholder="+1234567890"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Salary *</label>
            <input
              type="text"
              name="salary"
              placeholder="e.g., 400000"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Employee Status *</label>
            <select
              name="employeeStatus"
              value={formData.employeeStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:ring-2 focus:ring-red-600"
              required
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Bank Type *</label>
            <select
              name="bankType"
              value={formData.bankType}
              onChange={handleChange}
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:ring-2 focus:ring-red-600"
              required
            >
              <option value="">Select bank</option>
              <option value="bk">BK</option>
              <option value="equity">Equity</option>
              <option value="access">Access</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          {/* ✅ Cancel button */}
          <button
            type="button"
            onClick={() => router.push('/OrganisationDashboard/employees')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-red-800 text-white px-6 py-2 rounded hover:bg-red-900 transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
