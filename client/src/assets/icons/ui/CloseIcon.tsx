import React from "react";
import { IconProps } from "@/types/icon";

export default function CloseIcon({ color, style, className }: IconProps) {
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
        d="M6.21985 6.21479C6.51275 5.92189 6.98762 5.92189 7.28051 6.21479L17.7854 16.7196C18.0783 17.0125 18.0783 17.4874 17.7854 17.7803C17.4925 18.0732 17.0176 18.0732 16.7247 17.7803L6.21985 7.27545C5.92696 6.98255 5.92696 6.50768 6.21985 6.21479Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.7853 6.21479C18.0782 6.50769 18.0782 6.98256 17.7853 7.27545L7.28032 17.7802C6.98742 18.0731 6.51255 18.0731 6.21966 17.7802C5.92677 17.4873 5.92677 17.0124 6.21967 16.7195L16.7246 6.21478C17.0175 5.92189 17.4924 5.9219 17.7853 6.21479Z"
        fill="black"
      />
    </svg>
  );
}
