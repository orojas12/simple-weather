import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, useWeather, WeatherContext } from "hooks";
import { LocationContext } from "hooks/useLocation";
import { Navbar } from "components";
import "./app.css";

export default function App() {
  const location = useLocation();
  const { weather, updateWeather, setCoords } = useWeather(31.77, -106.46);

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
