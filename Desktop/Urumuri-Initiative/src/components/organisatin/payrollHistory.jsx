// src/components/organisatin/PayrollHistory.jsx
"use client";

import { useState } from "react";
import {generatePayslipPDF} from "@/utils/generatePayslipPDF";
import { exportCSV } from "@/utils/csvExporter";

const PayrollHistory = ({ history, onShowBreakdown }) => {
  return (
    <div className="mt-10 px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">Payroll History</h2>
        <button
          onClick={() => exportCSV(history)}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td>{item.position}</td>
                <td>RWF {Number(item.basicSalary) + Number(item.bonus) - Number(item.deductions)}</td>
                <td>{item.paymentDate}</td>
                <td>
                <button
  onClick={() => generatePayslipPDF(item)}
  className="text-blue-600 underline mr-3"
>
  Download PDF
</button>
                  <button
                    onClick={() => onShowBreakdown(item)}
                    className="text-indigo-600 underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollHistory;
