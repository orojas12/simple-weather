import React from "react";
import { useNotifications } from "@/context/notifications";
import Notification from "./Notification";
import "./notifications.css";

function Notifications() {
  const notifications = useNotifications();

  return (
    <div className="notifications" aria-live="assertive">
      {notifications.notifications.map((notification) => {
        return (
          <Notification
            id={notification.id}
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClick={(id: string) => notifications.dismissNotification(id)}
          />
        );
      })}
    </div>
  );
}

export default Notifications;
