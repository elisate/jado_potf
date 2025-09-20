"use client"
import { useState, useEffect } from "react"
import { Users, DollarSign, Clock, CheckCircle, Activity, Plus, Download, Eye, ArrowUp } from "lucide-react"

export default function OrganisationDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activePayrolls: 0,
    monthlyPayroll: 0,
    pendingPayments: 0,
    completedPayments: 0,
    totalTransactions: 0,
  })
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem("token")

        // Fetch dashboard statistics
        const statsResponse = await fetch(`https://urumuri-backend.onrender.com/dashboard-stats`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!statsResponse.ok) {
          throw new Error(`Failed to fetch dashboard stats: ${statsResponse.statusText}`)
        }
        const statsData = await statsResponse.json()
        setStats(statsData)

        // Fetch recent transactions
        const transactionsResponse = await fetch(`https://urumuri-backend.onrender.com/recent-transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!transactionsResponse.ok) {
          throw new Error(`Failed to fetch recent transactions: ${transactionsResponse.statusText}`)
        }
        const transactionsData = await transactionsResponse.json()
        setRecentTransactions(transactionsData)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("rw-RW", { style: "currency", currency: "RWF", minimumFractionDigits: 0 }).format(amount)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "processing": return "bg-blue-100 text-blue-800"
      case "failed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        <p>Error loading dashboard data: {error}</p>
        <p>Please ensure your backend is running and accessible at https://urumuri-backend.onrender.com.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your organization.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </button>
          <button className="flex items-center px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900">
            <Plus className="w-4 h-4 mr-2" /> Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalEmployees}</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Payroll</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.monthlyPayroll)}</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingPayments}</p>
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm text-yellow-600">Requires attention</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">91.5%</p>
              <div className="flex items-center mt-2">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">Excellent performance</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed Payments</span>
              <span className="text-sm font-semibold text-green-600">{stats.completedPayments}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: "91.5%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending Payments</span>
              <span className="text-sm font-semibold text-yellow-600">{stats.pendingPayments}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "8.5%" }}></div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Processed</span>
                <span className="font-semibold text-gray-900">{formatCurrency(stats.monthlyPayroll)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <div className="space-y-4">
            {[
              { name: "Farming", count: 45, percentage: 28.8, color: "bg-green-600" },
              { name: "Building", count: 38, percentage: 24.4, color: "bg-blue-600" },
              { name: "Security", count: 32, percentage: 20.5, color: "bg-red-600" },
              { name: "Transport", count: 25, percentage: 16.0, color: "bg-yellow-600" },
              { name: "Cleaning", count: 16, percentage: 10.3, color: "bg-purple-600" },
            ].map((dept) => (
              <div key={dept.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                  <span className="text-sm text-gray-700">{dept.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">{dept.count}</span>
                  <span className="text-xs text-gray-500">({dept.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-red-800 hover:text-red-900 font-medium">View All</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Employee</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Reference</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{transaction.employee}</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900">{formatCurrency(transaction.amount)}</td>
                  <td className="py-4 px-6 text-gray-600">{transaction.type}</td>
                  <td className="py-4 px-6 text-gray-600">{transaction.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-mono text-sm">{transaction.reference}</td>
                  <td className="py-4 px-6">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
