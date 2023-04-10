import React, { useState, useEffect, useRef } from "react";

export interface ClockProps {}

export default function Clock() {
  const [date, setDate] = useState<Date | null>(null);
  const interval = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    setDate(new Date());
    interval.current = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      if (interval?.current) clearInterval(interval.current);
    };
  }, []);

  return (
    <div className="dashboard__clock">
      {date?.toLocaleString(["en-US"], {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}
    </div>
  );
}
