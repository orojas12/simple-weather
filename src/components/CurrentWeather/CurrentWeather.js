import "./currentWeather.css";
import cloudIcon from "../../icons/cloud.svg";

const CurrentWeather = function (props) {
	return (
		<section className="current-weather">
			<h1 className="current-weather__heading">Current Weather</h1>
			<figure className="current-weather__widget">
				<figcaption>
					<p className="widget__desc">Cloudy</p>
					<p className="widget__temp">42&deg;</p>
					<p className="widget__update-time">Updated 4:50 pm</p>
				</figcaption>
				<img
					className="widget__weather-icon"
					alt="weather icon"
					src={cloudIcon}
				/>
			</figure>
		</section>
	);
};

export default CurrentWeather;
