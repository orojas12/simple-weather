// TODO: fix all "@" imports in project!

import React from "react";
import { WeatherCurrent, WeatherHour } from "@/lib/weather";
import { TempIcon, WindIcon, EyeIcon } from "../assets/icons";
import WeatherDetailCard from "./WeatherDetailCard";
import { Progress } from "@/components";
import PrecipitationChart from "./PrecipitationChart";

interface CurrentSummaryProps {
  current: WeatherCurrent;
  hours: WeatherHour[];
  units: string;
}

function CurrentSummary(props: CurrentSummaryProps) {
  const { current, hours, units } = props;
  const WeatherIcon = current.getIcon();

  return (
    <div className="dashboard__cards">
      <WeatherDetailCard
        title="Current"
        content={`${current.getTemp(units)}\u00b0`}
        icon={
          WeatherIcon ? (
            <WeatherIcon className="dashboard__current-icon" />
          ) : null
        }
        subtitle={current.condition.description}
      />
      <WeatherDetailCard
        title="Feels Like"
        content={`${Math.round(current.getFeelsLikeTemp(units))}\u00b0`}
        icon={<TempIcon className="dashboard__card-icon" />}
        subtitle={current.getTempDesc()}
      />
      <WeatherDetailCard
        title="Wind"
        content={`${Math.round(current.getWindSpeed(units))} ${
          units === "imperial" ? "mph" : "m/s"
        }`}
        icon={<WindIcon className="dashboard__card-icon" />}
        subtitle={`${current.getWindDirection()}${
          current.wind_gust
            ? ` - Gusts of ${Math.round(
                current.getWindGust(units) as number
              )} ${units === "imperial" ? "mph" : "m/s"}`
            : ""
        }`}
      />
      <WeatherDetailCard
        title="Visibility"
        content={`${
          units === "imperial"
            ? current.metersToMiles(current.visibility)
            : current.visibility
        } ${units === "imperial" ? "mi" : "m"}`}
        icon={<EyeIcon className="dashboard__card-icon" />}
        subtitle={`${current.getVisibilityDesc(current.visibility)}`}
      />
      <WeatherDetailCard
        title="UV Index"
        content={current.uvi}
        icon={
          <div className="dashboard__uvi-progress-wrapper">
            <Progress type="vertical" value={current.getUviPercentage()} />
          </div>
        }
        subtitle={current.getUviCategory()}
      />
      {/* <WeatherChart
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
      /> */}
      <PrecipitationChart weatherHours={hours} variant="lg" />
      <PrecipitationChart weatherHours={hours} variant="sm" />
      {/* <WeatherChart
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
      /> */}
    </div>
  );
}

export default CurrentSummary;
