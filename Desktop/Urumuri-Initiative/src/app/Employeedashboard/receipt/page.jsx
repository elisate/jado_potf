"use client";

const receiptData = [
  {
    id: 1,
    month: "July 2025",
    receiptUrl: "/receipts/july-2025.pdf",
    dateIssued: "Aug 1, 2025",
  },
  {
    id: 2,
    month: "June 2025",
    receiptUrl: "/receipts/june-2025.pdf",
    dateIssued: "Jul 1, 2025",
  },
  {
    id: 3,
    month: "May 2025",
    receiptUrl: "/receipts/may-2025.pdf",
    dateIssued: "Jun 1, 2025",
  },
];

export default function ReceiptPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Salary Receipts</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-2">Month</th>
              <th className="text-left px-4 py-2">Date Issued</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {receiptData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{item.month}</td>
                <td className="px-4 py-3">{item.dateIssued}</td>
                <td className="px-4 py-3">
                  <a
                    href={item.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                  <span className="mx-2">|</span>
                  <a
                    href={item.receiptUrl}
                    download
                    className="text-green-600 hover:underline"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
