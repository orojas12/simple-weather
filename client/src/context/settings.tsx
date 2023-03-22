import React, { createContext, useEffect, useState } from "react";

interface AppSettings {
  units: "imperial" | "metric";
  useCurrentLocation: boolean;
}

export const SettingsContext = createContext<{
  get: (name: string) => any;
  set: (name: string, value: any) => void;
} | null>(null);

function loadSettings(): AppSettings {
  const settings = localStorage.getItem("settings");
  if (settings) {
    return JSON.parse(settings);
  } else {
    return {
      // defaults
      units: "imperial",
      useCurrentLocation: false,
    };
  }
}

export function SettingsProvider(props: { children?: React.ReactNode }) {
  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const get = (name: string) => {
    return settings[name as keyof AppSettings] ?? null;
  };

  const set = (name: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <SettingsContext.Provider value={{ get, set }}>
      {props.children}
    </SettingsContext.Provider>
  );
}
