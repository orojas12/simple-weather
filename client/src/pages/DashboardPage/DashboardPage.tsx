import React, { useState, useEffect } from "react";
import { useSettings, useLocation, useWeather } from "@hooks";
import { Weather, WeatherCurrent, WeatherDay } from "@lib/weather";
import { Dropdown, Spinner } from "@components";
import { LocationIcon } from "@icons/ui";
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

interface DailyCardsProps {
  days: WeatherDay[];
  onCardClick: (day: WeatherDay) => void;
  activeWeather: WeatherCurrent | WeatherDay | undefined;
  units: string;
}

function DailyCards(props: DailyCardsProps) {
  return (
    <>
      {props.days.map((day, i) => {
        return (
          <WeatherCard
            key={i}
            weather={day}
            onClick={() => props.onCardClick(day)}
            active={props.activeWeather && props.activeWeather === day}
            units={props.units}
          />
        );
      })}
    </>
  );
}

function DailyCardPlaceholders() {
  const days = Array(8).fill(undefined);
  return (
    <>
      {days.map((day, i) => {
        return (
          <WeatherCard
            key={i}
            weather={day}
            onClick={() => {}}
            active={false}
            units="imperial"
          />
        );
      })}
    </>
  );
}

export default function DashboardPage() {
  const settings = useSettings();
  const location = useLocation();
  const weather = useWeather();
  const [displayedWeather, setDisplayedWeather] = useState<
    WeatherCurrent | WeatherDay | undefined
  >(weather.data?.current);

  useEffect(() => {
    setDisplayedWeather(weather.data?.current);
  }, [weather]);

  const heading = getDashboardHeading(
    displayedWeather,
    location?.data.activeLocation.description as string
  );

  const hour24Labels = weather.data?.hourly.slice(0, 25).map((hour) =>
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
        data: weather.data?.hourly
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
        data: weather.data?.hourly
          .slice(0, 25)
          .map((hour) => hour.getWindSpeed(settings.get("units"))) as number[],
      },
    ],
  };

  const hourlyTempData = {
    labels: hour24Labels as string[],
    datasets: [
      {
        label: "Temperature",
        data: weather.data?.hourly
          .slice(0, 25)
          .map((hour) => hour.getTemp(settings.get("units"))) as number[],
      },
    ],
  };

  return (
    <article className="dashboard">
      <header>
        <Clock />
        <Dropdown id="dropdown_location" className="dashboard__dropdown">
          <Dropdown.Toggle className="flex justify-between">
            <div>
              <LocationIcon className="dashboard__location-icon" />
              {location?.data.activeLocation.description}
            </div>
            <Dropdown.ToggleIcon />
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dashboard__dropdown"
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
            units={settings.get("units")}
            weather={weather.data?.current}
            onClick={() => setDisplayedWeather(weather.data?.current)}
            active={displayedWeather === weather.data?.current}
          />
          {weather.isLoading ? (
            <DailyCardPlaceholders />
          ) : (
            <DailyCards
              days={weather.data!.daily}
              onCardClick={(day) => setDisplayedWeather(day)}
              activeWeather={displayedWeather}
              units={settings.get("units")}
            />
          )}
        </div>
        <div className="dashboard__overview">
          <h1 className="dashboard__heading">{heading}</h1>
          <div className="dashboard__alerts">
            {weather.data?.alerts.map((alert) => (
              <WeatherAlertAccordian key={alert.event} alert={alert} />
            ))}
          </div>
          {weather.isLoading || !displayedWeather ? (
            <div className="dashboard__loader">
              <Spinner />
            </div>
          ) : displayedWeather instanceof WeatherCurrent ? (
            <CurrentWeatherOverview
              units={settings.get("units")}
              weather={displayedWeather}
              hourlyPrecipData={hourlyPrecipData}
              hourlyWindData={hourlyWindData}
              hourlyTempData={hourlyTempData}
            />
          ) : (
            <DailyWeatherOverview
              units={settings.get("units")}
              weather={displayedWeather as WeatherDay}
            />
          )}
        </div>
      </main>
    </article>
  );
}
