import React from "react";
import IconProps from "../IconProps";

export default function LocationIcon({ color, style, className }: IconProps) {
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
        d="M8.89133 21.0786L8.94614 21.1314L8.95043 21.1355C9.95465 22.0978 10.9284 22.7575 12.0297 22.7448C13.1259 22.7322 14.0956 22.0554 15.0993 21.0782C16.4748 19.7454 18.2545 17.9475 19.5404 15.8147C20.831 13.674 21.6639 11.129 21.0373 8.33583C18.9197 -1.10425 5.09136 -1.11531 2.96279 8.3258C2.35385 11.0399 3.12317 13.5226 4.35002 15.6267C5.57225 17.7229 7.28243 19.5028 8.65397 20.8469C8.73389 20.9253 8.81276 21.0022 8.89038 21.0777L8.89133 21.0786ZM12 6.25C10.2051 6.25 8.75003 7.70507 8.75003 9.5C8.75003 11.2949 10.2051 12.75 12 12.75C13.795 12.75 15.25 11.2949 15.25 9.5C15.25 7.70507 13.795 6.25 12 6.25Z"
        fill={fill}
      />
    </svg>
  );
}
