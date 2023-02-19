import {
  SunnyIcon,
  CloudyIcon,
  PartlyCloudyIcon,
  RainyIcon,
  SnowIcon,
  HazeIcon,
  ThunderstormIcon,
  TornadoIcon,
} from "icons/weather";

const cardinalDirections = new Map([
  [0, "N"],
  [1, "NE"],
  [2, "E"],
  [3, "SE"],
  [4, "S"],
  [5, "SW"],
  [6, "W"],
  [7, "NW"],
  [8, "N"],
]);

const weatherIcons = new Map([
  [200, ThunderstormIcon],
  [201, ThunderstormIcon],
  [202, ThunderstormIcon],
  [210, ThunderstormIcon],
  [211, ThunderstormIcon],
  [212, ThunderstormIcon],
  [221, ThunderstormIcon],
  [230, ThunderstormIcon],
  [231, ThunderstormIcon],
  [232, ThunderstormIcon],
  [300, RainyIcon],
  [301, RainyIcon],
  [302, RainyIcon],
  [310, RainyIcon],
  [311, RainyIcon],
  [312, RainyIcon],
  [313, RainyIcon],
  [314, RainyIcon],
  [321, RainyIcon],
  [500, RainyIcon],
  [501, RainyIcon],
  [502, RainyIcon],
  [503, RainyIcon],
  [504, RainyIcon],
  [511, RainyIcon],
  [520, RainyIcon],
  [521, RainyIcon],
  [522, RainyIcon],
  [531, RainyIcon],
  [600, SnowIcon],
  [601, SnowIcon],
  [602, SnowIcon],
  [611, SnowIcon],
  [612, SnowIcon],
  [613, SnowIcon],
  [615, SnowIcon],
  [616, SnowIcon],
  [620, SnowIcon],
  [621, SnowIcon],
  [622, SnowIcon],
  [701, HazeIcon],
  [711, HazeIcon],
  [721, HazeIcon],
  [731, HazeIcon],
  [741, HazeIcon],
  [751, HazeIcon],
  [761, HazeIcon],
  [762, HazeIcon],
  [771, HazeIcon],
  [781, TornadoIcon],
  [800, SunnyIcon],
  [801, PartlyCloudyIcon],
  [802, PartlyCloudyIcon],
  [803, CloudyIcon],
  [804, CloudyIcon],
]);

export default abstract class Weather {
  readonly dt: Date;
  readonly temp:
    | number
    | {
        morn: number;
        day: number;
        eve: number;
        night: number;
        min: number;
        max: number;
      };
  readonly feels_like:
    | number
    | {
        morn: number;
        day: number;
        eve: number;
        night: number;
      };
  readonly pressure: number;
  readonly humidity: number;
  readonly dew_point: number;
  readonly uvi: number;
  readonly clouds: number;
  readonly visibility: number;
  readonly wind_speed: number;
  readonly wind_deg: number;
  readonly wind_gust?: number;
  readonly conditions: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  readonly rain?:
    | number
    | {
        past_hour: number;
      };
  readonly snow?:
    | number
    | {
        past_hour: number;
      };

  constructor(data: any) {
    this.dt = new Date(data.dt * 1000);
    this.temp = data.temp;
    this.feels_like = data.feels_like;
    this.pressure = data.pressure;
    this.humidity = data.humidity;
    this.dew_point = data.dew_point;
    this.uvi = data.uvi;
    this.clouds = data.clouds;
    this.visibility = data.visibility;
    this.wind_speed = data.wind_speed;
    this.wind_deg = data.wind_deg;
    this.wind_gust = data.wind_gust;
    this.conditions = data.weather;
    this.rain = data.rain;
    this.snow = data.snow;
  }

  /**
   * Converts a fahrenheit temperature to celsius.
   * @param temp Temperature in fahrenheit.
   * @returns Temperature in celsius.
   */
  toCelsius(temp: number) {
    return (temp - 32) * (5 / 9);
  }

  /**
   * Gets this weather's temperature.
   * @param time Time of day (if applicable)
   * @param useCelsius Get temperature in celsius. Uses fahrenheit if false.
   * @returns Temperature
   */
  getTemp(useCelsius = false, time: "morn" | "day" | "eve" | "night" = "day") {
    if (typeof this.temp === "object") {
      return useCelsius ? this.toCelsius(this.temp[time]) : this.temp[time];
    } else {
      return useCelsius ? this.toCelsius(this.temp) : this.temp;
    }
  }

  /**
   * Gets this weather's feels-like temperature.
   * @param time Time of day (if applicable)
   * @param useCelsius Get temperature in celsius. Uses fahrenheit if false.
   * @returns Feels-like temperature
   */
  getFeelsLikeTemp(
    useCelsius = false,
    time: "morn" | "day" | "eve" | "night" = "day"
  ) {
    if (typeof this.feels_like === "object") {
      return useCelsius
        ? this.toCelsius(this.feels_like[time])
        : this.feels_like[time];
    } else {
      return useCelsius ? this.toCelsius(this.feels_like) : this.feels_like;
    }
  }

  /**
   * Gets one of eight cardinal directions (NW, N, NE, E, SE, S, SW, W) from the
   * wind degree property.
   * @returns The cardinal direction.
   */
  getWindDirection() {
    const interval = 45; // 8 directions from 360 degrees (360 / 8)
    const key = Math.round(this.wind_deg / interval);
    return cardinalDirections.get(key);
  }

  /**
   * Gets the icon that illustrates the weather condition.
   */
  getIcon() {
    return weatherIcons.get(this.conditions[0].id);
  }

  getWeekDayString() {
    return this.dt.toLocaleDateString([], { weekday: "long" });
  }

  getShortDateString() {
    return this.dt.toLocaleDateString([], { day: "2-digit", weekday: "short" });
  }

  /**
   * Determines if the date is the same as today's date.
   */
  isToday() {
    const today = new Date();
    return this.dt.toDateString() === today.toDateString();
  }
}
