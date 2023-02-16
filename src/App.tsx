import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, Location } from "hooks";
import { Navbar } from "layout";
import "./app.css";

const LocationContext = createContext<Location | null>(null);

export default function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <main>
        <LocationContext.Provider value={location}>
          <Outlet />
        </LocationContext.Provider>
      </main>
    </div>
  );
}
