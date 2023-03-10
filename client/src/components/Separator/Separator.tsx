import React from "react";
import "./separator.css";

interface SeparatorProps {
  type: "vertical" | "horizontal";
}

export default function Separator({ type }: SeparatorProps) {
  return <div className={`separator separator--${type}`}></div>;
}
