"use client";
import Sidebar from "@/components/employee/Sidebar";
import Topbar from "@/components/employee/Topbar";
import "../../app/globals.css";

export default function EmployeeDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}
