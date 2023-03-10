import React from "react";
import { Progress } from "components";
import { WeatherCurrent } from "hooks";
import { EyeIcon } from "icons/ui";
import { WindIcon, TempIcon } from "icons/weather";
import WeatherChart from "./WeatherChart";
import WeatherDetailCard from "./WeatherDetailCard";

interface CurrentWeatherOverviewProps {
  weather: WeatherCurrent;
  hourlyWindData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
  hourlyPrecipData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
  hourlyTempData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
}

export default function CurrentWeatherOverview({
  weather,
  hourlyWindData,
  hourlyPrecipData,
  hourlyTempData,
}: CurrentWeatherOverviewProps) {
  const WeatherIcon = weather.getIcon();

  return (
    <div className="dashboard__cards">
      <WeatherDetailCard
        title="Current"
        content={`${weather.getTemp()}\u00b0`}
        icon={
          WeatherIcon ? (
            <WeatherIcon className="dashboard__current-icon" />
          ) : null
        }
        subtitle={weather.condition.description}
      />
      <WeatherDetailCard
        title="Feels Like"
        content={`${Math.round(weather.getFeelsLikeTemp())}\u00b0`}
        icon={<TempIcon className="dashboard__card-icon" />}
        subtitle={weather.getTempDesc()}
      />
      <WeatherDetailCard
        title="Wind"
        content={`${Math.round(weather.wind_speed)} mph`}
        icon={<WindIcon className="dashboard__card-icon" />}
        subtitle={`${weather.getWindDirection()}${
          weather.wind_gust
            ? ` - Gusts of ${Math.round(weather.wind_gust)} mph`
            : ""
        }`}
      />
      <WeatherDetailCard
        title="Visibility"
        content={`${weather.metersToMiles(weather.visibility)} mi`}
        icon={<EyeIcon className="dashboard__card-icon" />}
        subtitle={`${weather.getVisibilityDesc(weather.visibility)}`}
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
      <WeatherChart
        className="dashboard__precipitation-card"
        type="bar"
        title="Probability of Precipitation (%)"
        data={hourlyPrecipData}
        yMax={100}
      />
      <WeatherChart
        className="dashboard__wind-speed-card"
        type="line"
        title="Wind Speed"
        data={hourlyWindData}
        yMax={100}
      />
      <WeatherChart
        className="dashboard__temperature-card"
        type="line"
        title="Temperature"
        data={hourlyTempData}
        yMax={100}
      />
    </div>
  );
}
