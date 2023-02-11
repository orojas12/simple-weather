import React, { useState } from "react";
import { ArrowDownIcon } from "icons";
import "./dropdown.css";

export interface DropdownProps {
  align: "start" | "end";
  btnText: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function Dropdown({
  align,
  children,
  btnText,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const style = {
    left: align === "start" ? 0 : undefined,
    right: align === "end" ? 0 : undefined,
  };

  const btn =
    typeof btnText === "string" ? <button>{btnText}</button> : btnText;

  return (
    <div className={`dropdown ${className || ""}`}>
      <div
        role="button"
        className="dropdown__button"
        onClick={() => {
          setOpen((prevState) => !prevState);
        }}
      >
        {btn}
        <ArrowDownIcon
          className={`dropdown__icon ${open && "dropdown__icon--active"}`}
        />
      </div>
      {open ? (
        <>
          <div
            className="dropdown__backdrop"
            onClick={() => setOpen(false)}
          ></div>
          <div className="dropdown__content-wrapper">
            <div
              className="dropdown__content"
              style={style}
              onClick={() => setOpen(false)}
            >
              {children}
            </div>
          </div>
        </>
      ) : undefined}
    </div>
  );
}
