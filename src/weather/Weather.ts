export default class Weather {
  readonly dt: number;
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
    this.dt = data.dt;
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
  getTemp(time?: "morn" | "day" | "eve" | "night", useCelsius = false) {
    if (typeof this.temp === "number") {
      return useCelsius ? this.toCelsius(this.temp) : this.temp;
    } else if (typeof this.temp === "object") {
      return useCelsius ? this.toCelsius(this.temp[time]) : this.temp[time];
    }
  }

  /**
   * Gets this weather's feels-like temperature.
   * @param time Time of day (if applicable)
   * @param useCelsius Get temperature in celsius. Uses fahrenheit if false.
   * @returns Feels-like temperature
   */
  getFeelsLikeTemp(
    time?: "morn" | "day" | "eve" | "night",
    useCelsius = false
  ) {
    if (typeof this.feels_like === "number") {
      return useCelsius ? this.toCelsius(this.feels_like) : this.feels_like;
    } else if (typeof this.feels_like === "object") {
      return useCelsius
        ? this.toCelsius(this.feels_like[time])
        : this.feels_like[time];
    }
  }

  /**
   * Gets a short-style formatted time from a unix timestamp
   * @param unixTime The time or date in unix time format.
   * @param locale The user's language and region.
   */
  getTime(unixTime: number, locale: string) {}

  /**
   * Gets the date with the format of "{weekday} {day}" from a unix timestamp.
   * @param unixTime The time or date in unix time format.
   * @param locale The user's language and region.
   */
  getDate(unixTime: number, locale: string) {}

  /**
   * Gets one of eight cardinal directions (NW, N, NE, E, SE, S, SW, W) from the
   * wind degree.
   * @returns The cardinal direction.
   */
  getWindDirection() {
    const directions = new Map([
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
    const interval = 45; // 8 directions from 360 degrees (360 / 8)
    const key = Math.round(this.wind_deg / interval);
    return directions.get(key);
  }
}
