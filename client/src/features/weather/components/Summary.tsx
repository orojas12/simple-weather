import React, { useState, useEffect } from "react";
import { ToggleGroup } from "@/components";
import CurrentSummary from "./CurrentSummary";
import DaySummary from "./DaySummary";
import { WeatherDay } from "../lib/weather";
import WeatherAlertAccordian from "./WeatherAlertAccordian";
import { IWeather } from "../context";

interface SummaryProps {
  units: string;
  day: number;
  weather: IWeather;
  location: string;
}

function Summary(props: SummaryProps) {
  const [showCurrent, setShowCurrent] = useState(true);
  const isToday = props.day === 0;

  useEffect(() => {
    if (isToday) {
      setShowCurrent(true);
    } else {
      setShowCurrent(false);
    }
  }, [isToday]);

  return (
    <div className="dashboard__overview">
      <SummaryHeading
        days={props.weather.daily}
        location={props.location}
        showCurrent={showCurrent}
        day={props.day}
      />
      <div className="dashboard__alerts">
        {props.weather.alerts?.map((alert) => (
          <WeatherAlertAccordian key={alert.event} alert={alert} />
        ))}
      </div>
      {isToday ? (
        <ToggleGroup
          exclusive
          enforceSelection
          onChange={(selected) => {
            setShowCurrent(selected.includes("current"));
          }}
          className="summary__toggle"
        >
          <ToggleGroup.Toggle name="current" default>
            Current
          </ToggleGroup.Toggle>
          <ToggleGroup.Toggle name="today">Today</ToggleGroup.Toggle>
        </ToggleGroup>
      ) : null}
      {showCurrent ? (
        <CurrentSummary current={props.weather.current} units={props.units} />
      ) : (
        <DaySummary
          units={props.units}
          day={props.weather.daily[props.day]}
          hours={props.weather.hourly}
        />
      )}
    </div>
  );
}

function SummaryHeading(props: {
  showCurrent: boolean;
  days: WeatherDay[];
  day: number;
  location: string;
}) {
  const { showCurrent, days, day, location } = props;
  let heading = ` in ${location}`;
  if (showCurrent) {
    heading = "Currently" + heading;
  } else if (days[day].isToday()) {
    heading = "Today" + heading;
  } else {
    heading = days[day].getWeekDayString() + heading;
  }
  return <h2 className="dashboard__heading">{heading}</h2>;
}

export default Summary;
