import React from "react";
import { Card } from "@/components";
import { CheckCircleIcon, CloseCircleIcon } from "@/assets/icons/ui";
import "./notifications.css";

export interface NotificationProps {
  id: string;
  type: "success" | "error";
  message: string;
  onClick: (id: string) => void;
}

function Notification({ id, type, message, onClick }: NotificationProps) {
  return (
    <Card
      className={`notification notification--${type}`}
      onClick={() => onClick(id)}
    >
      <Card.Content className="flex align-center gap-1">
        {type === "success" ? <CheckCircleIcon /> : <CloseCircleIcon />}
        {message}
      </Card.Content>
    </Card>
  );
}

Notification.displayName = "Notification";

export default Notification;
