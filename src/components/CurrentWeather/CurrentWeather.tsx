import React from "react";
import "./currentWeather.css";

import { getIconUrl, getTime, toCelsius } from "../../utilities";
import Weather from "../../weather/Weather";

interface CurrentWeatherProps {
  weather: Weather;
  tempScale: string;
  locale: string;
}

export default function CurrentWeather({
  weather,
  tempScale,
  locale,
}: CurrentWeatherProps) {
  if (!weather) return null;
  const { current } = weather;

  const desc = `${current.weather[0].description
    .slice(0, 1)
    .toUpperCase()}${current.weather[0].description.slice(1)}`;

  const updateTime = getTime(current.dt, locale);

  return (
    <section className="current-weather">
      <h1 className="current-weather__heading">Current Weather</h1>
      <figure className="current-weather__widget">
        <figcaption>
          <p className="widget__desc">{desc}</p>
          <p className="widget__temp">
            {Math.round(
              tempScale === "celsius" ? toCelsius(current.temp) : current.temp
            )}
            &deg;
          </p>
          <p className="widget__update-time">Updated {updateTime}</p>
        </figcaption>
        <img
          className="widget__weather-icon"
          alt="weather icon"
          src={getIconUrl(current.weather[0].icon)}
        />
      </figure>
    </section>
  );
}
