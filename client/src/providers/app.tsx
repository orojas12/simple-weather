import React from "react";
import {
  LocationProvider,
  WeatherProvider,
  SettingsProvider,
  NotificationProvider,
} from "@/context";

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
