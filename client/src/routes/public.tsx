import React from "react";
import { BaseLayout } from "@/components";
import { Outlet } from "react-router-dom";
import { ErrorPage, LocationsPage, MapPage, SettingsPage } from "@/pages";
import AddLocationPage from "../pages/LocationsPage/AddLocationPage";
import { WeatherRoutes } from "@/features/weather";

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
      WeatherRoutes,
      { path: "locations", element: <LocationsPage /> },
      { path: "locations/add", element: <AddLocationPage /> },
      { path: "map", element: <MapPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
];
