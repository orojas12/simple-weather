import Weather from "./Weather";

export default class WeatherHour extends Weather {
  pop: number;

  constructor(data: any) {
    const newData = {
      ...data,
      rain: { past_hour: data.rain?.["1h"] },
      snow: { past_hour: data.snow?.["1h"] },
    };
    super(newData);
    this.pop = data.pop;
  }
}
