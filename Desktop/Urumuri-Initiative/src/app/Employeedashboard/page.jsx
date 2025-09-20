'use client';
import Card from "@/components/employee/Card";

export default function EmployeeDashboardHome() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Account Information">
        <p>Account Number: <strong>EMP123456</strong></p>
        <p>Account Type: <strong>Savings Account</strong></p>
        <p>Current Balance: <strong>$3,500.00</strong></p>
      </Card>
      <Card title="Personal Details">
        <p>Full Name: Alice Johnson</p>
        <p>Phone: +1234567890</p>
      </Card>
      <Card title="Payroll Info">
        <p>Net Salary: $2000 / month</p>
        <p>Status: Full-time</p>
      </Card>
    </div>
  );
}
