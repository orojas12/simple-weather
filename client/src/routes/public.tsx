import React from "react";
import { BaseLayout } from "@components";
import { Outlet } from "react-router-dom";
import {
  ErrorPage,
  DashboardPage,
  LocationsPage,
  MapPage,
  SettingsPage,
} from "@pages";
import AddLocationPage from "../pages/LocationsPage/AddLocationPage";

function App() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}

export const publicRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "locations", element: <LocationsPage /> },
      { path: "locations/add", element: <AddLocationPage /> },
      { path: "map", element: <MapPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
];
