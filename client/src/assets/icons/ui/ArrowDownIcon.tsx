import React from "react";
import { IconProps } from "@/types/icon";

export default function ArrowDownIcon({ color, style, className }: IconProps) {
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
        d="M4.47461 8.21512C4.77531 7.93025 5.25001 7.94308 5.53488 8.24378L11.083 14.1001C11.576 14.6205 12.4048 14.6205 12.8979 14.1001L18.446 8.24378C18.7308 7.94308 19.2055 7.93025 19.5062 8.21512C19.8069 8.49999 19.8198 8.97469 19.5349 9.27539L13.9868 15.1317C12.9021 16.2767 11.0787 16.2767 9.99405 15.1317L4.44595 9.27539C4.16108 8.97469 4.17391 8.49999 4.47461 8.21512Z"
        fill={fill}
      />
    </svg>
  );
}
