import React from "react";
import { IconProps } from "@/types/icon";

export default function AddIcon({ color, style, className }: IconProps) {
  const fill = color || "black";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9988 5.09319C12.413 5.09319 12.7488 5.42898 12.7488 5.8432L12.7487 18.1593C12.7487 18.5736 12.4129 18.9093 11.9987 18.9093C11.5845 18.9093 11.2487 18.5736 11.2487 18.1593L11.2488 5.84319C11.2488 5.42898 11.5846 5.09319 11.9988 5.09319Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.9069 12.0013C18.9069 12.4155 18.5711 12.7513 18.1569 12.7513L5.84071 12.7512C5.4265 12.7512 5.09072 12.4154 5.09072 12.0012C5.09072 11.587 5.42651 11.2512 5.84072 11.2512L18.1569 11.2513C18.5711 11.2513 18.9069 11.5871 18.9069 12.0013Z"
        fill={fill}
      />
    </svg>
  );
}
