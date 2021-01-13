import "./forecast.css";
import React from "react";

import ForecastToday from "./ForecastToday/ForecastToday.js";
import ForecastHourly from "./ForecastHourly/ForecastHourly.js";
import ForecastDaily from "./ForecastDaily/ForecastDaily.js";

class Forecast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			forecast: "today",
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

	componentDidUpdate() {
		console.log(this.state);
	}

	render() {
		const forecastType = this.state.forecast;
		let forecastComponent;
		if (forecastType === "today") forecastComponent = <ForecastToday />;
		if (forecastType === "hourly") {
			forecastComponent = this.props.forecastHourly.map((forecast, i) => {
				return <ForecastHourly forecast={forecast} key={i} />;
			});
		}
		if (forecastType === "daily") {
			forecastComponent = this.props.forecastDaily.map((forecast, i) => {
				return <ForecastDaily forecast={forecast} key={i} />;
			});
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
