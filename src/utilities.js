import { API_KEY } from "./config.js";

/**
 * Calls the OpenWeatheMap API and returns weather data for the location.
 * @param {string} lat Latitude coordinate.
 * @param {string} lon Longitude coordinate.
 * @returns {object} All weather data for the specified location including alerts,
 * current, daily, and hourly forecast.
 */
export const getWeather = async function (lat, lon) {
	try {
		const json = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial&appid=${API_KEY}`
		);
		const data = await json.json();
		return data;
	} catch (error) {
		throw error;
	}
};

/**
 * Gets the url for a weather icon in the OpenWeatherMap API.
 * @param {string} icon The icon name.
 * @returns {string} Weather icon url.
 */
export const getIconUrl = function (icon) {
	return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

/**
 * Calls the Geocode API to perform forward geocoding. Only works with USA locations.
 * @param {string} location A human-readable address or name of a place.
 * @returns {object} Location data containing coordinates.
 */
export const geocode = async function (location) {
	try {
		const json = await fetch(
			`https://geocode.xyz/?locate=${location}&region=us&json=1`
		);
		const data = await json.json();
		return data;
	} catch (error) {
		throw error;
	}
};

/**
 * Calls the Geocode API to perform reverse geocoding. Only works with USA locations.
 * @param {string[]} coords An array of coordinates.
 * @returns {object} Location data containing address.
 */
export const reverseGeocode = async function (coords) {
	try {
		const json = await fetch(
			`https://geocode.xyz/?locate=${coords.join(",")}&region=us&json=1`
		);
		const data = await json.json();
		return data;
	} catch (error) {
		throw error;
	}
};

/**
 * Gets a short-style formatted time from a unix timestamp.
 * @param {number} unixTime The time or date in unix time format.
 * @param {string} locale The user's language and region.
 */
export const getTime = function (unixTime, locale) {
	const time = new Date(unixTime * 1000);
	const formattedTime = new Intl.DateTimeFormat(locale, {
		timeStyle: "short",
		hour12: true,
	}).format(time);
	return formattedTime;
};

/**
 * Gets a short-style formatted date from a unix timestamp
 * @param {number} unixTime The time or date in unix time format.
 * @param {string} locale The user's language and region.
 */
export const getDate = function (unixTime, locale) {
	const date = new Date(unixTime * 1000);
	const formattedDate = new Intl.DateTimeFormat(locale, {
		dateStyle: "short",
	}).format(date);
	return formattedDate;
};

/**
 * Get the cardinal direction for a wind degree.
 * @param {number} degree The wind degree.
 * @returns {string} The cardinal direction.
 */
export const getWindDirection = function (degree) {
	const directions = new Map([
		[0, "N"],
		[1, "NE"],
		[2, "E"],
		[3, "SE"],
		[4, "S"],
		[5, "SW"],
		[6, "W"],
		[7, "NW"],
		[8, "N"],
	]);
	const interval = 45; // 8 directions from 360 degrees (360 / 8)
	const key = Math.round(degree / interval);
	return directions.get(key);
};

/**
 * Checks if an object is empty by checking if it has any properties.
 * @param {object} obj The object to check.
 * @returns {boolean} True or false.
 */
export const isEmptyObj = function (obj) {
	for (const prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
};

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} str The string to capitalize.
 * @returns {string} New string with capitalized words.
 */
export const capitalize = function (str) {
	const newStr = str
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(" ");
	return newStr;
};
