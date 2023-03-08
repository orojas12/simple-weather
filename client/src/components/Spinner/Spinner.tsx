import React from "react";
import "./spinner.css";

interface SpinnerProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Spinner({ className = "", style }: SpinnerProps) {
  return <div className={`spinner ${className}`} style={style}></div>;
}
