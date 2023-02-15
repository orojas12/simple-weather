import React from "react";
import IconProps from "./IconProps";

export default function SearchIcon({ color, style, className }: IconProps) {
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
        d="M16.7464 16.7464C17.0393 16.4535 17.5142 16.4535 17.8071 16.7464L21.7677 20.707C22.0606 20.9999 22.0606 21.4748 21.7677 21.7677C21.4748 22.0606 20.9999 22.0606 20.707 21.7677L16.7464 17.8071C16.4535 17.5142 16.4535 17.0393 16.7464 16.7464Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0529 18.6058C15.2243 18.6058 18.6058 15.2243 18.6058 11.0529C18.6058 6.88155 15.2243 3.5 11.0529 3.5C6.88155 3.5 3.5 6.88155 3.5 11.0529C3.5 15.2243 6.88155 18.6058 11.0529 18.6058ZM11.0529 20.1058C16.0527 20.1058 20.1058 16.0527 20.1058 11.0529C20.1058 6.05312 16.0527 2 11.0529 2C6.05312 2 2 6.05312 2 11.0529C2 16.0527 6.05312 20.1058 11.0529 20.1058Z"
        fill={fill}
      />
    </svg>
  );
}
