import { Weather } from "../";

describe("Weather", () => {
  function getTestWeather(data?: object) {
    const weatherData = {
      dt: new Date().valueOf() / 1000,
      temp: 32,
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
      ...data,
    };
    return new Weather(weatherData);
  }

  test("Converts farenheit to celsius", () => {
    const weather = getTestWeather();
    const temp = weather.toCelsius(32);
    expect(temp).toBe(0);
  });

  test("gets temperature with correct units", () => {
    const weather = getTestWeather();
    expect(weather.getTemp()).toBe(32);
    expect(weather.getTemp("metric")).toBe(0);
  });

  test("gets temperature of time of day", () => {
    const weather = getTestWeather({
      temp: { morn: 1, day: 2, eve: 3, night: 4 },
    });
    expect(weather.getTemp("imperial", "morn")).toBe(1);
    expect(weather.getTemp("imperial", "day")).toBe(2);
    expect(weather.getTemp("imperial", "eve")).toBe(3);
    expect(weather.getTemp("imperial", "night")).toBe(4);
  });

  test("gets feels-like temperature with correct units", () => {
    const weather = getTestWeather();
    expect(weather.getFeelsLikeTemp()).toBe(32);
    expect(weather.getFeelsLikeTemp("metric")).toBe(0);
  });

  test("gets feels-like temperature of time of day", () => {
    const weather = getTestWeather({
      feels_like: { morn: 1, day: 2, eve: 3, night: 4 },
    });
    expect(weather.getFeelsLikeTemp("imperial", "morn")).toBe(1);
    expect(weather.getFeelsLikeTemp("imperial", "day")).toBe(2);
    expect(weather.getFeelsLikeTemp("imperial", "eve")).toBe(3);
    expect(weather.getFeelsLikeTemp("imperial", "night")).toBe(4);
  });

  test("gets wind direction", () => {
    const weather = getTestWeather({ wind_deg: 0 });
    expect(weather.getWindDirection()).toBe("S");
  });

  test("gets wind speed with correct units", () => {
    let weather = getTestWeather({ wind_speed: 1 });
    expect(Math.round(weather.getWindSpeed() * 100) / 100).toBe(2.24);
    weather = getTestWeather({ wind_speed: 1 });
    expect(weather.getWindSpeed("metric")).toBe(1);
  });

  test("gets wind gust with correct units", () => {
    let weather = getTestWeather({ wind_gust: 1 });
    // eslint-disable-next-line @/typescript-eslint/no-non-null-assertion
    expect(Math.round(weather.getWindGust()! * 100) / 100).toBe(2.24);
    weather = getTestWeather({ wind_speed: 1 });
    expect(weather.getWindGust("metric")).toBe(1);
  });

  test("correctly determines if the date is today", () => {
    let weather = getTestWeather();
    expect(weather.isToday()).toBe(true);
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    weather = getTestWeather({ dt: tomorrow.valueOf() / 1000 });
    expect(weather.isToday()).toBe(false);
  });

  test("gets uvi percentage", () => {
    const weather = getTestWeather();
    expect(weather.getUviPercentage()).toBe((weather.uvi / 11) * 100);
  });

  test("gets uvi exposure category", () => {
    let weather = getTestWeather({ uvi: 2 });
    expect(weather.getUviCategory()).toBe("Low");
    weather = getTestWeather({ uvi: 5 });
    expect(weather.getUviCategory()).toBe("Moderate");
    weather = getTestWeather({ uvi: 7 });
    expect(weather.getUviCategory()).toBe("High");
    weather = getTestWeather({ uvi: 10 });
    expect(weather.getUviCategory()).toBe("Very High");
    weather = getTestWeather({ uvi: 11 });
    expect(weather.getUviCategory()).toBe("Extreme");
  });

  test("gets temp description", () => {
    let weather = getTestWeather({ temp: 32 });
    expect(weather.getTempDesc()).toBe("Very Cold");
    weather = getTestWeather({ temp: 60 });
    expect(weather.getTempDesc()).toBe("Cold");
    weather = getTestWeather({ temp: 85 });
    expect(weather.getTempDesc()).toBe("Moderate");
    weather = getTestWeather({ temp: 99 });
    expect(weather.getTempDesc()).toBe("Hot");
    weather = getTestWeather({ temp: 100 });
    expect(weather.getTempDesc()).toBe("Very Hot");
  });

  test("converts meters to miles", () => {
    const weather = getTestWeather();
    expect(weather.metersToMiles(1000)).toBe(
      Math.round((1000 / 1609.34) * 100) / 100
    );
  });

  test("gets visibility description", () => {
    const weather = getTestWeather();
    expect(weather.getVisibilityDesc(5000)).toBe("Good");
    expect(weather.getVisibilityDesc(2000)).toBe("Moderate");
    expect(weather.getVisibilityDesc(1000)).toBe("Poor");
    expect(weather.getVisibilityDesc(999)).toBe("Very Poor");
  });
});
