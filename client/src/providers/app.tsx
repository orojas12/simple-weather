import React from "react";
import { NotificationProvider } from "@/context";
import { WeatherProvider } from "@/features/weather";
import { SettingsProvider } from "@/features/settings";
import { LocationProvider } from "@/features/locations";

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
