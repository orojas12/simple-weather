import React, { useState } from "react";
import { IWeather } from "@context";
import { ToggleGroup } from "@components";

interface SummaryProps {
  day: number;
  weather: IWeather;
  location: string;
}

function Summary(props: SummaryProps) {
  const [showCurrent, setShowCurrent] = useState(true);
  const isToday = props.day === 0;

  return (
    <div className="summary">
      {isToday ? (
        <ToggleGroup
          exclusive
          enforceSelection
          onChange={(selected) => {
            setShowCurrent(selected.includes("current"));
          }}
        >
          <ToggleGroup.Toggle name="current" default>
            Current
          </ToggleGroup.Toggle>
          <ToggleGroup.Toggle name="today">Today</ToggleGroup.Toggle>
        </ToggleGroup>
      ) : null}
      {showCurrent ? (
        <div className="current-summary" data-testid="current-summary">
          Current Summary
        </div>
      ) : (
        <div className="day-summary" data-testid="day-summary"></div>
      )}
    </div>
  );
}

export default Summary;
