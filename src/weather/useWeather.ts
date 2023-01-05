import { useState, useEffect } from "react";
import { WEATHER_API_KEY } from "../config";
import WeatherCurrent from "./WeatherCurrent";
import WeatherDay from "./WeatherDay";
import WeatherHour from "./WeatherHour";

interface WeatherState {
  current: WeatherCurrent;
  hourly: WeatherHour[];
  daily: WeatherDay[];
}

export default function useWeather(latitude: number, longitude: number) {
  const [location, setLocation] = useState({ latitude, longitude });
  const [weather, setWeather] = useState<WeatherState>(null);

  useEffect(() => {
    async function fetchWeather(latitude: number, longitude: number) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude.toString()}&lon=${longitude.toString()}&exclude=minutely&units=imperial&appid=${WEATHER_API_KEY}`
        );
        if (!res.ok) throw new Error(`${res.status} Failed to fetch weather.`);
        const data = await res.json();
        setWeather({
          current: new WeatherCurrent(data.current),
          hourly: data.hourly.map((hourData: any) => new WeatherHour(hourData)),
          daily: data.daily.map((dayData: any) => new WeatherDay(dayData)),
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchWeather(location.latitude, location.longitude);
  }, [location]);

  return [weather, setLocation] as const;
}
