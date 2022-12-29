import "./forecast.css";
import React, { useState } from "react";

import ForecastToday from "./ForecastToday/ForecastToday";
import ForecastHourly from "./ForecastHourly/ForecastHourly";
import ForecastDaily from "./ForecastDaily/ForecastDaily";

import { isEmptyObj } from "../../utilities";

interface ForecastProps {
  locale: string;
  tempScale: string;
  forecast: any;
}

export default function Forecast(props: ForecastProps) {
  const [forecastType, setForecastType] = useState("today");

  /**
   * Changes the active tab on click.
   */
  const handleTabClick = (e: any) => {
    const element = e.target;

    if (!element.classList.contains("forecast__tab")) return;

    const parent = element.closest("ul");

    parent
      .querySelectorAll("h1")
      .forEach((element: HTMLElement) =>
        element.classList.remove("forecast__tab--active")
      );
    element.classList.add("forecast__tab--active");
    setForecastType(element.innerText.toLowerCase());
  };

  if (isEmptyObj(props.forecast)) return null;

  let forecastComponent;

  if (forecastType === "today")
    forecastComponent = (
      <ForecastToday
        forecast={props.forecast.daily[0]}
        tempScale={props.tempScale}
        locale={props.locale}
      />
    );

  if (forecastType === "hourly") {
    forecastComponent = [];
    for (let i = 0; i < 24; i++) {
      forecastComponent.push(
        <ForecastHourly
          forecast={props.forecast.hourly[i]}
          tempScale={props.tempScale}
          locale={props.locale}
          key={i}
        />
      );
    }
  }

  if (forecastType === "daily") {
    forecastComponent = props.forecast.daily.map(
      (forecastObj: any, i: number) => {
        return (
          <ForecastDaily
            forecast={forecastObj}
            tempScale={props.tempScale}
            locale={props.locale}
            key={i}
          />
        );
      }
    );
  }

  return (
    <React.Fragment>
      <ul onClick={handleTabClick} className="forecast__navigation">
        <li>
          <h1 className="forecast__tab forecast__tab--active">Today</h1>
        </li>
        <li>
          <h1 className="forecast__tab">Hourly</h1>
        </li>
        <li>
          <h1 className="forecast__tab">Daily</h1>
        </li>
      </ul>
      <div className="forecast">{forecastComponent}</div>
    </React.Fragment>
  );
}
