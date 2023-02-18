import React from "react";
import "./currentWeather.css";

import { getIconUrl } from "../../utilities";
import Weather from "../../weather/Weather";
import WeatherCurrent from "../../weather/WeatherCurrent";

interface CurrentWeatherProps {
  weather: WeatherCurrent;
  useCelsius: boolean;
  locale: string;
}

export default function CurrentWeather({
  weather,
  useCelsius,
}: CurrentWeatherProps) {
  if (!weather) return null;

  const desc = `${weather.conditions[0].description
    .slice(0, 1)
    .toUpperCase()}${weather.conditions[0].description.slice(1)}`;

  const updateTime = weather.dt.toLocaleTimeString();

  return (
    <section className="current-weather">
      <h1 className="current-weather__heading">Current Weather</h1>
      <figure className="current-weather__widget">
        <figcaption>
          <p className="widget__desc">{desc}</p>
          <p className="widget__temp">
            {weather.getTemp(useCelsius)}
            &deg;
          </p>
          <p className="widget__update-time">Updated {updateTime}</p>
        </figcaption>
        <img
          className="widget__weather-icon"
          alt="weather icon"
          src={getIconUrl(weather.conditions[0].icon)}
        />
      </figure>
    </section>
  );
}
