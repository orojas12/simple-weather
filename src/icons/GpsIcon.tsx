import React from "react";
import IconProps from "./IconProps";

export default function GpsIcon({
  color,
  width,
  height,
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
      style={{ width, height }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75ZM10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75C11.0335 13.75 10.25 12.9665 10.25 12ZM12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V6C12.75 6.41421 12.4142 6.75 12 6.75C11.5858 6.75 11.25 6.41421 11.25 6V2C11.25 1.58579 11.5858 1.25 12 1.25Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H6C6.41421 11.25 6.75 11.5858 6.75 12C6.75 12.4142 6.41421 12.75 6 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 17.25C12.4142 17.25 12.75 17.5858 12.75 18L12.75 22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22L11.25 18C11.25 17.5858 11.5858 17.25 12 17.25Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.25 12C17.25 11.5858 17.5858 11.25 18 11.25L22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75L18 12.75C17.5858 12.75 17.25 12.4142 17.25 12Z"
        fill={fill}
      />
    </svg>
  );
}
