'use client';
export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow rounded-2xl p-4">
        <h3 className="text-gray-600">Total Employees</h3>
        <p className="text-2xl font-bold text-[#8B0000]">50</p>
      </div>
      <div className="bg-white shadow rounded-2xl p-4">
        <h3 className="text-gray-600">Salaries Paid (This Month)</h3>
        <p className="text-2xl font-bold text-[#8B0000]">45</p>
      </div>
      <div className="bg-white shadow rounded-2xl p-4">
        <h3 className="text-gray-600">Pending Contracts</h3>
        <p className="text-2xl font-bold text-[#8B0000]">3</p>
      </div>
    </div>
  );
}
