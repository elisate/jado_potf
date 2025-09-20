'use client';
import { useEffect, useState } from 'react';

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('https://urumuri-backend.onrender.com/api/notifications'); // same backend endpoint
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error(error);
        setNotifications([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-white shadow rounded p-4 space-y-2 text-gray-700">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : notifications.length > 0 ? (
        notifications.slice(0, 3).map((note, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-2">🔔</span>
            <span>{note.message}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No notifications.</p>
      )}
    </div>
  );
}
