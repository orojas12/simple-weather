import React, { useState, useContext, useEffect } from "react";
import { Card, Dropdown } from "components";
import { LocationIcon, EyeIcon } from "icons/ui";
import {
  LocationContext,
  WeatherContext,
  WeatherCurrent,
  WeatherDay,
} from "hooks";
import Clock from "./Clock";
import "./dashboard.css";
import WeatherCard from "./WeatherCard";
import WeatherDetailCard from "./WeatherDetailCard";
import { TempIcon, WindIcon } from "icons/weather";

export default function DashboardPage() {
  const location = useContext(LocationContext);
  const weather = useContext(WeatherContext);
  const [displayedWeather, setDisplayedWeather] = useState<
    WeatherCurrent | WeatherDay | undefined
  >(weather?.current);

  useEffect(() => {
    setDisplayedWeather(weather?.current);
  }, [weather]);

  const getDailyCards = () => {
    return weather?.daily.map((day, i) => {
      return (
        <WeatherCard
          key={i}
          weather={day}
          onClick={() => setDisplayedWeather(day)}
          active={displayedWeather === day}
        />
      );
    });
  };

  const locationString = location?.place?.description;
  const WeatherIcon = displayedWeather?.getIcon();
  let heading;

  if (displayedWeather instanceof WeatherCurrent) {
    heading = `Currently in ${locationString}`;
  } else if (displayedWeather?.isToday()) {
    heading = `Today in ${locationString}`;
  } else {
    heading = `${displayedWeather?.getWeekDayString()} in ${locationString}`;
  }

  return (
    <article className="dashboard">
      <header>
        <Clock />
        <Dropdown id="dropdown1" size="small">
          <Dropdown.Toggle>
            <LocationIcon className="dashboard__location-icon" />
            {location?.place?.description}
            <Dropdown.ToggleIcon />
          </Dropdown.Toggle>
          <Dropdown.Menu
            align="end"
            items={[
              {
                content: "Location 123",
                action: () => console.log("Location 123"),
              },
              {
                content: <div>Location 2</div>,
                action: () => console.log("Location 2"),
              },
              {
                content: "Location 3",
                action: () => console.log("Location 3"),
              },
            ]}
          />
        </Dropdown>
      </header>
      <main>
        <div className="dashboard__days">
          <WeatherCard
            weather={weather?.current}
            onClick={() => setDisplayedWeather(weather?.current)}
            active={displayedWeather === weather?.current}
          />
          {getDailyCards()}
        </div>
        <div className="dashboard__overview">
          <h1 className="dashboard__heading">{heading}</h1>
          <div className="dashboard__overview-grid">
            <WeatherDetailCard
              title="Current"
              content="50&deg;"
              icon={
                WeatherIcon ? (
                  <WeatherIcon className="dashboard__card-icon" />
                ) : null
              }
              subtitle={displayedWeather?.condition.description || ""}
            />
            <WeatherDetailCard
              title="Temperature"
              content={`${weather?.daily[0].getMaxTemp()}\u00b0/${weather?.daily[0].getMinTemp()}\u00b0`}
              icon={<TempIcon className="dashboard__card-icon" />}
              subtitle="Mild"
            />
            <WeatherDetailCard
              title="Wind"
              content={`${Math.round(displayedWeather?.wind_speed || 0)} mph`}
              icon={<WindIcon className="dashboard__card-icon" />}
              subtitle={displayedWeather?.getWindDirection() || ""}
            />
            <WeatherDetailCard
              title="Visibility"
              content={`${Math.round(displayedWeather?.visibility || 0)} ft`}
              icon={<EyeIcon className="dashboard__card-icon" />}
              subtitle="Good"
            />
          </div>
        </div>
      </main>
    </article>
  );
}
