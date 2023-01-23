import { useState, useEffect } from "react";
import { GeocodeResult, geocode, reverseGeocode } from "./geocode";

export default function useLocation() {
  const [searchResults, setSearchResults] = useState<GeocodeResult[]>(null);
  const [location, setLocation] = useState<GeocodeResult>(null);

  useEffect(() => {
    const getLocation = async (lat: number, lon: number) => {
      const result = await reverseGeocode(lat, lon);
      setLocation(result);
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        getLocation(coords.latitude, coords.longitude);
      },
      (error) => {
        console.error(error.message);
      }
    );
  }, []);

  const search = async (text: string) => {
    let results = await geocode(text);
    if (results.length) {
      results = results.filter((result) => result.country === "US");
    }
    setSearchResults(results);
  };

  return { location, setLocation, searchResults, search };
}
