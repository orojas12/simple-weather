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
  [0, "S"],
  [1, "SW"],
  [2, "W"],
  [3, "NW"],
  [4, "N"],
  [5, "NE"],
  [6, "E"],
  [7, "SE"],
  [8, "S"],
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
  [803, PartlyCloudyIcon],
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
  readonly wind_speed: number;
  readonly wind_deg: number;
  readonly wind_gust?: number;
  readonly condition: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
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
    const condition = data.weather[0];

    this.dt = new Date(data.dt * 1000);
    this.temp = data.temp;
    this.feels_like = data.feels_like;
    this.pressure = data.pressure;
    this.humidity = data.humidity;
    this.dew_point = data.dew_point;
    this.uvi = data.uvi;
    this.clouds = data.clouds;
    this.wind_speed = data.wind_speed;
    this.wind_deg = data.wind_deg;
    this.wind_gust = data.wind_gust;
    this.condition = {
      ...condition,
      description:
        // capitalize first letter of description
        condition.description.charAt(0).toUpperCase() +
        condition.description.slice(1),
    };
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
   * @param unit Use imperial or metric units.
   * @returns Temperature
   */
  getTemp(unit = "imperial", time: "morn" | "day" | "eve" | "night" = "day") {
    if (typeof this.temp === "object") {
      return Math.round(
        unit === "metric" ? this.toCelsius(this.temp[time]) : this.temp[time]
      );
    } else {
      return Math.round(
        unit === "metric" ? this.toCelsius(this.temp) : this.temp
      );
    }
  }

  /**
   * Gets this weather's feels-like temperature.
   * @param time Time of day (if applicable)
   * @param unit Use imperial or metric units.
   * @returns Feels-like temperature
   */
  getFeelsLikeTemp(
    unit = "imperial",
    time: "morn" | "day" | "eve" | "night" = "day"
  ) {
    if (typeof this.feels_like === "object") {
      return unit === "metric"
        ? this.toCelsius(this.feels_like[time])
        : this.feels_like[time];
    } else {
      return unit === "metric"
        ? this.toCelsius(this.feels_like)
        : this.feels_like;
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
   * Gets the wind speed in meters/sec or miles/hour
   * @param units Use imperial or metric units
   * @returns Wind speed
   */
  getWindSpeed(units = "imperial") {
    return units === "imperial"
      ? this.metersPerSecToMilesPerHour(this.wind_speed)
      : this.wind_speed;
  }

  /**
   * Gets the wind gust in meters/sec or miles/hour
   * @param units Use imperial or metric units
   * @returns Wind gust or null if not available
   */
  getWindGust(units = "imperial") {
    if (this.wind_gust) {
      return units === "imperial"
        ? this.metersPerSecToMilesPerHour(this.wind_gust)
        : this.wind_gust;
    } else return null;
  }

  /**
   * Gets the icon that illustrates the weather condition.
   */
  getIcon() {
    return weatherIcons.get(this.condition.id);
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

  /**
   * Gets UV Index as a percentage
   */
  getUviPercentage() {
    return (this.uvi / 11) * 100;
  }

  /**
   * Gets UV Index exposure category
   */
  getUviCategory() {
    const uvi = Math.round(this.uvi);
    let category = "";
    if (uvi <= 2) {
      category = "Low";
    } else if (uvi <= 5) {
      category = "Moderate";
    } else if (uvi <= 7) {
      category = "High";
    } else if (uvi <= 10) {
      category = "Very High";
    } else {
      category = "Extreme";
    }
    return category;
  }

  /**
   * Gets a short description of the temperature in terms of cold or hot.
   * @returns Description of the temperature.
   */
  getTempDesc() {
    let desc = "";
    const temp = this.getTemp();
    if (temp <= 32) {
      desc = "Very Cold";
    } else if (temp <= 60) {
      desc = "Cold";
    } else if (temp <= 85) {
      desc = "Moderate";
    } else if (temp < 100) {
      desc = "Hot";
    } else {
      desc = "Very Hot";
    }
    return desc;
  }

  /**
   * Converts meters to miles rounded to the nearest hundreth.
   * @returns Miles
   */
  metersToMiles(meters: number) {
    return Math.round((meters / 1609.34) * 100) / 100;
  }

  /**
   * Converts meters/sec to miles/hour rounded to the nearest hundreth.
   * @returns Miles per hour
   */
  metersPerSecToMilesPerHour(metersPerSec: number) {
    return Math.round(metersPerSec * 2.237 * 100) / 100;
  }

  /**
   * Gets a short description of the visibility
   */
  getVisibilityDesc(meters: number) {
    let desc = "";
    if (meters >= 5000) {
      desc = "Good";
    } else if (meters >= 2000) {
      desc = "Moderate";
    } else if (meters >= 1000) {
      desc = "Poor";
    } else {
      desc = "Very Poor";
    }
    return desc;
  }
}
