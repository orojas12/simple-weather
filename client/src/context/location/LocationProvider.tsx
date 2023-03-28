import useGeocode from "hooks/useGeocode";
import { Place } from "hooks/usePlaceAutocomplete";
import React, { useReducer, useEffect, createContext } from "react";
import { LocationState, locationReducer, Location } from "./locationReducer";

interface ILocationContext {
  data: LocationState;
  addLocation: (place: Place) => void;
  deleteLocation: (location: Location) => void;
  setLocation: (location: Location) => void;
  setFavorite: (location: Location) => void;
  removeFavorite: () => void;
  clearStatus: () => void;
}

export const LocationContext = createContext<ILocationContext | null>(null);

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
  status: {
    error: false,
    msg: null,
  },
};

function loadLocationData(): LocationState {
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
    data.status = {
      error: false,
      msg: null,
    };
    return data;
  } else {
    return initialLocationData;
  }
}

export function LocationProvider(props: { children?: React.ReactNode }) {
  const [state, dispatch] = useReducer(locationReducer, loadLocationData());
  const { geocode } = useGeocode();

  useEffect(() => {
    // Do not save status to localStorage
    const { status, ...data } = state;
    localStorage.setItem("locations", JSON.stringify(data));
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

  return (
    <LocationContext.Provider
      value={{
        data: state,
        addLocation,
        deleteLocation,
        setLocation,
        setFavorite,
        removeFavorite,
        clearStatus,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
}
