import React, { createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, useWeather, WeatherContext } from "hooks";
import { LocationContext } from "hooks/useLocation";
import { Navbar } from "components";
import "./app.css";

export default function App() {
  const location = useLocation();
  const { weather, updateWeather, setCoords } = useWeather(
    location.data.activeLocation.lat,
    location.data.activeLocation.lat
  );

  useEffect(() => {
    setCoords({
      latitude: location.data.activeLocation.lat,
      longitude: location.data.activeLocation.lng,
    });
  }, [location.data.activeLocation.placeId]);

  return (
    <div className="App">
      <Navbar />
      <main>
        <LocationContext.Provider value={location}>
          <WeatherContext.Provider value={weather}>
            <Outlet />
          </WeatherContext.Provider>
        </LocationContext.Provider>
      </main>
    </div>
  );
}
