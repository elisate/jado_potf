"use client";

const payrollData = [
  {
    id: 1,
    month: "July 2025",
    amount: "RWF 450,000",
    status: "Paid",
    dateProcessed: "August 1, 2025",
  },
  {
    id: 2,
    month: "June 2025",
    amount: "RWF 450,000",
    status: "Paid",
    dateProcessed: "July 1, 2025",
  },
  {
    id: 3,
    month: "May 2025",
    amount: "RWF 450,000",
    status: "Paid",
    dateProcessed: "June 1, 2025",
  },
];

export default function PayrollPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Payroll</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-2">Month</th>
              <th className="text-left px-4 py-2">Amount</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Processed Date</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{item.month}</td>
                <td className="px-4 py-3">{item.amount}</td>
                <td className="px-4 py-3 text-green-600 font-medium">{item.status}</td>
                <td className="px-4 py-3">{item.dateProcessed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
