import React from "react";
import { IconProps } from "@icons";

export default function CloudyIcon({ color, style, className }: IconProps) {
  const fill = color || "#A3AFC2";

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
        d="M18.7386 7.26484C19.622 8.52113 19.9807 10.0955 19.5148 11.8314C21.6536 12.2417 22.8437 14.148 22.7442 15.975C22.6888 16.9931 22.2361 18.0038 21.3326 18.7264C20.4349 19.4445 19.1602 19.8257 17.5415 19.7374C16.7424 19.7372 15.6569 19.7235 14.4975 19.7088C12.1672 19.6794 9.53825 19.6462 8.33532 19.711C6.23468 19.8244 4.56098 19.3476 3.35602 18.4763C2.14898 17.6035 1.4584 16.3657 1.29065 15.0626C0.963983 12.5252 2.61685 9.88612 5.86543 9.16196C6.47837 7.08518 7.75191 5.70197 9.31473 4.94652C10.9376 4.16205 12.8188 4.07842 14.5093 4.50492C16.197 4.93069 17.7673 5.8836 18.7386 7.26484Z"
        fill={fill}
      />
    </svg>
  );
}
