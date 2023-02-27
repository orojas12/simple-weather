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
      return Math.round(
        useCelsius ? this.toCelsius(this.temp.min) : this.temp.min
      );
  }

  /**
   * Gets the maximum or "high" temperature for this day.
   * @param useCelsius Get temperature on celsius. Uses fahrenheit if false.
   * @returns Maximum temperature.
   */
  getMaxTemp(useCelsius = false) {
    if (typeof this.temp === "object")
      return Math.round(
        useCelsius ? this.toCelsius(this.temp.max) : this.temp.max
      );
  }

  /**
   * Gets a short description of this day's temperature in terms of cold or hot.
   * @returns Description of the temperature.
   */
  getTempDesc() {
    let desc = ""
    const maxTemp = this.getMaxTemp()!
    if (maxTemp <= 32) {
      desc = "Very Cold";
    } else if (maxTemp <= 60) {
      desc = "Cold";
    } else if (maxTemp <= 85) {
      desc = "Moderate";
    } else if (maxTemp < 100) {
      desc = "Hot";
    } else {
      desc = "Very Hot"
    }
    return desc;
  }
}
