import React from "react";
import { BaseLayout } from "@/components";
import { Outlet } from "react-router-dom";
import { ErrorPage } from "@/pages";
import { WeatherRoutes } from "@/features/weather";
import { LocationRoutes } from "@/features/locations";
import { MapRoutes } from "@/features/map";
import { SettingsRoutes } from "@/features/settings";

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
      ...MapRoutes,
      ...SettingsRoutes,
    ],
  },
];
