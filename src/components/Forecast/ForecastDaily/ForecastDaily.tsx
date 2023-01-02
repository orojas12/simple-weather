import React from "react";
import "./forecastDaily.css";
import dropIcon from "../../../icons/drop.svg";
import windIcon from "../../../icons/wind.svg";

import { getDate, capitalize, getIconUrl, toCelsius } from "../../../utilities";

// {
//   date: "01/10",
//   temp: 42,
//   weatherState: "cloudy",
//   precip: 0.2,
//   wind: {
//     direction: "NE",
//     speed: "11 mph",
//   },
// },

interface ForecastDailyProps {
  forecast: any;
  tempScale: string;
  locale: string;
}

const ForecastDaily = function (props: ForecastDailyProps) {
  return (
    <div className="forecast-daily">
      <p className="forecast-daily__date">
        {getDate(props.forecast.dt, props.locale)}
      </p>
      <p className="forecast-daily__temp">
        {Math.round(
          props.tempScale === "celsius"
            ? toCelsius(props.forecast.temp.max)
            : props.forecast.temp.max
        )}
        &deg;/
        {Math.round(
          props.tempScale === "celsius"
            ? toCelsius(props.forecast.temp.min)
            : props.forecast.temp.min
        )}
        &deg;
      </p>
      <img className="daily-drop-icon" alt="drop icon" src={dropIcon} />
      <p className="forecast-daily__precip">
        {Math.round(props.forecast.pop * 100)}%
      </p>
      <img className="daily-wind-icon" alt="wind icon" src={windIcon} />
      <p className="forecast-daily__wind">
        {Math.round(props.forecast.wind_speed)} mph
      </p>
      <p className="forecast-daily__desc">
        {capitalize(props.forecast.weather[0].description)}
      </p>
      <img
        className="forecast-daily__icon"
        alt="cloud icon"
        src={getIconUrl(props.forecast.weather[0].icon)}
      />
    </div>
  );
};

export default ForecastDaily;
