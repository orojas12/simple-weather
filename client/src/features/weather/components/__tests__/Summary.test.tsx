import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Summary from "../Summary";
import { WeatherCurrent } from "@/lib/weather";

describe("Summary component", () => {
  function setup(jsx: React.ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  test("shows current summary by default if day is today", () => {
    const { user } = setup(
      <Summary
        day={0}
        weather={mockWeather as any}
        location={{} as any}
        units={""}
      />
    );
    expect(screen.getByTestId("current-summary")).toBeInTheDocument();
    expect(screen.queryByTestId("day-summary")).toBe(null);
  });

  test("renders current/today toggle if day is today", async () => {
    const { user } = setup(
      <Summary
        day={0}
        weather={mockWeather as any}
        location={{} as any}
        units={""}
      />
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  test("does not show current/today toggle if day is not today", () => {
    const { user } = setup(
      <Summary
        day={1}
        weather={mockWeather as any}
        location={{} as any}
        units={""}
      />
    );
    expect(screen.queryByRole("group")).toBe(null);
  });

  test("renders correct type of summary on toggle click", async () => {
    const { user } = setup(
      <Summary
        day={0}
        weather={mockWeather as any}
        location={{} as any}
        units={""}
      />
    );
    await user.click(screen.getByText("Today"));
    expect(screen.queryByTestId("current-summary")).toBe(null);
    expect(screen.getByTestId("day-summary")).toBeInTheDocument();
    await user.click(screen.getByText("Current"));
    expect(screen.getByTestId("current-summary")).toBeInTheDocument();
    expect(screen.queryByTestId("day-summary")).toBe(null);
  });
});
