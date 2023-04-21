import React, { useState, useRef, useEffect, createContext } from "react";
import { nanoid } from "nanoid";

export interface Notification {
  id: string;
  type: "success" | "error";
  message: string;
}

export interface INotificationContext {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id">,
    milliseconds?: number
  ) => string;
  dismissNotification: (id: string) => void;
}

export const NotificationContext = createContext<INotificationContext | null>(
  null
);

interface NotificationProviderProps {
  children?: React.ReactNode;
  initialState?: Notification[];
}

export function NotificationProvider(props: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>(
    props.initialState || []
  );
  const notificationTimeouts = useRef<
    { id: string; timeout: NodeJS.Timeout }[]
  >([]);

  useEffect(() => {
    return () =>
      notificationTimeouts.current.forEach((notificationTimeout) =>
        clearTimeout(notificationTimeout.timeout)
      );
  }, []);

  /**
   * Add a new notification.
   * @param notification Notification object
   * @param milliseconds Milliseconds to wait until auto-dismissing notification.
   * @returns Notification id
   */
  function addNotification(
    notification: Omit<Notification, "id">,
    milliseconds?: number
  ) {
    const id = nanoid();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, ...notification },
    ]);
    if (milliseconds) {
      notificationTimeouts.current = [
        ...notificationTimeouts.current,
        {
          id,
          timeout: setTimeout(() => dismissNotification(id), milliseconds),
        },
      ];
    }
    return id;
  }

  /**
   * Remove a notification.
   * @param id Notification id
   */
  function dismissNotification(id: string) {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    notificationTimeouts.current = notificationTimeouts.current.filter(
      (notificationTimeout) => {
        if (notificationTimeout.id === id) {
          clearTimeout(notificationTimeout.timeout);
          return false;
        } else return true;
      }
    );
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, dismissNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
}
