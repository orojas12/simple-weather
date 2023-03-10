import { Card, Progress, Separator } from "components";
import { WeatherDay } from "hooks/useWeather";
import { HorizonIcon, MoonIcon, SunnyIcon, WindIcon } from "icons/weather";
import React from "react";
import WeatherDetailCard from "./WeatherDetailCard";

interface DailyWeatherOverviewProps {
  weather: WeatherDay;
}

export default function DailyWeatherOverview({
  weather,
}: DailyWeatherOverviewProps) {
  const WeatherIcon = weather.getIcon();
  let mornTemp = 0;
  let dayTemp = 0;
  let eveTemp = 0;
  let nightTemp = 0;
  if (typeof weather.temp === "object") {
    mornTemp = Math.round(weather.temp.morn);
    dayTemp = Math.round(weather.temp.day);
    eveTemp = Math.round(weather.temp.eve);
    nightTemp = Math.round(weather.temp.night);
  }

  return (
    <div className="dashboard__cards">
      <WeatherDetailCard
        title="Conditions"
        content={
          <>
            <span>{weather.getMaxTemp()}&deg;</span>
            <span className="fs-4">/{weather.getMinTemp()}&deg;</span>
          </>
        }
        icon={
          WeatherIcon && <WeatherIcon className="dashboard__current-icon" />
        }
        subtitle={weather.condition.description}
      />
      <WeatherDetailCard
        title="Wind"
        content={`${Math.round(weather.wind_speed || 0)} mph`}
        icon={<WindIcon className="dashboard__card-icon" />}
        subtitle={`${weather.getWindDirection()}${
          weather.wind_gust
            ? ` - Gusts of ${Math.round(weather.wind_gust)} mph`
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
