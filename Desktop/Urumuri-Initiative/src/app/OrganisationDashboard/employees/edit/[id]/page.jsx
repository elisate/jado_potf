"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditEmployeePage() {
  const { id } = useParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    salary: '',
    employeeStatus: '',
    bankType: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`https://urumuri-backend.onrender.com/employee/getEmployee/${id}`)
        if (!res.ok) throw new Error("Failed to fetch employee")
        const data = await res.json()
        setFormData({
          name: data.employee?.name || '',
          phone: data.employee?.phone || '',
          email: data.employee?.email || '',
          salary: data.employee?.salary || '',
          employeeStatus: data.employee?.employeeStatus || '',
          bankType: data.employee?.bankType || ''
        })
      } catch (err) {
        console.error("Error:", err)
        setError("Could not load employee")
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchEmployee()
  }, [id])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`https://urumuri-backend.onrender.com/employee/updateEmployee/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.ok) {
        alert("Employee updated successfully!")
        router.push("/OrganisationDashboard/employees")
      } else {
        setError(data.message || "Failed to update")
      }
    } catch (err) {
      console.error("Update error:", err)
      setError("Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
    </div>
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>
  }

  return (
    <div className="max-w-2xl  text-black mx-auto mt-10 bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#8B0000]">Edit Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
          className="w-full border p-2 rounded" required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange}
          className="w-full border p-2 rounded" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
          className="w-full border p-2 rounded" required />
        <input type="text" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange}
          className="w-full border p-2 rounded" required />

        <select name="employeeStatus" value={formData.employeeStatus} onChange={handleChange}
          className="w-full border p-2 rounded" required>
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="terminated">Terminated</option>
        </select>

        <select name="bankType" value={formData.bankType} onChange={handleChange}
          className="w-full text-black border p-2 rounded" required>
          <option value="">Select Bank</option>
          <option value="bk">BK</option>
          <option value="equity">EQUITY</option>
          <option value="access">ACCESS</option>
          <option value="other">Other</option>
        </select>

        <div className="flex justify-between mt-4">
          <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          <button type="submit" disabled={saving} className="bg-red-800 text-white px-4 py-2 rounded">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  )
}
