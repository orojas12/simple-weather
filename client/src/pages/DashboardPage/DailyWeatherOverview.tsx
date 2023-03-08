import { Progress } from "components";
import { WeatherDay } from "hooks/useWeather";
import { TempIcon, WindIcon } from "icons/weather";
import React from "react";
import WeatherDetailCard from "./WeatherDetailCard";

interface DailyWeatherOverviewProps {
  weather: WeatherDay;
}

export default function DailyWeatherOverview({
  weather,
}: DailyWeatherOverviewProps) {
  return (
    <div className="dashboard__cards">
      <WeatherDetailCard
        title="High/Low"
        content={`${weather.getMaxTemp()}\u00b0/${weather.getMinTemp()}\u00b0`}
        icon={<TempIcon className="dashboard__card-icon" />}
        subtitle={weather.getTempDesc()}
      />
      <WeatherDetailCard
        title="Wind"
        content={`${Math.round(weather.wind_speed || 0)} mph`}
        icon={<WindIcon className="dashboard__card-icon" />}
        subtitle={`${weather.getWindDirection() || ""} - Gusts of ${Math.round(
          weather.wind_gust || 0
        )} mph`}
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
    </div>
  );
}
