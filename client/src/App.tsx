import React, { useState, createContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, useWeather, WeatherContext } from "hooks";
import { LocationContext } from "hooks/useLocation";
import { Navbar, Toast, ToastContext, ToastProps } from "components";
import "./app.css";

export default function App() {
  const location = useLocation();
  const { weather, updateWeather, setCoords } = useWeather(
    location.data.activeLocation.lat,
    location.data.activeLocation.lat
  );
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [toastActive, setToastActive] = useState(false);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);
  const toastActiveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCoords({
      latitude: location.data.activeLocation.lat,
      longitude: location.data.activeLocation.lng,
    });
  }, [location.data.activeLocation.placeId]);

  useEffect(() => {
    if (toast) {
      setToastActive(true);
      toastTimeout.current = setTimeout(() => {
        setToast(null);
      }, 8000);
    }

    return () => clearTimeout(toastTimeout.current || undefined);
  }, [toast]);

  useEffect(() => {
    if (toastActive) {
      toastActiveTimeout.current = setTimeout(() => {
        setToastActive(false);
      }, 6000);
    }

    return () => clearTimeout(toastActiveTimeout.current || undefined);
  }, [toastActive]);

  return (
    <div className="App">
      <Navbar />
      <main>
        <LocationContext.Provider value={location}>
          <WeatherContext.Provider value={weather}>
            <ToastContext.Provider value={{ setToast }}>
              <Outlet />
            </ToastContext.Provider>
          </WeatherContext.Provider>
        </LocationContext.Provider>
      </main>
      <Toast
        type={toast?.type}
        msg={toast?.msg}
        active={toastActive}
        display={Boolean(toast)}
        onClick={() => setToastActive(false)}
      />
    </div>
  );
}
