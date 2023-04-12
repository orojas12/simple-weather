import React from "react";
import { Card, Progress, Separator } from "@/components";
import { HorizonIcon, MoonIcon, SunnyIcon, WindIcon } from "../assets/icons";
import { WeatherDay } from "../lib/weather";
import WeatherDetailCard from "./WeatherDetailCard";

interface DaySummaryProps {
  units: string;
  day: WeatherDay;
}

export default function DaySummary({ units, day }: DaySummaryProps) {
  const WeatherIcon = day.getIcon();
  let mornTemp = 0;
  let dayTemp = 0;
  let eveTemp = 0;
  let nightTemp = 0;
  if (typeof day.temp === "object") {
    mornTemp = Math.round(day.getTemp(units, "morn"));
    dayTemp = Math.round(day.getTemp(units, "day"));
    eveTemp = Math.round(day.getTemp(units, "eve"));
    nightTemp = Math.round(day.getTemp(units, "night"));
  }

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
        subtitle={`${day.getWindDirection()}${
          day.wind_gust
            ? ` - Gusts of ${Math.round(day.getWindGust(units)!)} ${
                units === "imperial" ? "mph" : "m/s"
              }`
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
      <Card className="dashboard__day-temps">
        <Card.Content className="flex justify-around">
          <div className="dashboard__day-temp">
            <span className="clr-dark-100 text-center">Morning</span>
            <HorizonIcon className="dashboard__weather-icon" />
            <span className="fs-4 text-center">{mornTemp}&deg;</span>
          </div>
          <Separator type="vertical" />
          <div className="dashboard__day-temp">
            <span className="clr-dark-100 text-center">Day</span>
            <SunnyIcon className="dashboard__weather-icon" />
            <span className="fs-4 text-center">{dayTemp}&deg;</span>
          </div>
          <Separator type="vertical" />
          <div className="dashboard__day-temp">
            <span className="clr-dark-100 text-center">Evening</span>
            <HorizonIcon className="dashboard__weather-icon" />
            <span className="fs-4 text-center">{eveTemp}&deg;</span>
          </div>
          <Separator type="vertical" />
          <div className="dashboard__day-temp">
            <span className="clr-dark-100 text-center">Night</span>
            <MoonIcon className="dashboard__weather-icon" />
            <span className="fs-4 text-center">{nightTemp}&deg;</span>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
