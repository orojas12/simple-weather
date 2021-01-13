import React from "react";
import "./App.css";

import Navigation from "./components/Navigation/Navigation.js";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.js";
import Forecast from "./components/Forecast/Forecast.js";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchInput: "",
			location: {
				city: "El Paso",
				state: "TX",
			},
			weather: {
				current: {
					temp: 42,
					weatherState: "cloudy",
				},
				hourly: [
					{
						time: "4pm",
						temp: 42,
						weatherState: "cloudy",
						precip: 0.2,
						wind: {
							direction: "NE",
							speed: "11 mph",
						},
					},
					{
						time: "5pm",
						temp: 40,
						weatherState: "cloudy",
						precip: 0.2,
						wind: {
							direction: "NE",
							speed: "11 mph",
						},
					},
					{
						time: "6pm",
						temp: 37,
						weatherState: "cloudy",
						precip: 0.2,
						wind: {
							direction: "NE",
							speed: "11 mph",
						},
					},
					{
						time: "7pm",
						temp: 34,
						weatherState: "cloudy",
						precip: 0.2,
						wind: {
							direction: "NE",
							speed: "11 mph",
						},
					},
					{
						time: "8pm",
						temp: 32,
						weatherState: "cloudy",
						precip: 0.2,
						wind: {
							direction: "NE",
							speed: "11 mph",
						},
					},
				],
				daily: [
					{
						date: "01/10",
						temp_hi: 47,
						temp_lo: 32,
						weatherState: "clear",
						precip: 0,
						wind: {
							direction: "W",
							speed: "3 mph",
						},
					},
					{
						date: "01/11",
						temp_hi: 35,
						temp_lo: 22,
						weatherState: "snow",
						precip: 0.9,
						wind: {
							direction: "W",
							speed: "8 mph",
						},
					},
					{
						date: "01/11",
						temp_hi: 41,
						temp_lo: 25,
						weatherState: "cloudy",
						precip: 0.2,
						wind: {
							direction: "E",
							speed: "2 mph",
						},
					},
					{
						date: "01/11",
						temp_hi: 38,
						temp_lo: 23,
						weatherState: "clear",
						precip: 0,
						wind: {
							direction: "S",
							speed: "4 mph",
						},
					},
					{
						date: "01/11",
						temp_hi: 33,
						temp_lo: 19,
						weatherState: "clear",
						precip: 0,
						wind: {
							direction: "s",
							speed: "14 mph",
						},
					},
				],
			},
		};
	}

	handleSearchInput = (e) => {
		this.setState({
			searchInput: e.target.value,
		});
	};

	handleSearchInputSubmit = (e) => {
		e.preventDefault();
		const [city, state] = this.state.searchInput.split(",");
		this.setState({ location: { city: city, state: state } });
	};

	render() {
		const { city, state } = this.state.location;
		return (
			<div className="App">
				<Navigation
					onSearchInputChange={this.handleSearchInput}
					onSearchInputSubmit={this.handleSearchInputSubmit}
					location={`${city}, ${state}`}
				/>
				<CurrentWeather />
				<Forecast
					forecastHourly={this.state.weather.hourly}
					forecastDaily={this.state.weather.daily}
				/>
			</div>
		);
	}
}

export default App;
