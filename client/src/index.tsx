import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ErrorPage, DashboardPage, LocationsPage, MapPage } from "pages";
import AddLocationPage from "./pages/LocationsPage/AddLocationPage";

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
      { path: "settings", element: <div>Settings</div> },
    ],
  },
]);
const element = document.getElementById("root");
const root = ReactDOM.createRoot(element!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
