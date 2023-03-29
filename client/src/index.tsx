import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import {
  ErrorPage,
  DashboardPage,
  LocationsPage,
  MapPage,
  SettingsPage,
} from "@pages";
import AddLocationPage from "./pages/LocationsPage/AddLocationPage";
import { SettingsProvider, LocationProvider, WeatherProvider } from "@context";
import "./index.css";

const router = createBrowserRouter([
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
]);
const element = document.getElementById("root");
const root = ReactDOM.createRoot(element!);
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <LocationProvider>
        <WeatherProvider>
          <RouterProvider router={router} />
        </WeatherProvider>
      </LocationProvider>
    </SettingsProvider>
  </React.StrictMode>
);
