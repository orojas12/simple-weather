import { useContext } from "react";
import { ContextNotFoundError, NotificationContext } from "@/context";

export function useNotifications() {
  const ctx = useContext(NotificationContext);

  if (!ctx) throw new ContextNotFoundError("NotificationContext");

  return ctx;
}
