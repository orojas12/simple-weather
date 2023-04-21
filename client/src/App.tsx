import React from "react";
import { AppProvider } from "@/providers/app";
import { AppRouter } from "@/routes";
import { Notifications } from "@/components";
import "./app.css";

export default function App() {
  return (
    <AppProvider>
      <Notifications />
      <AppRouter />
    </AppProvider>
  );
}
