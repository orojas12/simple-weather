import { useState, useEffect, createContext } from "react";
import WeatherCurrent from "./WeatherCurrent";
import WeatherDay from "./WeatherDay";
import WeatherHour from "./WeatherHour";
import json from "../../response.json";
import WeatherAlert from "./WeatherAlert";

export interface WeatherData {
  current: WeatherCurrent;
  hourly: WeatherHour[];
  daily: WeatherDay[];
  alerts: WeatherAlert[];
}

export const WeatherContext = createContext<WeatherData | null>(null);

export default function useWeather(lat: number, lng: number) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchWeather(lat, lng);
  }, [lat, lng]);

  async function fetchWeather(lat: number, lng: number) {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lng=${lng}`);
      if (!res.ok) throw new Error(`${res.status} Failed to fetch weather.`);

      const data = await res.json();
      setWeather({
        current: new WeatherCurrent(data.current),
        hourly: data.hourly.map((hourData: any) => new WeatherHour(hourData)),
        daily: data.daily.map((dayData: any) => new WeatherDay(dayData)),
        alerts: data.alerts?.map((data: any) => new WeatherAlert(data)),
      });
    } catch (error) {
      console.error(error);
    }
  }

  function update() {
    fetchWeather(lat, lng);
  }

  return { weather, update };
}
