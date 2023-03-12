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

export const WeatherContext = createContext<ReturnType<typeof useWeather>>({
  weather: null,
  update: () => {},
  isLoading: true,
  error: null,
});

export default function useWeather(lat: number, lng: number) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchWeather(lat, lng);
  }, [lat, lng]);

  async function fetchWeather(lat: number, lng: number) {
    setIsLoading(true);

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
      setIsLoading(false);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err);
    }
  }

  function update() {
    fetchWeather(lat, lng);
  }

  return { weather, update, isLoading, error };
}
