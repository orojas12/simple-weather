import React, { FormEvent, FormEventHandler, useState } from "react";
import "./navigation.css";
import searchIcon from "../../icons/loupe.svg";
import logo from "../../icons/logo.svg";

interface NavigationProps {
  cityAndState: string;
  onSubmit: (e: FormEvent, text: string) => void;
  onScaleSwitch: () => void;
  useCelsius: boolean;
}

const Navigation = function (props: NavigationProps) {
  const [input, setInput] = useState("");

  const tempScale = props.useCelsius ? "celsius" : "fahrenheit";

  return (
    <nav className="nav">
      <img className="logo" alt="weather app logo" src={logo} />
      <form className="search" onSubmit={(e) => props.onSubmit(e, input)}>
        <input
          className="search__input"
          type="text"
          placeholder={props.cityAndState}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <img className="search__icon" alt="loupe icon" src={searchIcon} />
      </form>
      <div className="scale">
        <p
          className={`scale-switch__label ${
            tempScale === "fahrenheit" ? "scale-switch__label--active" : ""
          }`}
        >
          &deg;F
        </p>
        <div
          className={`scale-switch ${
            tempScale === "celsius" ? "scale-switch--onCelsius" : ""
          }`}
          onClick={props.onScaleSwitch}
        >
          <div className="scale-switch__circle"></div>
        </div>
        <p
          className={`scale-switch__label ${
            tempScale === "celsius" ? "scale-switch__label--active" : ""
          }`}
        >
          &deg;C
        </p>
      </div>
    </nav>
  );
};

export default Navigation;
