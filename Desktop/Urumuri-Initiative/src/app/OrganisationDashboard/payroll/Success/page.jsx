"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-700">🎉 Payment Successful!</h1>
        <p className="mt-4 text-gray-700">Your payroll has been processed.</p>
        <Link
          href="/OrganisationDashboard/payroll"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Make Another Payment
        </Link>
      </div>
    </div>
  );
}
