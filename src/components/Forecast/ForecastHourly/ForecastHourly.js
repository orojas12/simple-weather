import "./forecastHourly.css";
import dropIcon from "../../../icons/drop.svg";
import windIcon from "../../../icons/wind.svg";
import cloudIcon from "../../../icons/cloud.svg";

// {
//   time: "4pm",
//   temp: 42,
//   weatherState: "cloudy",
//   precip: 0.2,
//   wind: {
//     direction: "NE",
//     speed: "11 mph",
//   },
// },

const ForecastHourly = function (props) {
	return (
		<div className="forecast-hourly">
			<p className="forecast-hourly__time">{props.forecast.time}</p>
			<p className="forecast-hourly__temp">{props.forecast.temp}&deg;</p>
			<img className="drop-icon" alt="drop icon" src={dropIcon} />
			<p className="forecast-hourly__precip">
				{props.forecast.precip * 100}%
			</p>
			<img className="wind-icon" alt="wind icon" src={windIcon} />
			<p className="forecast-hourly__wind">{props.forecast.wind.speed}</p>
			<p className="forecast-hourly__desc">Cloudy</p>
			<img
				className="forecast-hourly__icon"
				alt="cloud icon"
				src={cloudIcon}
			/>
		</div>
	);
};

export default ForecastHourly;
