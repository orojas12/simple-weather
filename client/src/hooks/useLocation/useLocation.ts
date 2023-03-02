import useGeocode from "hooks/useGeocode";
import { useReducer, useEffect, createContext } from "react";
import { Place, geocode } from "services";
import { locationReducer, Location } from "./location";

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
  const json = localStorage.getItem("locations");
  if (json) {
    const data = JSON.parse(json);
    if (data.favoriteLocation) {
      data.activeLocation = data.favoriteLocation;
    } else if (data.savedLocations.length) {
      data.activeLocation = data.savedLocations[0];
    } else {
      data.activeLocation = data.defaultLocation;
    }
    return data;
  } else {
    return initialLocationData;
  }
}

export default function useLocation() {
  const [state, dispatch] = useReducer(locationReducer, loadLocationData());
  const { geocode } = useGeocode();

  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(state));
  }, [state]);

  const addLocation = async (place: Place) => {
    const result = await geocode(place.placeId);
    if (result) {
      dispatch({
        type: "add",
        location: { ...place, lat: result.lat, lng: result.lng },
      });
    }
  };

  const deleteLocation = (location: Location) => {
    dispatch({ type: "delete", location });
  };

  const setLocation = (location: Location) => {
    dispatch({ type: "setActive", location });
  };

  const setFavorite = (location: Location) => {
    dispatch({ type: "setFavorite", location });
  };

  const removeFavorite = () => {
    dispatch({ type: "removeFavorite" });
  };

  const clearStatus = () => {
    dispatch({ type: "clearStatus" });
  };

  return {
    data: state,
    addLocation,
    deleteLocation,
    setLocation,
    setFavorite,
    removeFavorite,
    clearStatus,
  };
}
