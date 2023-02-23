import React, { useState, createContext, useContext } from "react";
import { ArrowDownIcon } from "icons/ui";
import "./accordian.css";

interface AccordianProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface ItemProps extends AccordianProps {}

interface PanelProps extends AccordianProps {}

interface IconProps extends AccordianProps {}

interface ToggleProps extends AccordianProps {}

interface IAccordianContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccordianContext = createContext<IAccordianContext | null>(null);

export default function Accordian({
  children,
  className,
  style,
}: AccordianProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`accordian ${className}`} style={style}>
      <AccordianContext.Provider value={{ open, setOpen }}>
        {children}
      </AccordianContext.Provider>
    </div>
  );
}

function Item({ children, className, style }: ItemProps) {
  return (
    <div className={`accordian__item ${className}`} style={style}>
      {children}
    </div>
  );
}

function Panel({ children, className, style }: PanelProps) {
  const ctx = useContext(AccordianContext);

  return ctx?.open ? (
    <p className={`accordian__panel ${className}`} style={style}>
      {children}
    </p>
  ) : null;
}

function Icon({ children, className, style }: IconProps) {
  return children ? (
    <>{children}</>
  ) : (
    <ArrowDownIcon className={`accordian__icon ${className}`} style={style} />
  );
}

function Toggle({ children, className, style }: ToggleProps) {
  const ctx = useContext(AccordianContext);

  return (
    <div
      className="accordian__toggle"
      onClick={() => ctx?.setOpen((open) => !open)}
    >
      {children}
    </div>
  );
}

Accordian.Item = Item;
Accordian.Panel = Panel;
Accordian.Icon = Icon;
Accordian.Toggle = Toggle;
