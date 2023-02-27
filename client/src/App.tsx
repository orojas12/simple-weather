import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import {
  useLocation,
  LocationContext,
  useWeather,
  WeatherContext,
} from "hooks";
import { Navbar } from "components";
import "./app.css";

export default function App() {
  const location = useLocation();
  const { weather, updateWeather, setCoords } = useWeather(33.44, -94.04);

  location.place = {
    placeId: "1",
    description: "El Paso, TX, USA",
    mainText: "El Paso",
    secondaryText: "TX, USA",
  };

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
