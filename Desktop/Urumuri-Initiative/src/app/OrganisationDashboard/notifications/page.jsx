"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { BellRing, CheckCircle2, XCircle } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("https://urumuri-backend.onrender.com/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setNotifications(data)
      } catch (err) {
        console.error("Failed to fetch notifications:", err)
        setError("Failed to load notifications. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Latest Updates</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center p-8">
              <BellRing className="w-8 h-8 animate-bounce text-red-800" />
              <p className="ml-3 text-gray-600">Loading notifications...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center p-8 text-red-600">
              <XCircle className="w-6 h-6 mr-2" />
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && notifications.length === 0 && (
            <div className="text-center p-8 text-gray-500">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <p className="text-lg font-medium">No new notifications!</p>
              <p className="text-sm">You're all caught up.</p>
            </div>
          )}

          {!loading && !error && notifications.length > 0 && (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start space-x-4 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {notification.type === "alert" && <BellRing className="w-5 h-5 text-red-600" />}
                      {notification.type === "info" && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                      {/* Add more icon types as needed */}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                        <Badge
                          variant={notification.read ? "secondary" : "default"}
                          className={notification.read ? "bg-gray-200 text-gray-600" : "bg-red-100 text-red-800"}
                        >
                          {notification.read ? "Read" : "New"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-400">{new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
