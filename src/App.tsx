import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "layout";
import "./app.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
