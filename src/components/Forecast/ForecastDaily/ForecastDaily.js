import React from "react";
import "./forecastDaily.css";
import dropIcon from "../../../icons/drop.svg";
import windIcon from "../../../icons/wind.svg";

import {
  getDate,
  capitalize,
  getIconUrl,
  toCelsius,
} from "../../../utilities.js";

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

const ForecastDaily = function (props) {
  const { forecast } = props;
  return (
    // <div className="forecast-daily">
    // 	<p className="forecast-daily__date">{props.forecast.date}</p>
    // 	<p className="forecast-daily__temp">
    // 		{props.forecast.temp_hi}/{props.forecast.temp_lo}&deg;
    // 	</p>
    // 	<img className="drop-icon" alt="drop icon" src={dropIcon} />
    // 	<p className="forecast-daily__precip">
    // 		{props.forecast.precip * 100}%
    // 	</p>
    // 	<img className="wind-icon" alt="wind icon" src={windIcon} />
    // 	<p className="forecast-daily__wind">{props.forecast.wind.speed}</p>
    // 	<p className="forecast-daily__desc">Cloudy</p>
    // 	<img
    // 		className="forecast-daily__icon"
    // 		alt="cloud icon"
    // 		src={cloudIcon}
    // />

    <div className="forecast-daily">
      <p className="forecast-daily__date">{getDate(forecast.dt)}</p>
      <p className="forecast-daily__temp">
        {Math.round(
          props.tempScale === "celsius"
            ? toCelsius(forecast.temp.max)
            : forecast.temp.max
        )}
        &deg;/
        {Math.round(
          props.tempScale === "celsius"
            ? toCelsius(forecast.temp.min)
            : forecast.temp.min
        )}
        &deg;
      </p>
      <img className="daily-drop-icon" alt="drop icon" src={dropIcon} />
      <p className="forecast-daily__precip">
        {Math.round(forecast.pop * 100)}%
      </p>
      <img className="daily-wind-icon" alt="wind icon" src={windIcon} />
      <p className="forecast-daily__wind">
        {Math.round(forecast.wind_speed)} mph
      </p>
      <p className="forecast-daily__desc">
        {capitalize(forecast.weather[0].description)}
      </p>
      <img
        className="forecast-daily__icon"
        alt="cloud icon"
        src={getIconUrl(forecast.weather[0].icon)}
      />
    </div>
  );
};

export default ForecastDaily;
