import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

import Combobox from "./components/Combobox/Combobox";
import search from "./icons/search.svg";
import location from "./icons/location.svg";

export default function App() {
  const [useCelsius, setUseCelsius] = useState(false);

  const searchIcon = (
    <img src={search} style={{ height: "100%", width: "100%" }} />
  );
  const locationIcon = (
    <img src={location} style={{ height: "100%", width: "100%" }} />
  );

  return (
    <div className="App">
      <header>
        <div id="controls">
          <Combobox<number>
            id="ComboBox1"
            label="Location"
            items={[
              { id: "1", text: "test1", data: 1 },
              { id: "2", text: "test2", data: 2 },
            ]}
            select={(num) => {
              console.log(num);
            }}
            inputIcon={searchIcon}
            itemIcon={locationIcon}
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
