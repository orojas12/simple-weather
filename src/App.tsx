import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

import { Search } from "components";

export default function App() {
  const [useCelsius, setUseCelsius] = useState(false);

  return (
    <div className="App">
      <header>
        <div id="controls">
          <Search
            setLocation={(location) => {
              console.log(location);
            }}
          />
        </div>
        <nav></nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
