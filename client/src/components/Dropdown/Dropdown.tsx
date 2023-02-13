import React, { useState, createContext, useContext } from "react";
import { ArrowDownIcon } from "icons";
import "./dropdown.css";

export interface DropdownProps {
  className?: string;
  children?: React.ReactNode;
}

interface IOpenContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = createContext<IOpenContext | null>(null);

export default function Dropdown({ children, className }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`dropdown ${className || ""}`}>
      <DropdownContext.Provider value={{ open, setOpen }}>
        {children}
      </DropdownContext.Provider>
    </div>
  );
}

function Toggle({ children }: { children: React.ReactNode }) {
  const ctx = useContext(DropdownContext);
  return (
    <button
      className={`dropdown__button ${
        ctx?.open ? "dropdown__button--active" : ""
      }`}
      onClick={() => ctx?.setOpen((prevState) => !prevState)}
    >
      {children}
    </button>
  );
}

function ToggleIcon({ children }: { children?: React.ReactNode }) {
  const ctx = useContext(DropdownContext);
  return children ? (
    <div>{children}</div>
  ) : (
    <ArrowDownIcon
      className={`dropdown__icon ${ctx?.open && "dropdown__icon--active"}`}
    />
  );
}

function Item({ children }: { children: React.ReactNode }) {
  const ctx = useContext(DropdownContext);
  return (
    <li className="dropdown__item" onClick={() => ctx?.setOpen(false)}>
      {children}
    </li>
  );
}

function List({
  align = "start",
  children,
}: {
  align?: "start" | "end";
  children: React.ReactNode;
}) {
  const ctx = useContext(DropdownContext);
  return ctx?.open ? (
    <>
      <div
        className="dropdown__backdrop"
        onClick={() => ctx?.setOpen(false)}
      ></div>
      <div
        className={`dropdown__list-wrapper dropdown__list-wrapper--${align}`}
      >
        <ul className={"dropdown__list"}>{children}</ul>
      </div>
    </>
  ) : null;
}

Dropdown.Toggle = Toggle;
Dropdown.ToggleIcon = ToggleIcon;
Dropdown.Item = Item;
Dropdown.List = List;
