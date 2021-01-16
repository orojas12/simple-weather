import "./forecast.css";
import React from "react";

import ForecastToday from "./ForecastToday/ForecastToday.js";
import ForecastHourly from "./ForecastHourly/ForecastHourly.js";
import ForecastDaily from "./ForecastDaily/ForecastDaily.js";

import { getDate } from "../../utilities.js";

class Forecast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			forecastType: "today",
		};
	}

	handleTabClick = (e) => {
		const element = e.target;

		if (!element.classList.contains("forecast__tab")) return;

		const parent = element.closest("ul");

		parent
			.querySelectorAll("h1")
			.forEach((element) =>
				element.classList.remove("forecast__tab--active")
			);
		element.classList.add("forecast__tab--active");
		this.setState({ forecast: element.innerText.toLowerCase() });
	};

	render() {
		console.log(this.props.forecast);
		if (!this.props.forecast.daily) return null;

		let forecastComponent;
		if (this.state.forecastType === "today")
			forecastComponent = (
				<ForecastToday forecast={this.props.forecast.daily[0]} />
			);
		if (this.state.forecastType === "hourly") {
			forecastComponent = this.props.forecast.hourly.map(
				(forecastObj, i) => {
					return <ForecastHourly forecast={forecastObj} key={i} />;
				}
			);
		}
		if (this.state.forecastType === "daily") {
			forecastComponent = this.props.forecastDaily.map(
				(forecastObj, i) => {
					return <ForecastDaily forecast={forecastObj} key={i} />;
				}
			);
		}

		return (
			<React.Fragment>
				<ul
					onClick={this.handleTabClick}
					className="forecast__navigation"
				>
					<li>
						<h1 className="forecast__tab forecast__tab--active">
							Today
						</h1>
					</li>
					<li>
						<h1 className="forecast__tab">Hourly</h1>
					</li>
					<li>
						<h1 className="forecast__tab">Daily</h1>
					</li>
				</ul>
				<div className="forecast">{forecastComponent}</div>
			</React.Fragment>
		);
	}
}

export default Forecast;
