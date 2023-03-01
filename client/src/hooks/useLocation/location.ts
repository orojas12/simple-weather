export interface Location {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  lat: number;
  lng: number;
}

interface LocationState {
  activeLocation: Location;
  savedLocations: Location[] | [];
  favoriteLocation: Location | undefined;
  defaultLocation: Location;
}

type ActionType =
  | { type: "add"; location: Location }
  | { type: "delete"; placeId: string }
  | { type: "setActive"; placeId: string }
  | { type: "setFavorite"; placeId: string }
  | { type: "removeFavorite" };

export function locationReducer(
  state: LocationState,
  action: ActionType
): LocationState {
  switch (action.type) {
    case "add":
      return {
        ...state,
        savedLocations: [...state.savedLocations, action.location],
      };

    case "delete":
      return {
        ...state,

        activeLocation:
          state.activeLocation.placeId === action.placeId
            ? state.savedLocations.find(
                (location) => location.placeId !== action.placeId
              ) || state.defaultLocation
            : state.activeLocation,

        favoriteLocation:
          state.favoriteLocation?.placeId === action.placeId
            ? undefined
            : state.favoriteLocation,

        savedLocations: state.savedLocations.filter((location) => {
          return location.placeId !== action.placeId;
        }),
      };

    case "setActive":
      return {
        ...state,
        activeLocation:
          state.savedLocations.find(
            (location) => location.placeId === action.placeId
          ) || state.activeLocation,
      };

    case "setFavorite":
      return {
        ...state,
        favoriteLocation: state.savedLocations.find(
          (location) => location.placeId === action.placeId
        ),
      };

    case "removeFavorite":
      return {
        ...state,
        favoriteLocation: undefined,
      };

    default:
      return state;
  }
}
