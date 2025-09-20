'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PendingContractsList() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
   const handleReview=() => {
    router.push('/ApproveContractForm');
  }
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://urumuri-backend.onrender.com/organization/assignedOrganizations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrganizations(res.data.organizations || []);
      } catch (err) {
        console.error('Error fetching contracts:', err);
        alert('Failed to load organizations');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading contracts...</p>;

  if (!organizations.length) {
    return <p className="text-center text-gray-500 mt-10">No pending contracts to approve.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Contracts for Approval</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="bg-white shadow-md rounded-lg p-5 border hover:border-indigo-500 transition-all"
          >
            <h2 className="text-lg font-semibold text-indigo-600">{org.fullName}</h2>
            <p className="text-gray-600">Location: {org.location}</p>
            <p className="text-gray-600">Employees: {org.contract.numberOfEmployees}</p>
            <p className="text-gray-600">Total Salary: ${org.contract.totalSalary.toLocaleString()}</p>
            <div className="mt-3">
             <button
  onClick={() => {
    localStorage.setItem('pendingOrgId', org.id);
    handleReview();
  }}
  className="text-sm text-indigo-700 underline"
>
  Review & Approve Contract
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
