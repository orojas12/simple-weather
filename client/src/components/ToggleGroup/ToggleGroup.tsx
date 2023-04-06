import React, { useState, createContext, useContext, useEffect } from "react";
import "./toggleGroup.css";

interface ToggleGroupProps {
  children?: React.ReactNode;
  exclusive?: boolean;
  enforceSelection?: boolean;
  onChange?: (selected: string[]) => void;
}

interface IToggleGroupContext {
  selected: string[];
  select: (name: string) => void;
  deselect: (name: string) => void;
}

const ToggleGroupContext = createContext<IToggleGroupContext | null>(null);

function ToggleGroup(props: ToggleGroupProps) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (props.onChange) props.onChange(selected);
  }, [selected]);

  function select(name: string) {
    if (props.exclusive) {
      setSelected([name]);
    } else if (!selected.includes(name)) {
      setSelected((selected) => {
        return [...selected, name];
      });
    }
  }

  function deselect(name: string) {
    if (props.enforceSelection && selected.length === 1) return;
    if (selected.includes(name)) {
      setSelected((selected) => selected.filter((value) => value !== name));
    }
  }

  return (
    <ToggleGroupContext.Provider value={{ selected, select, deselect }}>
      <div className="toggle-group" role="group">
        {props.children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

interface ToggleProps {
  name: string;
  label?: string;
  default?: boolean;
  children?: React.ReactNode;
}

function Toggle(props: ToggleProps) {
  const ctx = useContext(ToggleGroupContext);
  const label = props.label || props.name;
  const activeStyles = ctx?.selected.includes(props.name)
    ? "toggle--active"
    : "";

  function handleClick() {
    if (!ctx) return;
    if (ctx.selected.includes(props.name)) {
      ctx.deselect(props.name);
    } else {
      ctx.select(props.name);
    }
  }

  useEffect(() => {
    if (props.default) ctx?.select(props.name);
  }, []);

  return (
    <div
      role="button"
      className={`toggle ${activeStyles}`}
      aria-pressed={false}
      aria-label={label}
      tabIndex={0}
      onClick={() => handleClick()}
    >
      {props.children}
    </div>
  );
}

ToggleGroup.Toggle = Toggle;

export default ToggleGroup;
