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

  test("expands listbox on focus", async () => {
    const { user } = setup(
      <ComboBox<number>
        id="testComboBox"
        label=""
        items={[{ id: "1", text: "test", data: 1 }]}
        select={() => {}}
      />
    );
    const input = screen.getByRole("combobox");
    const listbox = screen.queryByRole("listbox");
    expect(listbox).toEqual(null);
    await user.click(input);
    screen.getByRole("listbox");
  });

  test("closes listbox on item select", async () => {
    const { user } = setup(
      <ComboBox<number>
        id="testComboBox"
        label=""
        items={[
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
        items={[
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

  test("changed input expands listbox", async () => {
    const { user } = setup(
      <ComboBox<number>
        id="testComboBox"
        label=""
        items={[
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
        items={[
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

  test("resets keyboard selection on input change", async () => {
    const { user } = setup(
      <ComboBox<number>
        id="testComboBox"
        label=""
        items={[
          { id: "1", text: "test1", data: 1 },
          { id: "2", text: "test2", data: 2 },
        ]}
        select={() => {}}
      />
    );
    const input: HTMLInputElement = screen.getByRole("combobox");
    await user.click(input);
    await user.keyboard("a{ArrowDown}b{ArrowDown}{Enter}");
    expect(input.value).toEqual("test1");
    await user.clear(input);
    await user.keyboard(
      "a{ArrowDown}b{ArrowDown}{Backspace}{ArrowDown}{Enter}"
    );
    expect(input.value).toEqual("test1");
  });

  test("reverts input value to selected option if combobox loses focus while typing", async () => {
    const { user } = setup(
      <div>
        <ComboBox<number>
          id="testComboBox1"
          label="testComboBox1"
          items={[
            { id: "1", text: "test1", data: 1 },
            { id: "2", text: "test2", data: 2 },
          ]}
          select={() => {}}
        />
        <input id="testInput" type="text" />
      </div>
    );
    const input: HTMLInputElement = screen.getByLabelText("testComboBox1");
    await user.click(input);
    await user.keyboard("a{ArrowDown}{Enter}b");
    await user.tab();
    expect(input.value).toEqual("test1");
  });
});
