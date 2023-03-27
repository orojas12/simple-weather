import Weather from "./Weather";

export default class WeatherCurrent extends Weather {
  sunrise: number;
  sunset: number;
  visibility: number;

  constructor(data: any) {
    super(data);
    this.visibility = data.visibility;
    this.sunrise = data.sunrise;
    this.sunset = data.sunset;
  }
}
