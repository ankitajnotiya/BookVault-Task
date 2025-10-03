import React, { useState, useRef, useEffect } from "react";
import NotificationList from "./NotificationList";

export default function NotificationBell({ notifications, setNotifications }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, status: "read" })));
  const deleteNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 sm:p-3 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
        aria-label="Notifications"
      >
        <svg className="h-6 sm:h-8 w-6 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 h-5 sm:h-6 w-5 sm:w-6 bg-red-600 text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <NotificationList
          notifications={notifications}
          markAllRead={markAllRead}
          deleteNotification={deleteNotification}
        />
      )}
    </div>
  );
}
