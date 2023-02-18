import React from "react";
import { WeatherData } from "hooks";
import { Card } from "components";
import WeatherDay from "src/hooks/useWeather/WeatherDay";
import { PrecipitationIcon } from "icons/weather";

interface DailyWeatherCardProps {
  key: any;
  weather: WeatherDay;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  active?: boolean;
}

export default function DailyWeatherCard({
  weather,
  onClick,
  active = false,
}: DailyWeatherCardProps) {
  const title = weather.isToday()
    ? "Today"
    : weather.dt.toLocaleDateString([], { weekday: "short" });

  const temperatures = (
    <span>
      {Math.round(weather.getMaxTemp() as number)}&deg;/
      {Math.round(weather.getMinTemp() as number)}&deg;
    </span>
  );

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
          {temperatures}
          <div className="flex align-center fs-2">
            <PrecipitationIcon
              style={{
                height: "1.2em",
                width: "auto",
                marginRight: ".3em",
              }}
            />
            {weather.pop * 100}%
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
