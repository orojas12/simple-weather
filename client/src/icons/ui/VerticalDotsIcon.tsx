import React from "react";
import IconProps from "../IconProps";

export default function VerticalDotsIcon({
  color,
  style,
  className,
}: IconProps) {
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
        d="M12 2.75C13.2426 2.75 14.25 3.75736 14.25 5C14.25 6.24264 13.2426 7.25 12 7.25C10.7574 7.25 9.75 6.24264 9.75 5C9.75 3.75736 10.7574 2.75 12 2.75Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12C9.75 10.7574 10.7574 9.75 12 9.75Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 16.75C13.2426 16.75 14.25 17.7574 14.25 19C14.25 20.2426 13.2426 21.25 12 21.25C10.7574 21.25 9.75 20.2426 9.75 19C9.75 17.7574 10.7574 16.75 12 16.75Z"
        fill={fill}
      />
    </svg>
  );
}
