"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, Plus, Eye, Edit, MoreHorizontal,
  Users, UserPlus, UserCheck, UserX
} from "lucide-react";

export default function EmployeesPage() {

 
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const router = useRouter();


  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://urumuri-backend.onrender.com/employee/allEmployee", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployees(data.employees || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("rw-RW", { style: "currency", currency: "RWF", minimumFractionDigits: 0 })
      .format(amount || 0);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "on leave": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const viewEmployee = (id) => {
    router.push(`/OrganisationDashboard/employees/view/${id}`);
  };
  

  const editEmployee = (id) => {
    router.push(`/OrganisationDashboard/employees/edit/${id}`);
  };

  const deleteEmployee = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://urumuri-backend.onrender.com/employee/deleteEmployee/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert("Deleted successfully");
        setEmployees(prev => prev.filter(emp => emp.id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete employee");
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      emp?.name?.toLowerCase().includes(search) ||
      emp?.email?.toLowerCase().includes(search) ||
      emp?.phone?.toLowerCase().includes(search) ||
      emp?.organization?.fullName?.toLowerCase().includes(search);

    const matchesDept = filterDepartment === "all" || emp?.organization?.fullName === filterDepartment;
    const matchesStatus = filterStatus === "all" || emp?.employeeStatus?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesDept && matchesStatus;
  });

  const departments = [...new Set(employees.map(emp => emp.organization?.fullName).filter(Boolean))];
  const statuses = [...new Set(employees.map(emp => emp.employeeStatus).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600">Manage your workforce and employee information</p>
        </div>
        <Link href="/OrganisationDashboard/employees/add" className="flex items-center px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900">
          <Plus className="w-4 h-4 mr-2" /> Add Employee
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Users className="w-6 h-6 text-blue-600" />} bg="bg-blue-100" label="Total Employees" value={employees.length} />
        <StatCard icon={<UserCheck className="w-6 h-6 text-green-600" />} bg="bg-green-100" label="Active" value={employees.filter(e => e.employeeStatus?.toLowerCase() === "active").length} />
        <StatCard icon={<UserPlus className="w-6 h-6 text-yellow-600" />} bg="bg-yellow-100" label="On Leave" value={employees.filter(e => e.employeeStatus?.toLowerCase() === "on leave").length} />
        <StatCard icon={<UserX className="w-6 h-6 text-red-600" />} bg="bg-red-100" label="Inactive" value={employees.filter(e => e.employeeStatus?.toLowerCase() === "inactive").length} />
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 text-black rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search employees by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="flex gap-2">
            <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600">
              <option value="all">All Organizations</option>
              {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600">
              <option value="all">All Status</option>
              {statuses.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Employees ({filteredEmployees.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-black bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6">Employee</th>
                <th className="text-left py-3 px-6">Organization</th>
                <th className="text-left py-3 px-6">Bank</th>
                <th className="text-left py-3 px-6">Salary</th>
                <th className="text-left py-3 px-6">Status</th>
                <th className="text-left py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{emp.name}</div>
                    <div className="text-sm text-gray-500">{emp.email}</div>
                    <div className="text-sm text-gray-500">{emp.phone}</div>
                  </td>
                  <td className="py-4 text-black px-6">{emp.organization?.fullName || "N/A"}</td>
                  <td className="py-4 text-black px-6">{emp.bankType || "N/A"}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">{formatCurrency(Number(emp.salary))}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(emp.employeeStatus)}`}>
                      {emp.employeeStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                    <button onClick={() => viewEmployee(emp.id)} className="text-blue-600 hover:text-blue-800">
  <Eye className="w-4 h-4" />
</button>
                      <button onClick={() => editEmployee(emp.id)} className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteEmployee(emp.id)} className="text-gray-600 hover:text-gray-800">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, bg, label, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center">
        <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mr-4`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
