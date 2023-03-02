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
  status: {
    error: boolean;
    msg: string | null;
  };
}

type ActionType =
  | { type: "add"; location: Location }
  | { type: "delete"; location: Location }
  | { type: "setActive"; location: Location }
  | { type: "setFavorite"; location: Location }
  | { type: "removeFavorite" }
  | { type: "clearStatus" };

export function locationReducer(
  state: LocationState,
  action: ActionType
): LocationState {
  switch (action.type) {
    case "add":
      if (
        state.savedLocations.some(
          (value) => value.placeId === action.location.placeId
        )
      ) {
        return {
          ...state,
          status: {
            error: true,
            msg: `${action.location.description} is already added.`,
          },
        };
      } else {
        return {
          ...state,
          savedLocations: [...state.savedLocations, action.location],
          status: {
            error: false,
            msg: `${action.location.description} added.`,
          },
        };
      }

    case "delete":
      return {
        ...state,

        activeLocation:
          state.activeLocation.placeId === action.location.placeId
            ? state.savedLocations.find(
                (location) => location.placeId !== action.location.placeId
              ) || state.defaultLocation
            : state.activeLocation,

        favoriteLocation:
          state.favoriteLocation?.placeId === action.location.placeId
            ? undefined
            : state.favoriteLocation,

        savedLocations: state.savedLocations.filter((location) => {
          return location.placeId !== action.location.placeId;
        }),

        status: {
          error: false,
          msg: `${action.location.description} deleted.`,
        },
      };

    case "setActive":
      return {
        ...state,
        activeLocation:
          state.savedLocations.find(
            (location) => location.placeId === action.location.placeId
          ) || state.activeLocation,
        status: {
          error: false,
          msg: null,
        },
      };

    case "setFavorite":
      return {
        ...state,
        favoriteLocation: state.savedLocations.find(
          (location) => location.placeId === action.location.placeId
        ),
        status: {
          error: false,
          msg: `Favorited ${action.location.description}.`,
        },
      };

    case "removeFavorite":
      return {
        ...state,
        favoriteLocation: undefined,
        status: {
          error: false,
          msg: `Unfavorited ${state.favoriteLocation?.description}.`,
        },
      };

    case "clearStatus":
      return {
        ...state,
        status: {
          error: false,
          msg: null,
        },
      };

    default:
      return state;
  }
}
