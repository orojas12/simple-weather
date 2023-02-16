import { useState, useEffect, createContext, useContext } from "react";
import { Place, geocode } from "services";

export const LocationContext = createContext<Location | null>(null);

export interface Location {
  coords: Coords | null;
  place: Place | null;
  setPlace: React.Dispatch<React.SetStateAction<Place | null>>;
}

export interface Coords {
  lat: string;
  lng: string;
}

export default function useLocation(): Location {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [place, setPlace] = useState<Place | null>(null);

  useEffect(() => {
    const getCoordinates = async (placeId: string) => {
      const result = await geocode(placeId);
      if (result) setCoords({ lat: result.lat, lng: result.lng });
    };

    if (place) {
      getCoordinates(place.placeId);
    }
  }, [place]);

  return { coords, place, setPlace };
}
