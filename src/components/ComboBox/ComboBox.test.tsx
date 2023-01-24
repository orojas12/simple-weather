import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ComboBox from "./ComboBox";

describe("ComboBox component", () => {
  const setup = (element: any) => {
    return {
      user: userEvent.setup(),
      ...render(element),
    };
  };
  test("expands listbox on input", async () => {
    const { user } = setup(
      <ComboBox<any>
        id=""
        label=""
        options={[{ id: "1", text: "test", data: 1 }]}
        select={(item) => {}}
      />
    );

    const input = screen.getByRole("combobox");
    const listbox = screen.queryByRole("listbox");
    expect(listbox).toEqual(null);
    await user.type(input, "a");
    screen.getByRole("listbox");
  });
});
