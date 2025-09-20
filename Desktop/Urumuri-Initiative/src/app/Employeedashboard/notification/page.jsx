"use client";

const notifications = [
  {
    id: 1,
    title: "Salary for July 2025 processed",
    message: "Your salary for July has been processed and the receipt is available.",
    date: "Aug 1, 2025",
    type: "success",
  },
  {
    id: 2,
    title: "KYC Document Approved",
    message: "Your submitted identity document has been approved.",
    date: "Jul 25, 2025",
    type: "info",
  },
  {
    id: 3,
    title: "Payroll Information Missing",
    message: "Please complete your bank account details to receive your salary.",
    date: "Jul 10, 2025",
    type: "warning",
  },
];

function getTypeColor(type) {
  switch (type) {
    case "success":
      return "bg-green-100 text-green-700";
    case "info":
      return "bg-blue-100 text-blue-700";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "error":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function NotificationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-md shadow ${getTypeColor(note.type)}`}
          >
            <div className="font-semibold">{note.title}</div>
            <div className="text-sm">{note.message}</div>
            <div className="text-xs mt-1 opacity-70">{note.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
