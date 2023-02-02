import { useState, useEffect } from "react";

export default function useGeocoding() {
  const [location, setLocation] = useState(null);

  const geocode = (address: string) => {
    // call geocoding api and update state
  };

  return [location, geocode] as const;
}
