import React, { useState } from "react";
import NotificationBell from "./NotificationBell";

export default function Dashboard() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your admission form is approved!", status: "unread", created_at: "2025-09-25 10:30", type: "success" },
    { id: 2, message: "Exam registration deadline is tomorrow", status: "unread", created_at: "2025-09-26 09:00", type: "warning" },
    { id: 3, message: "Scholarship application closes on 30th Sept", status: "unread", created_at: "2025-09-26 14:15", type: "info" },
    { id: 4, message: "Holiday declared on 2nd Oct", status: "read", created_at: "2025-09-24 16:45", type: "info" },
    { id: 5, message: "New course material uploaded for Mathematics", status: "unread", created_at: "2025-09-26 11:20", type: "info" }
  ]);

  return (
    <header className="border-b border-gray-700 bg-gray-900 text-white">
      <div className="px-4 sm:px-6 md:px-10 py-4 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="mb-2 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold">Student Dashboard</h1>
          <p className="text-sm text-gray-400">Welcome back, Student!</p>
        </div>

        <NotificationBell notifications={notifications} setNotifications={setNotifications} />
      </div>
    </header>
  );
}
