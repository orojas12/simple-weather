import Weather from "./Weather";

export default class WeatherDay extends Weather {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  pop: number;

  constructor(data: any) {
    super(data);
    this.sunrise = data.sunrise;
    this.sunset = data.sunset;
    this.moonrise = data.moonrise;
    this.moonset = data.moonset;
    this.moon_phase = data.moon_phase;
    this.pop = data.pop;
  }

  /**
   * Gets the minimum or "low" temperature for this day.
   * @param useCelsius Get temperature on celsius. Uses fahrenheit if false.
   * @returns Minimum temperature.
   */
  getMinTemp(useCelsius = false) {
    if (typeof this.temp === "object")
      return useCelsius ? this.toCelsius(this.temp.min) : this.temp.min;
  }

  /**
   * Gets the maximum or "high" temperature for this day.
   * @param useCelsius Get temperature on celsius. Uses fahrenheit if false.
   * @returns Maximum temperature.
   */
  getMaxTemp(useCelsius = false) {
    if (typeof this.temp === "object")
      return useCelsius ? this.toCelsius(this.temp.max) : this.temp.max;
  }

  /**
   * Determines if the date is the same as today's date.
   */
  isToday() {
    const today = new Date();
    return this.dt.toDateString() === today.toDateString();
  }
}
