import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Summary from "../Summary";

describe("Summary component", () => {
  function setup(jsx: React.ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  test("shows current summary by default if day is today", () => {
    const { user } = setup(
      <Summary day={0} weather={{} as any} location={{} as any} />
    );
    expect(screen.getByTestId("current-summary")).toBeInTheDocument();
    expect(screen.queryByTestId("day-summary")).toBe(null);
  });

  test("show current/today toggle if day is today", () => {
    const { user } = setup(
      <Summary day={0} weather={{} as any} location={{} as any} />
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  test("do not show current/today toggle if day is not today", () => {
    const { user } = setup(
      <Summary day={1} weather={{} as any} location={{} as any} />
    );
    expect(screen.queryByRole("group")).toBe(null);
  });
});
