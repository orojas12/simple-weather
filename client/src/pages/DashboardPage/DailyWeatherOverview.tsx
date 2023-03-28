import React from "react";
import { Card, Progress, Separator } from "components";
import { HorizonIcon, MoonIcon, SunnyIcon, WindIcon } from "icons/weather";
import { WeatherDay } from "lib/weather";
import WeatherDetailCard from "./WeatherDetailCard";

interface DailyWeatherOverviewProps {
  units: string;
  weather: WeatherDay;
}

export default function DailyWeatherOverview({
  units,
  weather,
}: DailyWeatherOverviewProps) {
  const WeatherIcon = weather.getIcon();
  let mornTemp = 0;
  let dayTemp = 0;
  let eveTemp = 0;
  let nightTemp = 0;
  if (typeof weather.temp === "object") {
    mornTemp = Math.round(weather.getTemp(units, "morn"));
    dayTemp = Math.round(weather.getTemp(units, "day"));
    eveTemp = Math.round(weather.getTemp(units, "eve"));
    nightTemp = Math.round(weather.getTemp(units, "night"));
  }

  return (
    <div className="dashboard__cards">
      <WeatherDetailCard
        title="Conditions"
        content={
          <>
            <span>{weather.getMaxTemp(units)}&deg;</span>
            <span className="fs-4">/{weather.getMinTemp(units)}&deg;</span>
          </>
        }
        icon={
          WeatherIcon && <WeatherIcon className="dashboard__current-icon" />
        }
        subtitle={weather.condition.description}
      />
      <WeatherDetailCard
        title="Wind"
        content={`${Math.round(weather.getWindSpeed(units))} ${
          units === "imperial" ? "mph" : "m/s"
        }`}
        icon={<WindIcon className="dashboard__card-icon" />}
        subtitle={`${weather.getWindDirection()}${
          weather.wind_gust
            ? ` - Gusts of ${Math.round(weather.getWindGust(units)!)} ${
                units === "imperial" ? "mph" : "m/s"
              }`
            : ""
        }`}
      />
      <WeatherDetailCard
        title="UV Index"
        content={weather.uvi}
        icon={
          <div className="dashboard__uvi-progress-wrapper">
            <Progress type="vertical" value={weather.getUviPercentage()!} />
          </div>
        }
        subtitle={weather.getUviCategory()!}
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
