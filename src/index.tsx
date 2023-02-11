import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ErrorPage, DashboardPage } from "pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "locations", element: <div>Locations</div> },
      { path: "map", element: <div>Weather Map</div> },
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
