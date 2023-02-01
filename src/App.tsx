import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

import Combobox from "./components/Combobox/Combobox";

export default function App() {
  const [useCelsius, setUseCelsius] = useState(false);

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
