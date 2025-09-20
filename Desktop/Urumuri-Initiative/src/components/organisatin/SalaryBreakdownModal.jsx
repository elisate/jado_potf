// src/components/organisatin/SalaryBreakdownModal.jsx
"use client";

const SalaryBreakdownModal = ({ breakdown, onClose }) => {
  if (!breakdown) return null;

  const total =
    Number(breakdown.basicSalary) +
    Number(breakdown.bonus) -
    Number(breakdown.deductions);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h3 className="text-xl font-bold mb-2">Salary Breakdown</h3>
        <p><strong>Name:</strong> {breakdown.name}</p>
        <p><strong>Position:</strong> {breakdown.position}</p>
        <p><strong>Basic:</strong> RWF {breakdown.basicSalary}</p>
        <p><strong>Bonus:</strong> RWF {breakdown.bonus}</p>
        <p><strong>Deductions:</strong> RWF {breakdown.deductions}</p>
        <p><strong>Total:</strong> RWF {total}</p>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-1 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SalaryBreakdownModal;
