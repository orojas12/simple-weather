import React from "react";
import { WeatherCurrent, WeatherHour } from "../lib/weather";
import { TempIcon, WindIcon, EyeIcon } from "../assets/icons";
import WeatherDetailCard from "./WeatherDetailCard";
import { Progress } from "@/components";
import PrecipitationChart from "./PrecipitationChart";
import TemperatureChart from "./TemperatureChart";
import WindChart from "./WindChart";

interface CurrentSummaryProps {
  current: WeatherCurrent;
  units: string;
}

function CurrentSummary(props: CurrentSummaryProps) {
  const { current, units } = props;
  const WeatherIcon = current.getIcon();

  return (
    <div className="dashboard__cards" data-testid="current-summary">
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
        subtitle={`${
          current.wind_gust
            ? `${current.getWindDirection()} - Gusts of ${Math.round(
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
    </div>
  );
}

export default CurrentSummary;
