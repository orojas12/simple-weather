import React from "react";
import "./forecastToday.css";

import {
  getTime,
  getWindDirection,
  getIconUrl,
  toCelsius,
} from "../../../utilities.js";

const ForecastToday = function ({ forecast, tempScale }) {
  return (
    <div className="forecast-today">
      <div className="forecast-today__weather">
        <div className="temp">
          <p className="temp--hi">
            {Math.round(
              tempScale === "celsius"
                ? toCelsius(forecast.temp.max)
                : forecast.temp.max
            )}
            &deg;
          </p>
          <p className="temp--lo">
            /
            {Math.round(
              tempScale === "celsius"
                ? toCelsius(forecast.temp.min)
                : forecast.temp.min
            )}
            &deg;
          </p>
        </div>
        <figure className="weather-state">
          <img
            className="weather-state__icon"
            alt="weather icon"
            src={getIconUrl(forecast.weather[0].icon)}
          />
          <figcaption className="weather-state__desc">
            {forecast.weather[0].description.slice(0, 1).toUpperCase() +
              forecast.weather[0].description.slice(1)}
          </figcaption>
        </figure>
      </div>
      <div className="forecast-today__weather-data">
        <div className="forecast-today__weather-data--1">
          <p>Sunrise</p>
          <p>Sunset</p>
          <p>Wind</p>
          <p>UV Index</p>
          <p>Air Pressure</p>
          <p>Humidity</p>
          <p>Dew Point</p>
          <p>Precipitaion</p>
        </div>
        <div className="forecast-today__weather-data--2">
          <p>{getTime(forecast.sunrise)}</p>
          <p>{getTime(forecast.sunset)}</p>
          <p>
            {`${getWindDirection(forecast.wind_deg)} ${Math.round(
              forecast.wind_speed
            )} mph`}
          </p>
          <p>{forecast.uvi}</p>
          <p>{forecast.pressure} hPa</p>
          <p>{forecast.humidity}%</p>
          <p>
            {Math.round(
              tempScale === "celsius"
                ? toCelsius(forecast.dew_point)
                : forecast.dew_point
            )}
            &deg;
          </p>
          <p>{Math.round(forecast.pop * 100)}%</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastToday;
