import useLocation, { Location, Coords, LocationContext } from "./useLocation";
import useWeather, {
  WeatherContext,
  WeatherData,
  Weather,
  WeatherCurrent,
  WeatherDay,
  WeatherHour,
  WeatherAlert,
} from "./useWeather";

export type { Location, Coords, WeatherData };
export {
  useLocation,
  LocationContext,
  useWeather,
  WeatherContext,
  Weather,
  WeatherCurrent,
  WeatherDay,
  WeatherHour,
  WeatherAlert,
};
