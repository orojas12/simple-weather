import React, { useState, createContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, useWeather, WeatherContext } from "hooks";
import { LocationContext } from "hooks/useLocation";
import { SettingsProvider } from "context";
import { Navbar, Toast, ToastContext, ToastProps } from "components";
import "./app.css";

export default function App() {
  const location = useLocation();
  const { weather, update, isLoading, error } = useWeather(
    location.data.activeLocation.lat,
    location.data.activeLocation.lng
  );
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [toastActive, setToastActive] = useState(false);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);
  const toastActiveTimeout = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (error) {
      setToast({
        type: "alert",
        msg: "Something went wrong. Please try again later.",
      });
    }
  }, [error]);

  return (
    <div className="App">
      <Navbar />
      <main>
        <SettingsProvider>
          <LocationContext.Provider value={location}>
            <WeatherContext.Provider
              value={{ weather, update, isLoading, error }}
            >
              <ToastContext.Provider value={{ setToast }}>
                <Outlet />
              </ToastContext.Provider>
            </WeatherContext.Provider>
          </LocationContext.Provider>
        </SettingsProvider>
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
