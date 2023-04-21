import React, { useEffect, useState } from "react";
import { useSettings, useWeather } from "@/hooks";
import { Dropdown, Spinner } from "@/components";
import { LocationIcon } from "@/assets/icons/ui";
import { useLocation } from "@/features/locations";
import Clock from "../components/Clock";
import DaysList from "../components/DaysList";
import "./dashboard.css";
import Summary from "../components/Summary";
import { useNotifications } from "@/context/notifications";

export default function Dashboard() {
  const settings = useSettings();
  const location = useLocation();
  const weather = useWeather();
  const { addNotification } = useNotifications();
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (weather.error) {
      addNotification({ type: "error", message: weather.error.message });
    }
  }, [weather.error]);

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
        <DaysList
          units={settings.get("units")}
          day={selectedDay}
          days={weather?.data?.daily}
          setDay={(day) => setSelectedDay(day)}
          isLoading={weather.isLoading}
        />
        {weather.isLoading || !weather.data ? (
          <div className="dashboard__loader">
            <Spinner />
          </div>
        ) : (
          <Summary
            units={settings.get("units")}
            day={selectedDay}
            weather={weather.data}
            location={location.data.activeLocation.description}
          />
        )}

        {/* <div className="dashboard__overview">
          
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
              weather={weather.data as IWeather}
            />
          ) : (
            <DailyWeatherOverview
              units={settings.get("units")}
              weather={displayedWeather as WeatherDay}
            />
          )}
        </div> */}
      </main>
    </article>
  );
}
