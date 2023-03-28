import React from "react";
import { Dropdown } from "components";
import { CheckIcon } from "icons/ui";
import { capitalize } from "lib/utils";

interface SettingProps {
  label: string;
  name: string;
  value: any;
  options: { label: string; value: any }[];
  onChange: (name: string, value: any) => void;
}

export default function Setting(props: SettingProps) {
  const items = props.options.map((option) => {
    const isActive = option.value === props.value;

    return {
      content: (
        <div
          className={`flex gap-1 ${
            isActive ? "setting__menu-item--active" : null
          }`}
        >
          {option.label}{" "}
          {isActive ? <CheckIcon className="setting__menu-check" /> : null}
        </div>
      ),
      action: () => props.onChange(props.name, option.value),
    };
  });

  return (
    <Dropdown id={`setting_${props.label}`} className="setting">
      <Dropdown.Toggle className="setting__toggle">
        <div className="setting__content">
          <span className="setting__name">{props.label}</span>
          <span className="setting__value">
            {capitalize(String(props.value))}
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="setting__menu"
        itemClassName="setting__menu-item"
        items={items}
      />
    </Dropdown>
  );
}
