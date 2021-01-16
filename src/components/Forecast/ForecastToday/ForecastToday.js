import "./forecastToday.css";
import cloudIcon from "../../../icons/cloud.svg";

import {
	getDate,
	getTime,
	getWindDirection,
	getIconUrl,
} from "../../../utilities.js";

const ForecastToday = function ({ forecast }) {
	return (
		<div className="forecast-today">
			<div className="forecast-today__weather">
				<div className="temp">
					<p className="temp--hi">
						{Math.round(forecast.temp.max)}&deg;
					</p>
					<p className="temp--lo">
						/{Math.round(forecast.temp.min)}&deg;
					</p>
				</div>
				<figure className="weather-state">
					<img
						className="weather-state__icon"
						alt="weather icon"
						src={getIconUrl(forecast.weather[0].icon)}
					/>
					<figcaption className="weather-state__desc">
						{forecast.weather[0].description
							.slice(0, 1)
							.toUpperCase() +
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
					<p>{Math.round(forecast.dew_point)}&deg;</p>
					<p>{forecast.pop}%</p>
				</div>
			</div>
		</div>
	);
};

export default ForecastToday;
