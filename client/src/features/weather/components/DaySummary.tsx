import React from "react";
import { Progress } from "@/components";
import { WindIcon } from "../assets/icons";
import { WeatherDay, WeatherHour } from "../lib/weather";
import DayTemps from "./DayTemps";
import WeatherDetailCard from "./WeatherDetailCard";
import PrecipitationChart from "./PrecipitationChart";
import TemperatureChart from "./TemperatureChart";
import WindChart from "./WindChart";

interface DaySummaryProps {
  units: string;
  day: WeatherDay;
  hours: WeatherHour[];
}

export default function DaySummary({ units, day, hours }: DaySummaryProps) {
  const WeatherIcon = day.getIcon();

  return (
    <div className="dashboard__cards" data-testid="day-summary">
      <WeatherDetailCard
        title="Conditions"
        content={
          <>
            <span>{day.getMaxTemp(units)}&deg;</span>
            <span className="fs-4">/{day.getMinTemp(units)}&deg;</span>
          </>
        }
        icon={
          WeatherIcon && <WeatherIcon className="dashboard__current-icon" />
        }
        subtitle={day.condition.description}
      />
      <WeatherDetailCard
        title="Wind"
        content={`${Math.round(day.getWindSpeed(units))} ${
          units === "imperial" ? "mph" : "m/s"
        }`}
        icon={<WindIcon className="dashboard__card-icon" />}
        subtitle={`${
          day.wind_gust
            ? `${day.getWindDirection()} - Gusts of ${Math.round(
                day.getWindGust(units)!
              )} ${units === "imperial" ? "mph" : "m/s"}`
            : ""
        }`}
      />
      <WeatherDetailCard
        title="UV Index"
        content={day.uvi}
        icon={
          <div className="dashboard__uvi-progress-wrapper">
            <Progress type="vertical" value={day.getUviPercentage()} />
          </div>
        }
        subtitle={day.getUviCategory()}
      />
      <DayTemps day={day} units={units} />
      {day.isToday() ? (
        <>
          <PrecipitationChart weatherHours={hours} variant="lg" />
          <PrecipitationChart weatherHours={hours} variant="sm" />
          <WindChart weatherHours={hours} variant="lg" />
          <WindChart weatherHours={hours} variant="sm" />
          <TemperatureChart weatherHours={hours} variant="lg" />
          <TemperatureChart weatherHours={hours} variant="sm" />
        </>
      ) : null}
    </div>
  );
}
