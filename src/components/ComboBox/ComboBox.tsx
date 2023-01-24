import React, { useState, useEffect, KeyboardEvent } from "react";

export interface ComboBoxProps<T> {
  id: string;
  label: string;
  options: ComboBoxOption<T>[];
  select: (item: T) => void;
}

interface ComboBoxOption<T> {
  id: string;
  text: string;
  data: T;
}

export default function ComboBox<T>(props: ComboBoxProps<T>) {
  const [value, setValue] = useState("");
  const [activeDesc, setActiveDesc] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setActiveDesc(props.options.length > 0 ? 0 : null);
  }, [props.options]);

  useEffect(() => {
    setExpanded(value.length > 0);
  }, [value]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    return;
  };

  const listboxId = `${props.id}_listbox`;
  const optionId = listboxId + "_option";
  const options = props.options.map((item, i) => (
    <li
      id={optionId + `-${i}`}
      role="option"
      className={
        activeDesc === i ? "ComboBox_option--active" : "ComboBox_option"
      }
      onClick={() => props.select(item.data)}
    >
      {item.text}
    </li>
  ));
  const listbox = expanded ? (
    <ul id={listboxId} role="listbox">
      {options}
    </ul>
  ) : null;

  return (
    <div>
      <input
        id={`${props.id}_input`}
        type="text"
        role="combobox"
        aria-label={props.label}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-activedescendant={
          activeDesc !== null ? optionId + `-${activeDesc}` : ""
        }
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {listbox}
    </div>
  );
}
