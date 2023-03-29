import React, { useEffect, useState } from "react";
import L from "leaflet";
import { useLocation } from "@hooks";
import "./map.css";

export default function MapPage() {
  const location = useLocation();

  const [layer, setLayer] = useState("precipitation");

  useEffect(() => {
    if (location) {
      const { lat, lng } = location.data.activeLocation;
      const map = L.map("weather-map").setView([lat, lng], 10);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 14,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.tileLayer(`/api/tile/${layer}/{z}/{x}/{y}.png`, {
        maxZoom: 14,
        zIndex: 2,
      }).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [layer]);

  return (
    <div className="map">
      <select
        name="layer"
        id="layer-select"
        onChange={(e) => setLayer(e.target.value)}
      >
        <option value="precipitation">Precipitation</option>
        <option value="temp_new">Temperature</option>
        <option value="clouds">Clouds</option>
        <option value="wind_new">Wind Speed</option>
      </select>
      <div id="weather-map"></div>
    </div>
  );
}
