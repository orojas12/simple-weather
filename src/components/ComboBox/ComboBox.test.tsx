import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
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
      <ComboBox<number>
        id="testComboBox"
        label=""
        options={[{ id: "1", text: "test", data: 1 }]}
        select={() => {}}
      />
    );
    const input = screen.getByRole("combobox");
    const listbox = screen.queryByRole("listbox");
    expect(listbox).toEqual(null);
    await user.type(input, "a");
    screen.getByRole("listbox");
  });

  test("closes listbox on item select", async () => {
    const { user } = setup(
      <ComboBox<number>
        id="testComboBox"
        label=""
        options={[
          { id: "1", text: "test1", data: 1 },
          { id: "2", text: "test2", data: 2 },
        ]}
        select={() => {}}
      />
    );
    const input = screen.getByRole("combobox");
    await user.type(input, "a");
    const option = screen.getByText("test1");
    await user.click(option);
    const listbox = screen.queryByRole("listbox");
    expect(listbox).toEqual(null);
  });

  test("sets input text to selected item text", async () => {
    const { user } = setup(
      <ComboBox<number>
        id="testComboBox"
        label=""
        options={[
          { id: "1", text: "test1", data: 1 },
          { id: "2", text: "test2", data: 2 },
        ]}
        select={() => {}}
      />
    );
    let input: HTMLInputElement = screen.getByRole("combobox");
    await user.type(input, "a");
    const option = screen.getByText("test1");
    await user.click(option);
    input = screen.getByRole("combobox");
    expect(input.value).toEqual("test1");
  });

  test("cleared input closes listbox", async () => {
    const { user } = setup(
      <ComboBox<number>
        id="testComboBox"
        label=""
        options={[
          { id: "1", text: "test1", data: 1 },
          { id: "2", text: "test2", data: 2 },
        ]}
        select={() => {}}
      />
    );
    const input = screen.getByRole("combobox");
    await user.type(input, "a");
    screen.getByRole("listbox");
    await user.clear(input);
    expect(screen.queryByRole("listbox")).toEqual(null);
  });

  test("changed input expands listbox", async () => {
    const { user } = setup(
      <ComboBox<number>
        id="testComboBox"
        label=""
        options={[
          { id: "1", text: "test1", data: 1 },
          { id: "2", text: "test2", data: 2 },
        ]}
        select={() => {}}
      />
    );
    const input = screen.getByRole("combobox");
    await user.type(input, "a");
    const option = screen.getByText("test2");
    await user.click(option);
    expect(screen.queryByRole("listbox")).toEqual(null);
    await user.type(input, "b");
    screen.getByRole("listbox");
  });

  test("can select option using keyboard", async () => {
    const { user } = setup(
      <ComboBox<number>
        id="testComboBox"
        label=""
        options={[
          { id: "1", text: "test1", data: 1 },
          { id: "2", text: "test2", data: 2 },
        ]}
        select={() => {}}
      />
    );
    const input: HTMLInputElement = screen.getByRole("combobox");
    await user.click(input);
    await user.keyboard("a");
    // select option 1
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowUp}{Enter}");
    expect(input.value).toEqual("test1");
    expect(screen.queryByRole("listbox")).toEqual(null);
  });

  test.todo("resets keyboard selection on input change");
});
