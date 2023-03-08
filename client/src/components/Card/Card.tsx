import React from "react";
import "./card.css";

interface CardProps {
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface TitleProps {
  align?: "start" | "center" | "end";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface ContentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Card({
  loading = false,
  style,
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`card ${loading ? "card--loading" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function Title({
  children,
  style,
  className = "",
  align = "center",
}: TitleProps) {
  return (
    <div
      className={`card__title card__title--${align} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function Content({ className = "", style, children }: ContentProps) {
  return (
    <div className={`card__content ${className}`} style={style}>
      {children}
    </div>
  );
}

Card.Title = Title;
Card.Content = Content;
