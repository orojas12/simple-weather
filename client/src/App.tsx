import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useWeather } from "@hooks";
import { Navbar, Toast, ToastContext, ToastProps } from "@components";
import "./app.css";

export default function App() {
  const weather = useWeather();
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
    if (weather.error) {
      setToast({
        type: "alert",
        msg: "Something went wrong. Please try again later.",
      });
    }
  }, [weather.error]);

  return (
    <article className="App">
      <Navbar />
      <main>
        <ToastContext.Provider value={{ setToast }}>
          <Outlet />
        </ToastContext.Provider>
      </main>
      <Toast
        type={toast?.type}
        msg={toast?.msg}
        active={toastActive}
        display={Boolean(toast)}
        onClick={() => setToastActive(false)}
      />
    </article>
  );
}
