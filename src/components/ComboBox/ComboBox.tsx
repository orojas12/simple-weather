import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";

export interface ComboBoxProps<T> {
  id: string;
  label: string;
  options: ComboBoxOption<T>[];
  autocomplete?: "list" | "inline" | "both" | "none";
  select: (option: T) => void;
}

interface ComboBoxOption<T> {
  id: string;
  text: string;
  data: T;
}
// TODO: add ability to inject onchange handler (for autocomplete data fetching, etc.)
// TODO: revert input value to previously selected option if combobox loses focus
// TODO: research usage of tab-index and whether I should keep focus on combobox or listbox
export default function ComboBox<T>(props: ComboBoxProps<T>) {
  const [value, setValue] = useState("");
  const [activeDesc, setActiveDesc] = useState<number>(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ComboBoxOption<T>>(null);

  useEffect(() => {
    setActiveDesc(null);
  }, [props.options]);

  useEffect(() => {
    if (selectedOption) return;
    setExpanded(value.length > 0);
  }, [value]);

  useEffect(() => {
    if (!selectedOption) return;
    setValue(selectedOption.text);
    setActiveDesc(null);
    setExpanded(false);
    props.select(selectedOption.data);
  }, [selectedOption]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(null);
    setActiveDesc(null);
    setValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!props.options.length || !expanded) return;
    switch (e.key) {
      case "ArrowDown":
        if (activeDesc === props.options.length - 1 || activeDesc === null) {
          setActiveDesc(0);
        } else {
          setActiveDesc((prevActiveDesc) => prevActiveDesc + 1);
        }
        break;
      case "ArrowUp":
        if (activeDesc === 0 || activeDesc === null) {
          setActiveDesc(props.options.length - 1);
        } else {
          setActiveDesc((prevActiveDesc) => prevActiveDesc - 1);
        }
        break;
      case "Enter":
        if (activeDesc === null) return;
        setSelectedOption(props.options[activeDesc]);
        break;
      default:
        break;
    }
  };

  const onClick = (option: ComboBoxOption<T>) => {
    setSelectedOption(option);
  };

  const listboxId = `${props.id}_listbox`;
  const optionId = `${props.id}_option`;
  const options = props.options.map((option, i) => (
    <li
      key={i}
      id={optionId + `-${i}`}
      role="option"
      className={`ComboBox__option ${
        activeDesc === i ? "ComboBox__option--active" : ""
      }`}
      onClick={() => onClick(option)}
    >
      {option.text}
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
        aria-autocomplete={props.autocomplete || "none"}
        aria-expanded={expanded}
        aria-activedescendant={
          activeDesc !== null ? optionId + `-${activeDesc}` : ""
        }
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {listbox}
    </div>
  );
}
