import React, { useEffect, useState } from "react";
import { Dropdown, Spinner } from "@/components";
import { LocationIcon } from "@/assets/icons/ui";
import { useLocation } from "@/features/locations";
import { useNotifications } from "@/context/notifications";
import { useSettings } from "@/features/settings";
import { useWeather } from "../api";
import { Clock, Summary, DaysList } from "../components";
import "./dashboard.css";

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
      </main>
    </article>
  );
}
