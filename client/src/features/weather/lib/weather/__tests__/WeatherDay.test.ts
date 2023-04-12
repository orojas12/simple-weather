import { WeatherDay } from "../";

describe("WeatherDay", () => {
  function getTestWeather(data?: object) {
    const weatherData = {
      dt: new Date().valueOf() / 1000,
      temp: {
        min: 32,
        max: 32,
      },
      feels_like: 32,
      pressure: 1,
      humidity: 1,
      dew_point: 1,
      uvi: 1,
      clouds: 1,
      wind_speed: 1,
      wind_deg: 1,
      wind_gust: 1,
      weather: [{ description: "sunny" }],
      rain: 1,
      snow: 1,
      sunrise: new Date().valueOf() / 1000,
      sunset: new Date().valueOf() / 1000,
      moonrise: new Date().valueOf() / 1000,
      moonset: new Date().valueOf() / 1000,
      moon_phase: 1,
      pop: 1,
      ...data,
    };
    return new WeatherDay(weatherData);
  }

  test("gets minimum and maximum temperature", () => {
    const weather = getTestWeather();
    expect(weather.getMinTemp()).toBe(32);
    expect(weather.getMaxTemp()).toBe(32);
    expect(weather.getMinTemp("imperial")).toBe(32);
    expect(weather.getMaxTemp("imperial")).toBe(32);
    expect(weather.getMinTemp("metric")).toBe(0);
    expect(weather.getMaxTemp("metric")).toBe(0);
  });

  test("gets temperature description", () => {
    let weather = getTestWeather({ temp: { max: 32 } });
    expect(weather.getTempDesc()).toBe("Very Cold");
    weather = getTestWeather({ temp: { max: 60 } });
    expect(weather.getTempDesc()).toBe("Cold");
    weather = getTestWeather({ temp: { max: 85 } });
    expect(weather.getTempDesc()).toBe("Moderate");
    weather = getTestWeather({ temp: { max: 99 } });
    expect(weather.getTempDesc()).toBe("Hot");
    weather = getTestWeather({ temp: { max: 100 } });
    expect(weather.getTempDesc()).toBe("Very Hot");
  });
});
