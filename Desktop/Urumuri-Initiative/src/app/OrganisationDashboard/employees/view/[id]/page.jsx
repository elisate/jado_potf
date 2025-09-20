'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ViewEmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://urumuri-backend.onrender.com/employee/getEmployee/${id}`);
        if (!response.ok) throw new Error('Failed to fetch employee');
        const data = await response.json();
        setEmployee(data.employee);
      } catch (err) {
        console.error(err);
        setError('Failed to load employee data');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="text-center p-8 text-red-600">
        {error || 'Employee not found'}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-sm space-y-6">
      <Link href="/OrganisationDashboard/employees" className="flex items-center text-red-800 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Employees
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">Employee Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Full Name" value={employee.name} />
        <Info label="Email" value={employee.email} />
        <Info label="Phone" value={employee.phone} />
        <Info label="Salary" value={formatCurrency(Number(employee.salary))} />
        <Info label="Bank" value={employee.bankType || 'N/A'} />
        <Info label="Status" value={capitalize(employee.employeeStatus)} />
        <Info label="Organization" value={employee.organization?.fullName || 'N/A'} />
        <Info label="Organization Code" value={employee.organization?.orgCode || 'N/A'} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  );
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("rw-RW", { style: "currency", currency: "RWF", minimumFractionDigits: 0 }).format(amount || 0);
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}
