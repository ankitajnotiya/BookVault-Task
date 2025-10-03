import React from "react";

export default function NotificationList({ notifications, markAllRead, deleteNotification }) {
  const getNotificationIcon = (type) => {
    const icons = {
      success: <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" /></svg>,
      warning: <svg className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01" /></svg>,
      info: <svg className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1" /></svg>,
    };
    return icons[type] || icons.info;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(" ", "T"));
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60));
    if (diff < 1) return "just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  return (
    <div className="absolute right-0 mt-2 w-[90vw] sm:w-96 md:w-80 lg:w-96 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
        <h3 className="text-sm sm:text-base font-semibold">Notifications</h3>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
            >
              <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Mark all read</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-h-80 sm:max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-400 text-sm">No notifications yet.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 sm:p-4 border-b border-gray-700 flex justify-between items-start ${n.status === "unread" ? "bg-gray-700/50" : ""}`}
            >
              <div className="flex items-start space-x-2 sm:space-x-3">
                {getNotificationIcon(n.type)}
                <div className="flex-1">
                  <p className={`text-sm sm:text-base leading-snug ${n.status === "unread" ? "text-white font-semibold" : "text-gray-300"}`}>
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(n.created_at)}</p>
                </div>
              </div>
              <button
                onClick={() => deleteNotification(n.id)}
                className="text-red-500 hover:text-red-400 text-xs sm:text-sm ml-2"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
