import React from "react";
import { Dropdown } from "components";
import { CheckIcon } from "icons/ui";

interface SettingProps {
  name: string;
  value: any;
  values: any[];
  onChange: (name: string, value: any) => void;
}

export default function Setting(props: SettingProps) {
  const items = props.values.map((value) => {
    const isActive = props.value === value;

    return {
      content: (
        <div
          className={`flex gap-1 ${
            isActive ? "setting__menu-item--active" : null
          }`}
        >
          {value}{" "}
          {isActive ? <CheckIcon className="setting__menu-check" /> : null}
        </div>
      ),
      action: () => props.onChange(props.name, value),
    };
  });

  return (
    <Dropdown id={`setting_${props.name}`} className="setting">
      <Dropdown.Toggle className="setting__toggle">
        <div className="setting__content">
          <span className="setting__name">{props.name}</span>
          <span className="setting__value">{props.value}</span>
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
