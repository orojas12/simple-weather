import { WEATHER_API_KEY, GEO_API_KEY } from "./config";

/**
 * Calls the OpenWeatheMap API and returns weather data for the location.
 * @param lat Latitude coordinate.
 * @param lon Longitude coordinate.
 * @returns All weather data for the specified location including alerts,
 * current, daily, and hourly forecast.
 */
export const getWeather = async function (lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat.toString()}&lon=${lon.toString()}&exclude=minutely&units=imperial&appid=${WEATHER_API_KEY}`
    );

    if (!res.ok) throw new Error(`${res.status} Could not fetch weather.`);

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the url for a weather icon in the OpenWeatherMap API.
 * @param icon The icon name.
 * @returns Weather icon url.
 */
export const getIconUrl = function (icon: string) {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

/**
 * Calls the Geocode API to perform forward geocoding. Only works with USA locations.
 * @param location A human-readable address or name of a place.
 * @returns Location data containing coordinates.
 */
export const geocode = async function (location: string) {
  try {
    const res = await fetch(
      `https://geocode.xyz/?locate=${location}&region=us&json=1&auth=${GEO_API_KEY}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${res.status}: ${data.error.message}`);
    if (data.error)
      throw new Error(`${data.error.code} ${data.error.description}`);

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Calls the Geocode API to perform reverse geocoding. Only works with USA locations.
 * @param coords An array of coordinates.
 * @returns Location data containing address.
 */
export const reverseGeocode = async function (coords: number[]) {
  try {
    const res = await fetch(
      `https://geocode.xyz/?locate=${coords
        .map((coord) => coord.toString())
        .join(",")}&region=us&json=1&auth=691072423133569444264x114586`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${res.status}: ${data.error.message}`);
    if (data.error)
      throw new Error(`${data.error.code} ${data.error.description}`);

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} str The string to capitalize.
 * @returns {string} New string with capitalized words.
 */
export const capitalize = function (str: string) {
  const newStr = str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  return newStr;
};
