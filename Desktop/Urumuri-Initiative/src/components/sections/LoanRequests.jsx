"use client";

export default function LoanRequests() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Loan Requests</h2>
      <div className="grid gap-4">
        {mockLoanRequests.map(request => (
          <div key={request.id} className="border-b border-gray-200 py-2">
            <p className="text-base font-medium text-gray-900">{request.organization}</p>
            <p className="text-sm text-gray-600">Amount: {request.amount}</p>
            <p className="text-sm text-gray-600">Date: {request.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}