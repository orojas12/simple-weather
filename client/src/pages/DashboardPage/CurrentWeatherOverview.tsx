import React from "react";
import { Progress } from "@/components";
import { EyeIcon } from "@/features/weather/assets/icons";
import { WindIcon, TempIcon } from "@/features/weather/assets/icons";
import WeatherChart from "./WeatherChart";
import WeatherDetailCard from "./WeatherDetailCard";
import { WeatherCurrent } from "@/lib/weather";

interface CurrentWeatherOverviewProps {
  units: string;
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
  units,
}: CurrentWeatherOverviewProps) {
  const WeatherIcon = weather.getIcon();

  return (
    <div className="dashboard__cards">
      <WeatherDetailCard
        title="Current"
        content={`${weather.getTemp(units)}\u00b0`}
        icon={
          WeatherIcon ? (
            <WeatherIcon className="dashboard__current-icon" />
          ) : null
        }
        subtitle={weather.condition.description}
      />
      <WeatherDetailCard
        title="Feels Like"
        content={`${Math.round(weather.getFeelsLikeTemp(units))}\u00b0`}
        icon={<TempIcon className="dashboard__card-icon" />}
        subtitle={weather.getTempDesc()}
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
        title="Visibility"
        content={`${
          units === "imperial"
            ? weather.metersToMiles(weather.visibility)
            : weather.visibility
        } ${units === "imperial" ? "mi" : "m"}`}
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
        className="dashboard__precipitation-card dashboard__chart--lg"
        type="bar"
        title="Probability of Precipitation (%)"
        data={hourlyPrecipData}
        yMax={100}
        aspectRatio={3}
        variant="lg"
      />
      <WeatherChart
        className="dashboard__precipitation-card dashboard__chart--sm"
        type="bar"
        title="Probability of Precipitation (%)"
        data={hourlyPrecipData}
        yMax={100}
        aspectRatio={2}
        variant="sm"
      />
      <WeatherChart
        className="dashboard__wind-speed-card dashboard__chart--lg"
        type="line"
        title="Wind Speed"
        data={hourlyWindData}
        yMax={100}
        aspectRatio={3}
        variant="lg"
      />
      <WeatherChart
        className="dashboard__wind-speed-card dashboard__chart--sm"
        type="line"
        title="Wind Speed"
        data={hourlyWindData}
        yMax={100}
        aspectRatio={2}
        variant="sm"
      />
      <WeatherChart
        className="dashboard__temperature-card dashboard__chart--lg"
        type="line"
        title="Temperature"
        data={hourlyTempData}
        yMax={100}
        aspectRatio={3}
        variant="lg"
      />
      <WeatherChart
        className="dashboard__temperature-card dashboard__chart--sm"
        type="line"
        title="Temperature"
        data={hourlyTempData}
        yMax={100}
        aspectRatio={2}
        variant="sm"
      />
    </div>
  );
}
