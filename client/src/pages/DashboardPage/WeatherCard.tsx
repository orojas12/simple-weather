import React from "react";
import { Card } from "@/components";
import { PrecipitationIcon } from "@/features/weather/assets/icons";
import { WeatherCurrent, WeatherDay } from "@/lib/weather";

interface WeatherCardProps {
  units: string;
  weather?: WeatherDay | WeatherCurrent;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  active?: boolean;
}

export default function WeatherCard({
  units,
  weather,
  onClick,
  active = false,
}: WeatherCardProps) {
  if (!weather)
    return (
      <Card
        loading={true}
        className={`dashboard__day ${active ? "dashboard__day--active" : ""}`}
      >
        <Card.Title
          align="center"
          className="dashboard__day-title dashboard__day-title--active"
        >
          Title
        </Card.Title>
        <Card.Content className="dashboard__day-content">
          <div style={{ height: "3em", width: "3em" }}></div>
          0&deg;
          <div className="fs-2">0</div>
        </Card.Content>
      </Card>
    );
  let title: string;
  let temperature: React.ReactNode;
  let precipitation: React.ReactNode;
  let feelsTemperature: React.ReactNode;

  if (weather instanceof WeatherCurrent) {
    title = "Current";
    temperature = <span>{Math.round(weather.getTemp(units))}&deg;</span>;
    feelsTemperature = (
      <span className="fs-2">
        Feels {Math.round(weather.getFeelsLikeTemp(units))}&deg;
      </span>
    );
  } else {
    title = weather.isToday()
      ? "Today"
      : weather.dt.toLocaleDateString([], { day: "2-digit", weekday: "short" });
    temperature = (
      <span>
        {Math.round(weather.getMaxTemp(units) as number)}&deg;/
        {Math.round(weather.getMinTemp(units) as number)}&deg;
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
        className={`dashboard__day ${active ? "dashboard__day--active" : ""}`}
      >
        <Card.Title
          align="center"
          className="dashboard__day-title dashboard__day-title--active"
        >
          {title}
        </Card.Title>
        <Card.Content className="dashboard__day-content">
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
