"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function JobApplyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobTitle = searchParams.get("jobTitle") || "Selected Job"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    jobTitle: jobTitle,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setFormData((prev) => ({ ...prev, jobTitle: jobTitle }))
  }, [jobTitle])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setIsSuccess(false)

    // In a real application, you would send formData to your backend API
    // For example, using FormData for file uploads:
    // const data = new FormData();
    // for (const key in formData) {
    //   data.append(key, formData[key]);
    // }
    // const res = await fetch('/api/apply-job', { method: 'POST', body: data });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Simulate success
      setIsSuccess(true)
      setMessage("Application submitted successfully! We will get back to you soon.")
      // Optionally redirect after a delay
      setTimeout(() => router.push("/Jobs"), 3000)
    } catch (error) {
      setIsSuccess(false)
      setMessage("Failed to submit application. Please try again.")
      console.error("Job application error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="py-20 px-6 md:px-20 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-[#8B0000] mb-8 text-center">Apply for {jobTitle}</h1>
      <Card className="p-8 bg-white shadow-lg rounded-lg">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold text-red-900">Your Application</CardTitle>
          <CardDescription className="text-gray-600">
            Please fill out the form below to apply for this position.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {message && (
            <div
              className={`mb-4 p-3 rounded-md text-center ${
                isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Full Name
              </Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email Address
              </Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="phone" className="mb-2 block">
                Phone Number
              </Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="resume" className="mb-2 block">
                Upload Resume (PDF, DOCX)
              </Label>
              <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="coverLetter" className="mb-2 block">
                Cover Letter (Optional)
              </Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                rows={5}
                value={formData.coverLetter}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-900 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
