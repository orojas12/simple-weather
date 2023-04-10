import React, { createContext } from "react";
import { Card } from "@/components";
import { CheckCircleIcon, CloseCircleIcon } from "@/assets/icons/ui";
import "./toast.css";

export interface ToastProps {
  type?: "success" | "alert";
  msg?: string;
  active?: boolean;
  display?: boolean;
  onClick?: () => void;
}

interface IToastContext {
  setToast: React.Dispatch<React.SetStateAction<ToastProps | null>>;
}

export const ToastContext = createContext<IToastContext | null>(null);

export default function Toast({
  type = "success",
  msg = "Task failed successfully.",
  active = true,
  display = true,
  onClick,
}: ToastProps) {
  return (
    <div className="toast__wrapper" onClick={onClick}>
      <Card
        className={`toast toast--${type} ${!display ? "toast--hidden" : ""} ${
          active ? "toast--active" : ""
        }`}
      >
        <Card.Content className="flex align-center gap-1">
          {type === "success" ? <CheckCircleIcon /> : <CloseCircleIcon />}
          {msg}
        </Card.Content>
      </Card>
    </div>
  );
}
