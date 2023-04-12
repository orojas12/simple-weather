jest.mock("react-chartjs-2", () => ({
  Bar: () => null,
  Line: () => null,
}));

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Summary from "../Summary";
import TestWeatherData from "@/test/weather-data.json";
import {
  WeatherAlert,
  WeatherCurrent,
  WeatherDay,
  WeatherHour,
} from "../../lib/weather";

describe("Summary component", () => {
  function setup(jsx: React.ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  const TestWeather = {
    current: new WeatherCurrent(TestWeatherData.current),
    hourly: TestWeatherData.hourly.map((data) => new WeatherHour(data)),
    daily: TestWeatherData.daily.map((data) => new WeatherDay(data)),
    alerts: TestWeatherData.alerts?.map((data) => new WeatherAlert(data)),
  };

  test("shows current summary by default if day is today", () => {
    const { user } = setup(
      <Summary day={0} weather={TestWeather} location={{} as any} units={""} />
    );
    expect(screen.getByTestId("current-summary")).toBeInTheDocument();
    expect(screen.queryByTestId("day-summary")).toBe(null);
  });

  test("renders current/today toggle if day is today", async () => {
    const { user } = setup(
      <Summary day={0} weather={TestWeather} location={{} as any} units={""} />
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  test("does not show current/today toggle if day is not today", () => {
    const { user } = setup(
      <Summary day={1} weather={TestWeather} location={{} as any} units={""} />
    );
    expect(screen.queryByRole("group")).toBe(null);
  });

  test("renders correct type of summary on toggle click", async () => {
    const { user } = setup(
      <Summary day={0} weather={TestWeather} location={{} as any} units={""} />
    );
    await user.click(screen.getByText("Today"));
    expect(screen.queryByTestId("current-summary")).toBe(null);
    expect(screen.getByTestId("day-summary")).toBeInTheDocument();
    await user.click(screen.getByText("Current"));
    expect(screen.getByTestId("current-summary")).toBeInTheDocument();
    expect(screen.queryByTestId("day-summary")).toBe(null);
  });
});
