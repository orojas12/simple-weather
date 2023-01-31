import React, {
  useState,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  useRef,
} from "react";

export interface ComboBoxProps<T> {
  id: string;
  label: string;
  items: ComboBoxOption<T>[];
  autocomplete?: "list" | "inline" | "both" | "none";
  onChange?: (value: string) => void;
  onChangeDelay?: number;
  select: (data: T) => void;
}

interface ComboBoxOption<T> {
  id: string;
  text: string;
  data: T;
}

export default function ComboBox<T>(props: ComboBoxProps<T>) {
  const [value, setValue] = useState("");
  const [activeDesc, setActiveDesc] = useState<number>(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ComboBoxOption<T>>(null);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (!selectedOption) return;
    setValue(selectedOption.text);
    setExpanded(false);
    props.select(selectedOption.data);
  }, [selectedOption]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId.current);
    const inputValue = e.target.value;
    setActiveDesc(null);
    setValue(inputValue);
    setExpanded(true);
    if (props.onChange) {
      if (props.onChangeDelay) {
        timeoutId.current = setTimeout(() => {
          props.onChange(inputValue);
        }, props.onChangeDelay);
      } else {
        props.onChange(inputValue);
      }
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
          setExpanded(false);
          props.select(selectedOption.data);
        } else {
          setSelectedOption(props.items[activeDesc]);
        }

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
  const options = props.items.map((option, i) => (
    <li
      key={i}
      id={optionId + `-${i}`}
      role="option"
      tabIndex={-1}
      className={`ComboBox__option ${
        activeDesc === i ? "ComboBox__option--active" : ""
      }`}
      onClick={(e) => {
        onClick(option);
      }}
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
    <div id={props.id}>
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
        onFocus={() => setExpanded(true)}
        onBlur={(e) => {
          // skip if focused element is in the combobox
          if (!e.target.parentElement.contains(e.relatedTarget)) {
            if (selectedOption) setValue(selectedOption.text);
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
