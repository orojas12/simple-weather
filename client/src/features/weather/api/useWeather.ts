import { useContext } from "react";
import { ContextNotFoundError } from "@/context";
import { WeatherContext } from "../context";

export default function useWeather() {
  const weather = useContext(WeatherContext);

  if (!weather) throw new ContextNotFoundError("WeatherContext");

  return weather;
}
