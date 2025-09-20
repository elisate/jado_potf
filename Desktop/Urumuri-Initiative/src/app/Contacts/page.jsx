"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSubmitted(false)

    try {
      // Replace with your actual backend API endpoint for contact form submission
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to send message. Please try again.")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" }) // Clear form on success
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" pt-30 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl sm:text-5xl font-semibold text-gray-900 leading-tight">Get in Touch</h1>
          <p className="mt-4 text-xl text-gray-600">
            We'd love to hear from you! Send us a message or find our contact details below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information Card */}
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-red-800 text-white p-6">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Mail className="w-6 h-6" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4 text-gray-700">
                <Phone className="w-6 h-6 text-red-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p>+250 788 123 456</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-gray-700">
                <Mail className="w-6 h-6 text-red-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p>support@rnrs.rw</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-gray-700">
                <MapPin className="w-6 h-6 text-red-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p>Kigali Innovation City, Rwanda</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-gray-700">
                <Clock className="w-6 h-6 text-red-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Working Hours</h3>
                  <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Card */}
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-100 p-6 border-b border-gray-200">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Send className="w-6 h-6 text-red-800" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {submitted ? (
                <div className="text-center py-10">
                  <p className="text-green-700 font-semibold text-xl mb-4" role="status">
                    Thank you for reaching out!
                  </p>
                  <p className="text-gray-600">We have received your message and will get back to you soon.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="your@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Your message here..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-red-800 hover:bg-red-900 text-white py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  {error && (
                    <p className="text-red-600 mt-4 text-center" role="alert">
                      Error: {error}
                    </p>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
