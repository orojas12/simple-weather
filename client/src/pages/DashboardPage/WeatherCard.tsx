import React from "react";
import { Card } from "components";
import { PrecipitationIcon } from "icons/weather";
import { WeatherDay, WeatherCurrent } from "hooks";

interface WeatherCardProps {
  weather?: WeatherDay | WeatherCurrent;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  active?: boolean;
}

export default function WeatherCard({
  weather,
  onClick,
  active = false,
}: WeatherCardProps) {
  if (!weather) return null;
  let title: string;
  let temperature: React.ReactNode;
  let precipitation: React.ReactNode;
  let feelsTemperature: React.ReactNode;

  if (weather instanceof WeatherCurrent) {
    title = "Current";
    temperature = <span>{Math.round(weather.getTemp())}&deg;</span>;
    feelsTemperature = (
      <span className="fs-2">
        Feels {Math.round(weather.getFeelsLikeTemp())}&deg;
      </span>
    );
  } else {
    title = weather.isToday()
      ? "Today"
      : weather.dt.toLocaleDateString([], { day: "2-digit", weekday: "short" });
    temperature = (
      <span>
        {Math.round(weather.getMaxTemp() as number)}&deg;/
        {Math.round(weather.getMinTemp() as number)}&deg;
      </span>
    );
    precipitation = (
      <div className="flex align-center fs-2">
        <PrecipitationIcon
          style={{
            height: "1.2em",
            width: "auto",
            marginRight: ".3em",
          }}
        />
        {Math.round(weather.pop * 100)}%
      </div>
    );
  }

  const WeatherIcon = weather.getIcon();

  return (
    <div onClick={onClick}>
      <Card
        className={`dashboard__card ${active ? "dashboard__card--active" : ""}`}
      >
        <Card.Title
          align="center"
          className="dashboard__card-title dashboard__card-title--active"
        >
          {title}
        </Card.Title>
        <Card.Content className="dashboard__card-content">
          {WeatherIcon ? (
            <WeatherIcon style={{ height: "3em", width: "auto" }} />
          ) : null}
          {temperature}
          {precipitation}
          {feelsTemperature}
        </Card.Content>
      </Card>
    </div>
  );
}
