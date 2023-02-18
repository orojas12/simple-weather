import Weather from "./Weather";

export default class WeatherCurrent extends Weather {
  sunrise: number;
  sunset: number;

  constructor(data: any) {
    super(data);
    this.sunrise = data.sunrise;
    this.sunset = data.sunset;
  }
}
