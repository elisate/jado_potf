// src/components/organisatin/SuccessModal.jsx
"use client";

const SuccessModal = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-green-600 text-lg font-bold">Payroll Processed Successfully!</h2>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-1 rounded">
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
