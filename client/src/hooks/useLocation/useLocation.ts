import useGeocode from "hooks/useGeocode";
import { useReducer, useEffect, createContext } from "react";
import { Place, geocode } from "services";
import { locationReducer, Location } from "./location";

export const LocationContext = createContext<ReturnType<
  typeof useLocation
> | null>(null);

const initialLocationData = {
  activeLocation: {
    placeId: "ChIJaTv-xYs_54YRIgKdq-OEkeM",
    description: "El Paso, TX, USA",
    mainText: "El Paso",
    secondaryText: "TX, USA",
    lat: 31.7618778,
    lng: -106.4850217,
  },
  savedLocations: [
    {
      placeId: "ChIJaTv-xYs_54YRIgKdq-OEkeM",
      description: "El Paso, TX, USA",
      mainText: "El Paso",
      secondaryText: "TX, USA",
      lat: 31.7618778,
      lng: -106.4850217,
    },
  ],
  favoriteLocation: undefined,
  defaultLocation: {
    placeId: "ChIJaTv-xYs_54YRIgKdq-OEkeM",
    description: "El Paso, TX, USA",
    mainText: "El Paso",
    secondaryText: "TX, USA",
    lat: 31.7618778,
    lng: -106.4850217,
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
