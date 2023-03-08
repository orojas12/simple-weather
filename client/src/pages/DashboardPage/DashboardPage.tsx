import React, { useState, useContext, useEffect } from "react";
import { Dropdown, Spinner } from "components";
import { LocationIcon } from "icons/ui";
import {
  Weather,
  WeatherContext,
  WeatherCurrent,
  WeatherDay,
} from "hooks/useWeather";
import { LocationContext } from "hooks/useLocation";
import Clock from "./Clock";
import WeatherCard from "./WeatherCard";
import WeatherAlertAccordian from "./WeatherAlertAccordian";
import CurrentWeatherOverview from "./CurrentWeatherOverview";
import DailyWeatherOverview from "./DailyWeatherOverview";
import "./dashboard.css";

function getDashboardHeading(weather: Weather | undefined, location: string) {
  let heading = "";
  if (weather instanceof WeatherCurrent) {
    heading = `Currently in ${location}`;
  } else if (weather instanceof WeatherDay) {
    if (weather.isToday()) {
      heading = `Today in ${location}`;
    } else {
      heading = `${weather?.getWeekDayString()} in ${location}`;
    }
  }
  return heading;
}

function getDailyCardPlaceholders() {
  const days = Array(8).fill(undefined);
  return days.map((day, i) => {
    return (
      <WeatherCard key={i} weather={day} onClick={() => {}} active={false} />
    );
  });
}

function getDailyCards(
  days: WeatherDay[],
  onCardClick: (day: WeatherDay) => void,
  activeWeather: WeatherCurrent | WeatherDay | undefined
) {
  return days.map((day, i) => {
    return (
      <WeatherCard
        key={i}
        weather={day}
        onClick={() => onCardClick(day)}
        active={activeWeather && activeWeather === day}
      />
    );
  });
}

export default function DashboardPage() {
  const location = useContext(LocationContext);
  const { weather, update, isLoading } = useContext(WeatherContext);
  const [displayedWeather, setDisplayedWeather] = useState<
    WeatherCurrent | WeatherDay | undefined
  >(weather?.current);

  useEffect(() => {
    setDisplayedWeather(weather?.current);
  }, [weather]);

  const dailyCards =
    isLoading || !weather?.daily
      ? getDailyCardPlaceholders()
      : getDailyCards(
          weather.daily,
          (day) => setDisplayedWeather(day),
          displayedWeather
        );

  const heading = getDashboardHeading(
    displayedWeather,
    location?.data.activeLocation.description as string
  );

  const hour24Labels = weather?.hourly.slice(0, 25).map((hour) =>
    hour.dt.toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    })
  );

  const hourlyPrecipData = {
    labels: hour24Labels as string[],
    datasets: [
      {
        label: "Precipitation",
        data: weather?.hourly
          .slice(0, 25)
          .map((hour) => hour.pop * 100) as number[],
      },
    ],
  };

  const hourlyWindData = {
    labels: hour24Labels as string[],
    datasets: [
      {
        label: "Wind Speed",
        data: weather?.hourly
          .slice(0, 25)
          .map((hour) => hour.wind_speed) as number[],
      },
    ],
  };

  const hourlyTempData = {
    labels: hour24Labels as string[],
    datasets: [
      {
        label: "Temperature",
        data: weather?.hourly
          .slice(0, 25)
          .map((hour) => hour.getTemp()) as number[],
      },
    ],
  };

  return (
    <article className="dashboard">
      <header>
        <Clock />
        <Dropdown id="dropdown_location" size="small">
          <Dropdown.Toggle>
            <LocationIcon className="dashboard__location-icon" />
            {location?.data.activeLocation.description}
            <Dropdown.ToggleIcon />
          </Dropdown.Toggle>
          <Dropdown.Menu
            align="end"
            items={
              location?.data.savedLocations.map((value) => {
                return {
                  content: value.description,
                  action: () => location.setLocation(value),
                };
              }) || []
            }
          />
        </Dropdown>
      </header>
      <main>
        <div className="dashboard__days">
          <WeatherCard
            weather={isLoading ? undefined : weather?.current}
            onClick={() => setDisplayedWeather(weather?.current)}
            active={displayedWeather === weather?.current}
          />
          {dailyCards}
        </div>
        <div className="dashboard__overview">
          <h1 className="dashboard__heading">{heading}</h1>
          <div className="dashboard__alerts">
            {weather?.alerts?.map((alert) => (
              <WeatherAlertAccordian key={alert.event} alert={alert} />
            ))}
          </div>
          {isLoading || !displayedWeather ? (
            <div className="dashboard__loader">
              <Spinner />
            </div>
          ) : displayedWeather instanceof WeatherCurrent ? (
            <CurrentWeatherOverview
              weather={displayedWeather}
              hourlyPrecipData={hourlyPrecipData}
              hourlyWindData={hourlyWindData}
              hourlyTempData={hourlyTempData}
            />
          ) : (
            <DailyWeatherOverview weather={displayedWeather as WeatherDay} />
          )}
        </div>
      </main>
    </article>
  );
}
