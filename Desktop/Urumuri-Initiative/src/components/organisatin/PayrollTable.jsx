// src/components/PayrollTable.jsx
import { generatePayslip } from "@/utils/generatePayslip";

const PayrollTable = ({ payrollList }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Processed Payroll</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Net Pay</th>
            <th className="border p-2">Month</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrollList.map((emp) => (
            <tr key={emp.employeeId}>
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">RWF {emp.net}</td>
              <td className="border p-2">{emp.month}</td>
              <td className="border p-2">
                <button
                  onClick={() => generatePayslip(emp)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Download Payslip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
