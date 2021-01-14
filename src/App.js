import React from "react";
import "./App.css";

import Navigation from "./components/Navigation/Navigation.js";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.js";
import Forecast from "./components/Forecast/Forecast.js";

// Geocode API (USA ONLY) https://geocode.xyz/?locate={location}&region=us&json=1

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchInput: "",
			location: {
				city: null,
				state: null,
				coords: [],
			},
			weather: {
				tempScale: "fahrenheit",
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

	handleScaleSwitch = () => {
		this.setState((prevState) => {
			return {
				weather: {
					tempScale:
						prevState.weather.tempScale === "fahrenheit"
							? "celsius"
							: "fahrenheit",
					current: prevState.weather.current,
					hourly: prevState.weather.hourly,
					daily: prevState.weather.daily,
				},
			};
		});
	};

	handleSearchInput = (e) => {
		this.setState({
			searchInput: e.target.value,
		});
	};

	handleSearchInputSubmit = async (e) => {
		e.preventDefault();
		const inputText = e.target.querySelector(".search__input");
		const { latt, longt } = await this.getLocation(this.state.searchInput);
		this.setState({
			location: {
				coords: [latt, longt],
			},
		});
		inputText.value = "";
	};

	/**
	 * Calls the Geocode.xyz API to geocode a location string or coordinates.
	 * @param {string} locationStr The input string containing the location
	 * to geocode, such as a city or address.
	 */
	getLocation = async (locationStr) => {
		try {
			const res = await fetch(
				`https://geocode.xyz/?locate=${locationStr}&region=us&json=1`
			);
			const data = await res.json();

			return data;
		} catch (error) {
			console.error(error);
		}

		// this.setState({
		// 	location: {
		// 		city: data.standard.city,
		// 		coords: [data.latt, data.longt],
		// 	},
		// });
	};

	/**
	 * Gets the user's current coordinates.
	 */
	getCurrentCoords = async () => {
		try {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					this.setState({
						location: { coords: [latitude, longitude] },
					});
				},
				(error) => {
					throw new Error(error);
				}
			);
		} catch (error) {
			throw new Error(error);
		}
	};

	/**
	 * Updates the city and state to match the coordinates. Then gets the weather
	 * for the new location.
	 */
	updateLocationAndWeather = async () => {
		console.log(this.state);
		const [latitude, longitude] = this.state.location.coords;
		const data = await this.getLocation(`${latitude},${longitude}`);
		const newCity = data.city
			.split(" ")
			.map((str) => `${str.slice(0, 1)}${str.slice(1).toLowerCase()}`)
			.join(" ");

		const newState = data.state;

		this.setState((prevState) => {
			return {
				location: {
					coords: prevState.location.coords,
					city: newCity,
					state: newState,
				},
			};
		});
	};

	// If no change in coordinates, city/state and weather will NOT update.
	componentDidUpdate(_, prevState) {
		if (
			prevState.location.coords.toString() ===
			this.state.location.coords.toString()
		)
			return;
		this.updateLocationAndWeather();
	}

	componentDidMount() {
		this.getCurrentCoords();
	}

	render() {
		const { city, state } = this.state.location;
		return (
			<div className="App">
				<Navigation
					onSearchInputChange={this.handleSearchInput}
					onSearchInputSubmit={this.handleSearchInputSubmit}
					onScaleSwitch={this.handleScaleSwitch}
					location={`${city}, ${state}`}
					tempScale={this.state.weather.tempScale}
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
