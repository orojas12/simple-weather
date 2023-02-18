import React, { useState, useContext } from "react";
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
import { LocationContext, WeatherContext, WeatherData } from "hooks";
import Clock from "./Clock";
import "./dashboard.css";
import DailyWeatherCard from "./DailyWeatherCard";

export default function DashboardPage() {
  const location = useContext(LocationContext);
  const weather = useContext(WeatherContext);
  const [currentCard, setCurrentCard] = useState(0);

  const getCards = () => {
    return weather?.daily.map((day, i) => {
      const isToday = day.isToday();

      return (
        <DailyWeatherCard
          key={i}
          weather={day}
          onClick={() => setCurrentCard(i)}
          active={currentCard === i}
        />
      );
    });
  };

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
        <div className="dashboard__cards">{getCards()}</div>
      </main>
    </article>
  );
}
