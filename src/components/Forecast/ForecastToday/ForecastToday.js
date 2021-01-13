import "./forecastToday.css";
import cloudIcon from "../../../icons/cloud.svg";

const ForecastToday = function (props) {
	return (
		<div className="forecast-today">
			<div className="forecast-today__weather">
				<div className="temp">
					<p className="temp--hi">42&deg;</p>
					<p className="temp--lo">/27&deg;</p>
				</div>
				<figure className="weather-state">
					<img
						className="weather-state__icon"
						alt="weather icon"
						src={cloudIcon}
					/>
					<figcaption className="weather-state__desc">
						Light Clouds
					</figcaption>
				</figure>
			</div>
			<div className="forecast-today__weather-data">
				<div className="forecast-today__weather-data--1">
					<p>Sunrise</p>
					<p>Sunset</p>
					<p>Air Pressure</p>
					<p>Wind</p>
					<p>UV Index</p>
					<p>Humidity</p>
					<p>Dew Point</p>
					<p>Precipitaion</p>
				</div>
				<div className="forecast-today__weather-data--2">
					<p>5:03 am</p>
					<p>7:01 pm</p>
					<p>12</p>
					<p>NE 11 mph</p>
					<p>7%</p>
					<p>41%</p>
					<p>17</p>
					<p>20%</p>
				</div>
			</div>
		</div>
	);
};

export default ForecastToday;
