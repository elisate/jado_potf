// src/components/organisation/LoanList.jsx
"use client";

import { useEffect, useState } from "react";

export default function LoanList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    // For now use dummy data — later fetch from backend
    const dummyLoans = [
      {
        id: 1,
        employeeName: "Alice Uwase",
        amount: 500000,
        reason: "Medical expenses",
        repaymentPeriod: 6,
        status: "Pending",
      },
      {
        id: 2,
        employeeName: "John Bizimana",
        amount: 300000,
        reason: "School fees",
        repaymentPeriod: 4,
        status: "Approved",
      },
    ];
    setLoans(dummyLoans);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Loan Requests</h2>
      {loans.length === 0 ? (
        <p>No loan requests found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Repayment (months)</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td className="p-2 border">{loan.employeeName}</td>
                <td className="p-2 border">RWF {loan.amount.toLocaleString()}</td>
                <td className="p-2 border">{loan.reason}</td>
                <td className="p-2 border">{loan.repaymentPeriod}</td>
                <td className="p-2 border">{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
