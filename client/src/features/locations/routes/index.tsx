import React from "react";
import Locations from "./Locations";
import AddLocation from "./AddLocation";

export const LocationRoutes = [
  { path: "locations", element: <Locations /> },
  {
    path: "locations/add",
    element: <AddLocation />,
  },
];
