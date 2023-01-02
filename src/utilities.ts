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
export const reverseGeocode = async function (coords: string[]) {
  try {
    const res = await fetch(
      `https://geocode.xyz/?locate=${coords.join(
        ","
      )}&region=us&json=1&auth=691072423133569444264x114586`
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
 * Gets a short-style formatted time from a unix timestamp.
 * @param unixTime The time or date in unix time format.
 * @param locale The user's language and region.
 */
export const getTime = function (unixTime: number, locale: string) {
  const time = new Date(unixTime * 1000);
  const formattedTime = new Intl.DateTimeFormat(locale, {
    timeStyle: "short",
    hour12: true,
  }).format(time);
  return formattedTime;
};

/**
 * Gets a short-style formatted date from a unix timestamp
 * @param unixTime The time or date in unix time format.
 * @param locale The user's language and region.
 */
export const getDate = function (unixTime: number, locale: string) {
  const date = new Date(unixTime * 1000);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  }).format(date);
  return formattedDate;
};

/**
 * Get the cardinal direction for a wind degree.
 * @param degree The wind degree.
 * @returns {string} The cardinal direction.
 */
export const getWindDirection = function (degree: number) {
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
 * @param obj The object to check.
 * @returns {boolean} True or false.
 */
export const isEmptyObj = function (obj: any) {
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
export const capitalize = function (str: string) {
  const newStr = str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  return newStr;
};

/**
 * Converts a fahrenheit temperature to celsius.
 * @param temp Temperature in fahrenheit.
 * @returns {number} Temperature in celsius.
 */
export const toCelsius = function (temp: number) {
  return (temp - 32) * (5 / 9);
};
