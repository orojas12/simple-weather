import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "layout";
import "./app.css";

export default function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
