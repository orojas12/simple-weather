import { WEATHER_API_KEY } from "../config";

export interface GeocodeResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

/**
 * Calls the Geocode API to perform direct geocoding on a string.
 * @param location A human-readable address or name of a place
 * @returns Possible locations
 */
export const geocode = async function (location: string) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}}&appid=${WEATHER_API_KEY}`
    );
    if (!res.ok) throw new Error(`Failed to fetch geocode API (${res.status})`);
    const results: GeocodeResult[] = await res.json();
    return results;
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * Calls the Geocode API to perform reverse geocoding on a pair of coordinates.
 * @param lat Latitude coordinate
 * @param lon Longitude coordinate
 * @returns Geocode result
 */
export const reverseGeocode = async function (lat: number, lon: number) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat.toString()}&lon=${lon.toString()}&limit=1&appid=${WEATHER_API_KEY}`
    );
    if (!res.ok) throw new Error(`Failed to fetch geocode API (${res.status})`);
    const result: GeocodeResult = await res.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
};
