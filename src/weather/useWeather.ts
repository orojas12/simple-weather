import { useState, useEffect } from "react";
import Weather from "./Weather";

export default function useWeather(lat: number, lon: number) {
  const [location, setLocation] = useState({ lat, lon });
  const [weather, setWeather] = useState<Weather>(null);

  useEffect(() => {
    async function fetchWeather(lat: number, lon: number) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat.toString()}&lon=${lon.toString()}&exclude=minutely&units=imperial&appid=${WEATHER_API_KEY}`
        );
        if (!res.ok) throw new Error(`${res.status} Could not fetch weather.`);
        const data = await res.json();
        setWeather(new Weather(data));
      } catch (error) {
        console.error(error);
      }
    }

    fetchWeather(location.lat, location.lon);
  }, [location]);

  return [weather, setLocation];
}
