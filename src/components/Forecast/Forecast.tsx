import "./forecast.css";
import React, { useState } from "react";

import ForecastToday from "./ForecastToday/ForecastToday";
import ForecastHourly from "./ForecastHourly/ForecastHourly";
import ForecastDaily from "./ForecastDaily/ForecastDaily";

interface ForecastProps {
  locale: string;
  tempScale: string;
  forecast: any;
}

export default function Forecast(props: ForecastProps) {
  if (!props.forecast) return null;

  const [forecastType, setForecastType] = useState("today");
  const tabStyle = "forecast__tab";
  const activeTabStyle = "forecast__tab--active";

  let forecastComponent;
  let isTodaySelected = false;
  let isHourlySelected = false;
  let isDailySelected = false;
  let todayTabStyle = tabStyle;
  let hourlyTabStyle = tabStyle;
  let dailyTabStyle = tabStyle;

  switch (forecastType) {
    case "today":
      forecastComponent = (
        <div role="tabpanel" id="panelToday">
          <ForecastToday
            forecast={props.forecast.daily[0]}
            tempScale={props.tempScale}
            locale={props.locale}
          />
        </div>
      );
      isTodaySelected = true;
      todayTabStyle = todayTabStyle.concat(" ", activeTabStyle);
      break;

    case "hourly":
      let hourlyForecasts = [];
      for (let i = 0; i < 24; i++) {
        hourlyForecasts.push(
          <ForecastHourly
            forecast={props.forecast.hourly[i]}
            tempScale={props.tempScale}
            locale={props.locale}
            key={i}
          />
        );
      }
      forecastComponent = (
        <div role="tabpanel" id="panelHourly">
          {hourlyForecasts}
        </div>
      );
      isHourlySelected = true;
      hourlyTabStyle = hourlyTabStyle.concat(" ", activeTabStyle);
      break;

    case "daily":
      let dailyForecasts = props.forecast.daily.map(
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
      forecastComponent = (
        <div role="tabpanel" id="panelDaily">
          {dailyForecasts}
        </div>
      );
      isDailySelected = true;
      dailyTabStyle = dailyTabStyle.concat(" ", activeTabStyle);
      break;

    default:
      console.error("Invalid forecastType state.");
      break;
  }

  return (
    <>
      <ul role="tablist" className="forecast__navigation">
        <li
          role="tab"
          aria-controls="panelToday"
          aria-selected={isTodaySelected}
          onClick={() => setForecastType("today")}
        >
          <h1 className={todayTabStyle}>Today</h1>
        </li>
        <li
          role="tab"
          aria-controls="panelHourly"
          aria-selected={isHourlySelected}
          onClick={() => setForecastType("hourly")}
        >
          <h1 className={hourlyTabStyle}>Hourly</h1>
        </li>
        <li
          role="tab"
          aria-controls="panelDaily"
          aria-selected={isDailySelected}
          onClick={() => setForecastType("daily")}
        >
          <h1 className={dailyTabStyle}>Daily</h1>
        </li>
      </ul>
      <div className="forecast">{forecastComponent}</div>
    </>
  );
}
