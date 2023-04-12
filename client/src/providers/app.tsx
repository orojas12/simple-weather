import React from "react";
import {
  LocationProvider,
  SettingsProvider,
  NotificationProvider,
} from "@/context";
import { WeatherProvider } from "@/features/weather";

export function AppProvider(props: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <NotificationProvider>
        <LocationProvider>
          <WeatherProvider>{props.children}</WeatherProvider>
        </LocationProvider>
      </NotificationProvider>
    </SettingsProvider>
  );
}
