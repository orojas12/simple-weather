import { useContext } from "react";
import { ContextNotFoundError, WeatherContext } from "context";

export default function useLocation() {
  const weather = useContext(WeatherContext);

  if (!weather) throw new ContextNotFoundError("WeatherContext");

  return weather;
}
