import React from "react";
import { IconProps } from "@/types/icon";

export default function CheckIcon({ color, style, className }: IconProps) {
  const fill = color || "black";

  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.1553 7.21973C20.4482 7.51262 20.4482 7.9875 20.1553 8.28039L12.2362 16.1995C11.1623 17.2735 9.42107 17.2735 8.34712 16.1995L5.09467 12.9471C4.80178 12.6542 4.80178 12.1793 5.09467 11.8864C5.38756 11.5935 5.86244 11.5935 6.15533 11.8864L9.40778 15.1389C9.89594 15.627 10.6874 15.627 11.1755 15.1389L19.0947 7.21973C19.3876 6.92684 19.8624 6.92684 20.1553 7.21973Z"
        fill="black"
      />
    </svg>
  );
}
