import React, { useState, useContext, useEffect } from "react";
import { Dropdown, Card } from "components";
import { LocationIcon } from "icons/ui";
import {
  CloudyIcon,
  PartlyCloudyIcon,
  RainyIcon,
  SnowIcon,
  ThunderstormIcon,
  SunnyIcon,
  HazeIcon,
  TornadoIcon,
  PrecipitationIcon,
} from "icons/weather";
import {
  LocationContext,
  WeatherContext,
  WeatherData,
  WeatherCurrent,
  WeatherDay,
} from "hooks";
import Clock from "./Clock";
import "./dashboard.css";
import WeatherCard from "./WeatherCard";

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
        <div className="dashboard__cards">
          <WeatherCard
            weather={weather?.current}
            onClick={() => setDisplayedWeather(weather?.current)}
            active={displayedWeather === weather?.current}
          />
          {getDailyCards()}
        </div>
        <div className="dashboard__overview">
          <h1 className="fs-4">{heading}</h1>
        </div>
      </main>
    </article>
  );
}
