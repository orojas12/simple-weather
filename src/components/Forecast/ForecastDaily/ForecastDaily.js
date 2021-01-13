import "./forecastDaily.css";
import dropIcon from "../../../icons/drop.svg";
import windIcon from "../../../icons/wind.svg";
import cloudIcon from "../../../icons/cloud.svg";

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
	return (
		<div className="forecast-daily">
			<p className="forecast-daily__date">{props.forecast.date}</p>
			<p className="forecast-daily__temp">
				{props.forecast.temp_hi}/{props.forecast.temp_lo}&deg;
			</p>
			<img className="drop-icon" alt="drop icon" src={dropIcon} />
			<p className="forecast-daily__precip">
				{props.forecast.precip * 100}%
			</p>
			<img className="wind-icon" alt="wind icon" src={windIcon} />
			<p className="forecast-daily__wind">{props.forecast.wind.speed}</p>
			<p className="forecast-daily__desc">Cloudy</p>
			<img
				className="forecast-daily__icon"
				alt="cloud icon"
				src={cloudIcon}
			/>
		</div>
	);
};

export default ForecastDaily;
