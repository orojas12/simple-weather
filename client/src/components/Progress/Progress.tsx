import React, { useContext, createContext } from "react";
import "./progress.css";

interface ProgressProps {
  type?: "vertical" | "horizontal";
  value: number;
  min?: number;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface BarProps {
  className?: string;
  style?: React.CSSProperties;
}

interface IProgressContext {
  type: "vertical" | "horizontal";
  value: number;
  min: number;
  max: number;
}

const ProgressContext = createContext<IProgressContext | null>(null);

export default function Progress({
  type = "horizontal",
  min = 0,
  max = 100,
  value,
  className = "",
  style,
  children,
}: ProgressProps) {
  return (
    <div className={`progress progress--${type} ${className}`} style={style}>
      <ProgressContext.Provider value={{ type, min, max, value }}>
        {children || <Bar />}
      </ProgressContext.Provider>
    </div>
  );
}

function Bar({ className = "", style }: BarProps) {
  const ctx = useContext(ProgressContext);
  let percent = 0;
  if (ctx) {
    // convert value to percentage between min and max
    percent = ((ctx.value - ctx.min) / (ctx.max - ctx.min)) * 100;
  }
  return (
    <div
      className={`progress__bar ${className}`}
      style={{
        width: `${ctx?.type === "horizontal" ? percent : 100}%`,
        height: `${ctx?.type === "vertical" ? percent : 100}%`,
        ...style,
      }}
    ></div>
  );
}

Progress.Bar = Bar;
