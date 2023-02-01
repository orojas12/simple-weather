import React, {
  useState,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  useRef,
} from "react";
import "./combobox.css";

export interface ComboboxProps<T> {
  id: string;
  label: string;
  items: ComboboxOption<T>[];
  autocomplete?: "list" | "inline" | "both" | "none";
  onChange?: (value: string) => void;
  onChangeWithDelay?: [(value: string) => void, number];
  select: (data: T) => void;
}

interface ComboboxOption<T> {
  id: string;
  text: string;
  data: T;
}

export default function Combobox<T>(props: ComboboxProps<T>) {
  const [value, setValue] = useState("");
  const [activeDesc, setActiveDesc] = useState<number>(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ComboboxOption<T>>(null);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (!selectedOption) return;
    setValue(selectedOption.text);
    props.select(selectedOption.data);
  }, [selectedOption]);

  useEffect(() => {
    if (!expanded) setActiveDesc(null);
  }, [expanded]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId.current);
    const inputValue = e.target.value;
    setActiveDesc(null);
    setValue(inputValue);
    setExpanded(true);
    if (props.onChange) {
      props.onChange(inputValue);
    }
    if (props.onChangeWithDelay?.length === 2) {
      timeoutId.current = setTimeout(() => {
        props.onChangeWithDelay[0](inputValue);
      }, props.onChangeWithDelay[1]);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!props.items.length || !expanded) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (activeDesc === props.items.length - 1 || activeDesc === null) {
          setActiveDesc(0);
        } else {
          setActiveDesc((prevActiveDesc) => prevActiveDesc + 1);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (activeDesc === 0 || activeDesc === null) {
          setActiveDesc(props.items.length - 1);
        } else {
          setActiveDesc((prevActiveDesc) => prevActiveDesc - 1);
        }
        break;
      case "Enter":
        if (activeDesc === null) return;
        if (props.items[activeDesc] === selectedOption) {
          setValue(selectedOption.text);
          props.select(selectedOption.data);
        } else {
          setSelectedOption(props.items[activeDesc]);
        }
        setExpanded(false);
        break;
      case "Escape":
        if (selectedOption) {
          setValue(selectedOption.text);
        } else {
          setValue("");
        }
        setExpanded(false);
        break;
      default:
        break;
    }
  };

  const onClick = (option: ComboboxOption<T>) => {
    setSelectedOption(option);
    setExpanded(false);
    // setActiveDesc(null);
  };

  const listboxId = `${props.id}_listbox`;
  const optionId = `${props.id}_option`;
  const options = props.items.map((option, i) => (
    <li
      key={i}
      id={optionId + `-${i}`}
      role="option"
      tabIndex={-1}
      className={`combobox__option ${
        activeDesc === i ? "combobox__option--active" : ""
      }`}
      onClick={(e) => {
        onClick(option);
      }}
    >
      {option.text}
    </li>
  ));
  const listbox = expanded ? (
    <ul id={listboxId} className="combobox__listbox" role="listbox">
      {options}
    </ul>
  ) : null;

  return (
    <div
      id={props.id}
      className={`combobox ${expanded ? "combobox--active" : ""}`}
    >
      <input
        id={`${props.id}_input`}
        className={`combobox__input ${
          expanded ? "combobox__input--active" : ""
        }`}
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
        onFocus={() => setExpanded(true)}
        onBlur={(e) => {
          // skip if focused element is part of the combobox
          if (!e.target.parentElement.contains(e.relatedTarget)) {
            if (selectedOption) {
              setValue(selectedOption.text);
            } else {
              setValue("");
            }
            setExpanded(false);
          }
        }}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {listbox}
    </div>
  );
}
