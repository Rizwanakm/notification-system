// frontend/src/components/NotificationUI.tsx
import React, { useEffect, useState } from "react";
import { socket } from "../socket";

interface Notification {
  title: string;
  message: string;
  link?: string;
}

const NotificationUI: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socket.on("notification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((n, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              margin: "5px 0",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <strong>{n.title}</strong>
            <p>{n.message}</p>
            {n.link && (
              <a href={n.link} target="_blank" rel="noopener noreferrer">
                Go
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationUI;
