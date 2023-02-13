import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import { ArrowDownIcon } from "icons";
import "./dropdown.css";

export interface DropdownProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

interface MenuProps {
  items: { content: React.ReactNode; action?: () => void }[];
  align?: "start" | "end";
}

interface IOpenContext {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: React.RefObject<HTMLButtonElement>;
}

const DropdownContext = createContext<IOpenContext | null>(null);

export default function Dropdown({ id, className, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <div className={`dropdown ${className || ""}`}>
      <DropdownContext.Provider value={{ id, open, setOpen, toggle }}>
        {children}
      </DropdownContext.Provider>
    </div>
  );
}

function Toggle({ children }: { children: React.ReactNode }) {
  const ctx = useContext(DropdownContext);
  return (
    <button
      ref={ctx?.toggle}
      className={`dropdown__button ${
        ctx?.open ? "dropdown__button--active" : ""
      }`}
      onClick={() => ctx?.setOpen((prevState) => !prevState)}
      aria-haspopup="true"
      aria-controls={`${ctx?.id}-menu`}
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

function Menu({ items, align = "start" }: MenuProps) {
  const ctx = useContext(DropdownContext);

  const firstChild = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (ctx?.open) {
      firstChild?.current?.focus();
    }
  });

  const onClick = (action?: () => void) => {
    ctx?.setOpen(false);
    if (action) action();
    ctx?.toggle?.current?.focus();
  };

  return ctx?.open ? (
    <>
      <div
        className="dropdown__backdrop"
        onClick={() => ctx?.setOpen(false)}
      ></div>
      <div
        className={`dropdown__menu-wrapper dropdown__menu-wrapper--${align}`}
      >
        <ul
          id={`${ctx?.id}-menu`}
          className={"dropdown__menu"}
          role="menu"
          onKeyDown={(e) => e.key === "Escape" && onClick()}
        >
          {items.map((item, index) => {
            return (
              <li
                className="dropdown__menu-item"
                onClick={() => onClick(item.action)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onClick(item.action);
                  }
                }}
                ref={index === 0 ? firstChild : undefined}
                tabIndex={0}
                role="menuitem"
              >
                {item.content}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  ) : null;
}

Dropdown.Toggle = Toggle;
Dropdown.ToggleIcon = ToggleIcon;
Dropdown.Menu = Menu;
