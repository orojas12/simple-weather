import React from "react";
import { AppProvider } from "@providers/app";
import { AppRouter } from "@routes";
import "./app.css";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
