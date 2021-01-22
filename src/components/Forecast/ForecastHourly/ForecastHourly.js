import "./forecastHourly.css";
import dropIcon from "../../../icons/drop.svg";
import windIcon from "../../../icons/wind.svg";

import {
	getTime,
	capitalize,
	getIconUrl,
	toCelsius,
} from "../../../utilities.js";

const ForecastHourly = function (props) {
	const { forecast } = props;

	return (
		<div className="forecast-hourly">
			<p className="forecast-hourly__time">{getTime(forecast.dt)}</p>
			<p className="forecast-hourly__temp">
				{Math.round(
					props.tempScale === "celsius"
						? toCelsius(forecast.temp)
						: forecast.temp
				)}
				&deg;
			</p>
			<img className="drop-icon" alt="drop icon" src={dropIcon} />
			<p className="forecast-hourly__precip">
				{Math.round(forecast.pop * 100)}%
			</p>
			<img className="wind-icon" alt="wind icon" src={windIcon} />
			<p className="forecast-hourly__wind">
				{Math.round(forecast.wind_speed)} mph
			</p>
			<p className="forecast-hourly__desc">
				{capitalize(forecast.weather[0].description)}
			</p>
			<img
				className="forecast-hourly__icon"
				alt="cloud icon"
				src={getIconUrl(forecast.weather[0].icon)}
			/>
		</div>
	);
};

export default ForecastHourly;
