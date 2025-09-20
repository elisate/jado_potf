"use client";

export default function AccountInfoPage() {
  const employee = {
    name: "Victoria Dufatanye",
    nationalId: "1234567890123456",
    phone: "+250 788 123 456",
    email: "victoria@example.com",
    position: "Software Engineer",
    department: "IT",
    startDate: "2023-01-15",
    bankName: "Bank of Kigali",
    accountNumber: "1234567890",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Account Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-medium mb-3">Personal Information</h2>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>National ID:</strong> {employee.nationalId}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <p><strong>Email:</strong> {employee.email}</p>
        </div>

        {/* Employment Info */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-medium mb-3">Employment Details</h2>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Start Date:</strong> {employee.startDate}</p>
        </div>

        {/* Bank Info */}
        <div className="bg-white rounded-xl shadow p-4 md:col-span-2">
          <h2 className="text-lg font-medium mb-3">Bank Details</h2>
          <p><strong>Bank Name:</strong> {employee.bankName}</p>
          <p><strong>Account Number:</strong> {employee.accountNumber}</p>
        </div>
      </div>
    </div>
  );
}
