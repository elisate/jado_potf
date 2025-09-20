'use client';
import { useState } from 'react';

export default function EmployeeTable({ employees }) {
  // Optionally, add local state to handle approving/rejecting if you want to show immediate UI change
  const [updating, setUpdating] = useState({}); // keep track of which employee is updating

  const handleApprove = async (id) => {
    setUpdating(prev => ({ ...prev, [id]: 'approving' }));
    try {
      const res = await fetch(`https://urumuri-backend.onrender.com/api/employees/${id}/approve`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to approve');
      // Ideally: refresh data by refetching from parent
      alert('Employee approved!');
    } catch (error) {
      console.error(error);
      alert('Failed to approve employee');
    } finally {
      setUpdating(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleReject = async (id) => {
    setUpdating(prev => ({ ...prev, [id]: 'rejecting' }));
    try {
      const res = await fetch(`https://urumuri-backend.onrender.com/api/employees/${id}/reject`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to reject');
      alert('Employee rejected!');
    } catch (error) {
      console.error(error);
      alert('Failed to reject employee');
    } finally {
      setUpdating(prev => ({ ...prev, [id]: null }));
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 overflow-x-auto">
      <table className="w-full text-left">
        <thead className="text-gray-800">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Department</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Start Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-2 text-center">No employees found.</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id || emp.id} className="border-t">
                <td className="p-2">{emp.name}</td>
                <td className="p-2">{emp.department}</td>
                <td className="p-2">{emp.email}</td>
                <td className="p-2">{emp.phone}</td>
                <td className="p-2">{emp.startDate ? new Date(emp.startDate).toLocaleDateString() : '-'}</td>
                <td className="p-2">{emp.status}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleApprove(emp._id || emp.id)}
                    disabled={updating[emp._id || emp.id]}
                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                  >
                    {updating[emp._id || emp.id] === 'approving' ? 'Approving...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleReject(emp._id || emp.id)}
                    disabled={updating[emp._id || emp.id]}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                  >
                    {updating[emp._id || emp.id] === 'rejecting' ? 'Rejecting...' : 'Reject'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
