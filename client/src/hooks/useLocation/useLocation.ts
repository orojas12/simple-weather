import { useReducer, useEffect, createContext } from "react";
import { Place, geocode } from "services";
import { locationReducer } from "./location";

export const LocationContext = createContext<ReturnType<
  typeof useLocation
> | null>(null);

const initialLocationData = {
  activeLocation: {
    placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
    description: "Paris, France",
    mainText: "Paris",
    secondaryText: "France",
    lat: 48.86,
    lng: 2.34,
  },
  savedLocations: [
    {
      description: "Paris, France",
      placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
      mainText: "Paris",
      secondaryText: "France",
      lat: 48.86,
      lng: 2.34,
    },
    {
      description: "Paris, TX, USA",
      placeId: "ChIJmysnFgZYSoYRSfPTL2YJuck",
      mainText: "Paris",
      secondaryText: "TX, USA",
      lat: 33.65,
      lng: -95.54,
    },
    {
      description: "Paris, TN, USA",
      placeId: "ChIJ4zHP-Sije4gRBDEsVxunOWg",
      mainText: "Paris",
      secondaryText: "TN, USA",
      lat: 36.3,
      lng: -88.3,
    },
    {
      description: "Paris, Brant, ON, Canada",
      placeId: "ChIJsamfQbVtLIgR-X18G75Hyi0",
      mainText: "Paris",
      secondaryText: "Brant, ON, Canada",
      lat: 43.19,
      lng: -80.38,
    },
    {
      description: "Paris, KY, USA",
      placeId: "ChIJsU7_xMfKQ4gReI89RJn0-RQ",
      mainText: "Paris",
      secondaryText: "KY, USA",
      lat: 38.2,
      lng: -84.27,
    },
  ],
  favoriteLocation: undefined,
  defaultLocation: {
    placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
    description: "Paris, France",
    mainText: "Paris",
    secondaryText: "France",
    lat: 48.86,
    lng: 2.34,
  },
};

function loadLocationData() {
  const data = localStorage.getItem("locations");
  if (data) {
    return JSON.parse(data);
  } else {
    return initialLocationData;
  }
}

export default function useLocation() {
  const [state, dispatch] = useReducer(locationReducer, loadLocationData());

  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(state));
  }, [state]);

  const addLocation = async (place: Place) => {
    console.log("Added location");
  };

  const deleteLocation = (placeId: string) => {
    dispatch({ type: "delete", placeId });
  };

  const setLocation = (placeId: string) => {
    dispatch({ type: "setActive", placeId });
  };

  const setFavorite = (placeId: string) => {
    dispatch({ type: "setFavorite", placeId });
  };

  const removeFavorite = () => {
    dispatch({ type: "removeFavorite" });
  };

  return {
    data: state,
    addLocation,
    deleteLocation,
    setLocation,
    setFavorite,
    removeFavorite,
  };
}
