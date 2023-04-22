import React from "react";
import { Outlet } from "react-router-dom";
import { BaseLayout, Navbar } from "@/components";
import { ErrorBoundary } from "./error";
import { WeatherRoutes } from "@/features/weather";
import { LocationRoutes } from "@/features/locations";
import { MapRoutes } from "@/features/map";
import { SettingsRoutes } from "@/features/settings";

function Layout() {
  return (
    <BaseLayout>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </BaseLayout>
  );
}

export const publicRoutes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <BaseLayout>
        <ErrorBoundary />
      </BaseLayout>
    ),
    children: [
      ...WeatherRoutes,
      ...LocationRoutes,
      ...MapRoutes,
      ...SettingsRoutes,
    ],
  },
];
