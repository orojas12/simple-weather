import "./forecast.css";
import React from "react";

import ForecastToday from "./ForecastToday/ForecastToday.js";
import ForecastHourly from "./ForecastHourly/ForecastHourly.js";
import ForecastDaily from "./ForecastDaily/ForecastDaily.js";

import { getDate, isEmptyObj } from "../../utilities.js";

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
		this.setState({ forecastType: element.innerText.toLowerCase() });
	};

	render() {
		const { forecast } = this.props;
		if (isEmptyObj(forecast)) return null;

		let forecastComponent;

		if (this.state.forecastType === "today")
			forecastComponent = (
				<ForecastToday forecast={this.props.forecast.daily[0]} />
			);

		if (this.state.forecastType === "hourly") {
			forecastComponent = [];
			for (let i = 0; i < 24; i++) {
				forecastComponent.push(
					<ForecastHourly forecast={forecast.hourly[i]} />
				);
			}
		}

		if (this.state.forecastType === "daily") {
			forecastComponent = this.props.forecast.daily.map(
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
