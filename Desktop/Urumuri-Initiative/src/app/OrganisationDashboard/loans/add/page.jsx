"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Calculator } from "lucide-react"
import Link from "next/link"

export default function AddLoanPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null) // For success/error messages
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    employeeId: "",
    loanAmount: "",
    interestRate: "",
    loanTerm: "", // in months
    startDate: "",
    purpose: "",
    guarantor: "",
    guarantorContact: "",
    notes: "",
  })
  const [calculatedPayment, setCalculatedPayment] = useState(0)


  useEffect(() => {
    // Fetch employees for dropdown with token auth
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token")

        const response = await fetch("https://urumuri-backend.onrender.com/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch employees for dropdown: ${response.statusText}`)
        }
        const data = await response.json()
        setEmployees(data)
      } catch (err) {
        console.error("Error fetching employees:", err)
        setMessage(`❌ Failed to load employees: ${err.message}`)
      }
    }

    fetchEmployees()
  }, [])

  useEffect(() => {
    // Calculate monthly payment when loan details change
    if (formData.loanAmount && formData.interestRate && formData.loanTerm) {
      const principal = Number.parseFloat(formData.loanAmount)
      const monthlyRate = Number.parseFloat(formData.interestRate) / 100 / 12
      const numPayments = Number.parseInt(formData.loanTerm)

      if (monthlyRate > 0) {
        const monthlyPayment =
          (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
        setCalculatedPayment(monthlyPayment)
      } else {
        setCalculatedPayment(principal / numPayments)
      }
    } else {
      setCalculatedPayment(0) // Reset if inputs are incomplete
    }
  }, [formData.loanAmount, formData.interestRate, formData.loanTerm])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null) // Clear previous messages

    try {
      const token = localStorage.getItem("token")

      const loanData = {
        ...formData,
        loanAmount: Number.parseFloat(formData.loanAmount),
        interestRate: Number.parseFloat(formData.interestRate),
        loanTerm: Number.parseInt(formData.loanTerm),
        monthlyPayment: calculatedPayment,
        // Backend should handle generating loanId, status, remainingBalance, totalPaid
      }

      const res = await fetch("https://urumuri-backend.onrender.com/loans/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(loanData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to submit loan")
      }

      setMessage("✅ Loan submitted successfully!")
      router.push("/OrganisationDashboard/loans")
    } catch (error) {
      console.error("Error submitting loan:", error)
      setMessage(`❌ Failed to submit loan: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("rw-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/OrganisationDashboard/loans" className="flex items-center text-gray-600 hover:text-red-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Loans
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Loan</h1>
        <p className="text-gray-600">Create a new loan for an employee with repayment terms</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${message.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Loan Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Loan Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.department}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (RWF) *</label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleInputChange}
                required
                min="0"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% per year) *</label>
              <input
                type="number"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleInputChange}
                required
                min="0"
                max="100"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (months) *</label>
              <input
                type="number"
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleInputChange}
                required
                min="1"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="">Select Purpose</option>
                <option value="Emergency">Emergency</option>
                <option value="Education">Education</option>
                <option value="Medical">Medical</option>
                <option value="Housing">Housing</option>
                <option value="Business">Business</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Calculation */}
        {calculatedPayment > 0 && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center mb-4">
              <Calculator className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-blue-900">Payment Calculation</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">{formatCurrency(calculatedPayment)}</div>
                <div className="text-sm text-blue-700">Monthly Payment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">
                  {formatCurrency(calculatedPayment * Number.parseInt(formData.loanTerm || 0))}
                </div>
                <div className="text-sm text-blue-700">Total Amount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">
                  {formatCurrency(
                    calculatedPayment * Number.parseInt(formData.loanTerm || 0) -
                      Number.parseFloat(formData.loanAmount || 0),
                  )}
                </div>
                <div className="text-sm text-blue-700">Total Interest</div>
              </div>
            </div>
          </div>
        )}

        {/* Guarantor Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Guarantor Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guarantor Name</label>
              <input
                type="text"
                name="guarantor"
                value={formData.guarantor}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guarantor Contact</label>
              <input
                type="text"
                name="guarantorContact"
                value={formData.guarantorContact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="Any additional notes or terms for this loan..."
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            href="/OrganisationDashboard/loans"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Loan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
