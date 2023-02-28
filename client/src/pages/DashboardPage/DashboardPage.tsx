import React, { useState, useContext, useEffect } from "react";
import { Dropdown, Progress } from "components";
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
import WeatherAlertAccordian from "./WeatherAlertAccordian";
import WeatherChart from "./WeatherChart";
import { TempIcon, WindIcon } from "icons/weather";

export default function DashboardPage() {
  const location = useContext(LocationContext);
  const weather = useContext(WeatherContext);
  const [displayedWeather, setDisplayedWeather] = useState<
    WeatherCurrent | WeatherDay | undefined
  >(weather?.current);
  const [isCurrent, setIsCurrent] = useState(true);

  useEffect(() => {
    setDisplayedWeather(weather?.current);
  }, [weather]);

  useEffect(() => {
    setIsCurrent(displayedWeather instanceof WeatherCurrent);
  }, [displayedWeather]);

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

  if (isCurrent) {
    heading = `Currently in ${locationString}`;
  } else if (displayedWeather?.isToday()) {
    heading = `Today in ${locationString}`;
  } else {
    heading = `${displayedWeather?.getWeekDayString()} in ${locationString}`;
  }

  const hourLabels = weather?.hourly.slice(0, 25).map((hour) =>
    hour.dt.toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    })
  );
  const precipitationData = weather?.hourly
    .slice(0, 25)
    .map((hour) => hour.pop);
  const windData = weather?.hourly.slice(0, 25).map((hour) => hour.wind_speed);
  const temperatureData = weather?.hourly
    .slice(0, 25)
    .map((hour) => hour.getTemp());

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
          <div className="dashboard__alerts">
            {weather?.alerts?.map((alert) => (
              <WeatherAlertAccordian alert={alert} />
            ))}
          </div>
          <div className="dashboard__cards">
            {isCurrent ? (
              <WeatherDetailCard
                title="Current"
                content={`${weather?.current.getTemp()}\u00b0`}
                icon={
                  WeatherIcon ? (
                    <WeatherIcon className="dashboard__current-icon" />
                  ) : null
                }
                subtitle={displayedWeather?.condition.description || ""}
              />
            ) : null}
            <WeatherDetailCard
              title="High/Low"
              content={`${
                displayedWeather instanceof WeatherDay
                  ? displayedWeather.getMaxTemp()
                  : weather?.daily[0].getMaxTemp()
              }\u00b0/${
                displayedWeather instanceof WeatherDay
                  ? displayedWeather.getMinTemp()
                  : weather?.daily[0].getMinTemp()
              }\u00b0`}
              icon={<TempIcon className="dashboard__card-icon" />}
              subtitle={
                displayedWeather instanceof WeatherDay
                  ? displayedWeather.getTempDesc()
                  : weather?.daily[0].getTempDesc() || ""
              }
            />
            <WeatherDetailCard
              title="Wind"
              content={`${Math.round(displayedWeather?.wind_speed || 0)} mph`}
              icon={<WindIcon className="dashboard__card-icon" />}
              subtitle={`${
                displayedWeather?.getWindDirection() || ""
              } - Gusts of ${Math.round(displayedWeather?.wind_gust || 0)} mph`}
            />
            {isCurrent ? (
              <WeatherDetailCard
                title="Visibility"
                content={`${Math.round(displayedWeather?.visibility || 0)} ft`}
                icon={<EyeIcon className="dashboard__card-icon" />}
                subtitle="Good"
              />
            ) : null}
            <WeatherDetailCard
              title="UV Index"
              content={displayedWeather?.uvi}
              icon={
                <div className="dashboard__uvi-progress-wrapper">
                  <Progress
                    type="vertical"
                    value={displayedWeather?.getUviPercentage()!}
                  />
                </div>
              }
              subtitle={displayedWeather?.getUviCategory()!}
            />
            <WeatherChart
              className="dashboard__precipitation-card"
              type="bar"
              title="Precipitation"
              data={{
                labels: hourLabels as string[],
                datasets: [
                  {
                    label: "Precipitation",
                    data: precipitationData,
                  },
                ],
              }}
              yMax={1}
            />
            <WeatherChart
              className="dashboard__wind-speed-card"
              type="line"
              title="Wind Speed"
              data={{
                labels: hourLabels as string[],
                datasets: [
                  {
                    label: "Wind Speed (mph)",
                    data: windData,
                  },
                ],
              }}
              yMax={100}
            />
            <WeatherChart
              className="dashboard__temperature-card"
              type="line"
              title="Temperature"
              data={{
                labels: hourLabels as string[],
                datasets: [
                  {
                    label: "Temperature (F)",
                    data: temperatureData,
                  },
                ],
              }}
              yMax={100}
            />
          </div>
        </div>
      </main>
    </article>
  );
}
