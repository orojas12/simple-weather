import "./currentWeather.css";

import { getIconUrl, getTime } from "../../utilities.js";

const CurrentWeather = function (props) {
	const { current } = props;

	if (!current) return null;

	const desc = `${current.weather[0].description
		.slice(0, 1)
		.toUpperCase()}${current.weather[0].description.slice(1)}`;

	const updateTime = getTime(current.dt);

	return (
		<section className="current-weather">
			<h1 className="current-weather__heading">Current Weather</h1>
			<figure className="current-weather__widget">
				<figcaption>
					<p className="widget__desc">{desc}</p>
					<p className="widget__temp">
						{Math.round(current.temp)}&deg;
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
};

export default CurrentWeather;
