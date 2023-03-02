import { useLocation } from "./useLocation";
import useWeather, {
  WeatherContext,
  WeatherData,
  Weather,
  WeatherCurrent,
  WeatherDay,
  WeatherHour,
  WeatherAlert,
} from "./useWeather";
import usePlaceAutocomplete from "./usePlaceAutocomplete";
import useGeocode from "./useGeocode";

export type { WeatherData };
export {
  useLocation,
  useWeather,
  usePlaceAutocomplete,
  useGeocode,
  WeatherContext,
  Weather,
  WeatherCurrent,
  WeatherDay,
  WeatherHour,
  WeatherAlert,
};
