import { useState, useEffect, createContext } from "react";
import WeatherCurrent from "./WeatherCurrent";
import WeatherDay from "./WeatherDay";
import WeatherHour from "./WeatherHour";
import json from "../../response.json";

export interface WeatherData {
  current: WeatherCurrent;
  hourly: WeatherHour[];
  daily: WeatherDay[];
}

export const WeatherContext = createContext<WeatherData | null>(null);

export default function useWeather(latitude: number, longitude: number) {
  const [coords, setCoords] = useState({ latitude, longitude });
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather(latitude: number, longitude: number) {
      try {
        // const res = await fetch("./src/response.json");
        // if (!res.ok) throw new Error(`${res.status} Failed to fetch weather.`);

        const data = json;
        setWeather({
          current: new WeatherCurrent(data.current),
          hourly: data.hourly.map((hourData: any) => new WeatherHour(hourData)),
          daily: data.daily.map((dayData: any) => new WeatherDay(dayData)),
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchWeather(coords.latitude, coords.longitude);
  }, [coords]);

  const updateWeather = () => {
    setCoords((prevCoords) => ({ ...prevCoords }));
  };

  return { weather, updateWeather, setCoords };
}
