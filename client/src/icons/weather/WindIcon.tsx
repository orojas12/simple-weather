import React from "react";
import IconProps from "../IconProps";

export default function WindIcon({ color, style, className }: IconProps) {
  const fill = color || "#4791FF";

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
        d="M15.8482 9.82397C15.8482 8.16772 17.1209 6.73218 18.7991 6.73218C20.4657 6.73218 21.75 8.15528 21.75 9.82397C21.75 11.4802 20.4773 12.9158 18.7991 12.9158H14.4546C14.0404 12.9158 13.7046 12.58 13.7046 12.1658C13.7046 11.7515 14.0404 11.4158 14.4546 11.4158H18.7991C19.5591 11.4158 20.25 10.7446 20.25 9.82397C20.25 8.89841 19.5544 8.23218 18.7991 8.23218C18.0392 8.23218 17.3482 8.90338 17.3482 9.82397C17.3482 10.2382 17.0124 10.574 16.5982 10.574C16.184 10.574 15.8482 10.2382 15.8482 9.82397Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.20231 7.04694C8.20231 5.03213 9.69344 3.25 11.7034 3.25C13.6998 3.25 15.2046 5.01701 15.2046 7.04694C15.2046 9.06175 13.7135 10.8439 11.7034 10.8439H5.45459C5.04038 10.8439 4.70459 10.5081 4.70459 10.0939C4.70459 9.67967 5.04038 9.34388 5.45459 9.34388H11.7034C12.7412 9.34388 13.7046 8.3849 13.7046 7.04694C13.7046 5.70145 12.7344 4.75 11.7034 4.75C10.6657 4.75 9.70231 5.70898 9.70231 7.04694C9.70231 7.46115 9.36652 7.79694 8.95231 7.79694C8.5381 7.79694 8.20231 7.46115 8.20231 7.04694Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.20227 17.0583C8.20227 19.0732 9.6934 20.8553 11.7034 20.8553C13.6998 20.8553 15.2045 19.0883 15.2045 17.0583C15.2045 15.0435 13.7134 13.2614 11.7034 13.2614H3C2.58579 13.2614 2.25 13.5972 2.25 14.0114C2.25 14.4256 2.58579 14.7614 3 14.7614H11.7034C12.7411 14.7614 13.7045 15.7204 13.7045 17.0583C13.7045 18.4038 12.7343 19.3553 11.7034 19.3553C10.6657 19.3553 9.70227 18.3963 9.70227 17.0583C9.70227 16.6441 9.36648 16.3083 8.95227 16.3083C8.53805 16.3083 8.20227 16.6441 8.20227 17.0583Z"
        fill={fill}
      />
    </svg>
  );
}