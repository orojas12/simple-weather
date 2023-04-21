import React from "react";
import { BaseLayout } from "@/components";
import { Outlet } from "react-router-dom";
import { ErrorPage, MapPage, SettingsPage } from "@/pages";
import { WeatherRoutes } from "@/features/weather";
import { LocationRoutes } from "@/features/locations";

function Layout() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}

export const publicRoutes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      ...WeatherRoutes,
      ...LocationRoutes,
      { path: "map", element: <MapPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
];
