import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "@/config";
import { useLocation } from "@/features/locations";
import { ContextNotFoundError } from "@//context/error";
import {
  WeatherCurrent,
  WeatherDay,
  WeatherHour,
  WeatherAlert,
} from "../lib/weather";

export interface IWeather {
  current: WeatherCurrent;
  hourly: WeatherHour[];
  daily: WeatherDay[];
  alerts: WeatherAlert[];
}

interface IWeatherContext {
  data: IWeather | null;
  update: () => void;
  isLoading: boolean;
  error: Error | null;
}

export const WeatherContext = createContext<IWeatherContext | null>(null);

export function WeatherProvider(props: { children?: React.ReactNode }) {
  const location = useLocation();

  if (!location) throw new ContextNotFoundError("LocationContext");

  const [weather, setWeather] = useState<IWeather | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { lat, lng } = location.data.activeLocation;

  useEffect(() => {
    fetchWeather(lat, lng);
  }, [lat, lng]);

  async function fetchWeather(lat: number, lng: number) {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/weather?lat=${lat}&lng=${lng}`);
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
    } catch (err: unknown) {
      setError(err as Error);
    }
  }

  /**
   * Refreshes weather data for the active location.
   */
  function update() {
    fetchWeather(lat, lng);
  }

  return (
    <WeatherContext.Provider
      value={{ data: weather, update, isLoading, error }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
}
