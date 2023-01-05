import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Forecast from "./components/Forecast/Forecast";
import Weather from "./weather/Weather";
import { getWeather, geocode, reverseGeocode } from "./utilities";
import WeatherCurrent from "./weather/WeatherCurrent";
import WeatherHour from "./weather/WeatherHour";
import WeatherDay from "./weather/WeatherDay";
import WeatherAlert from "./weather/WeatherAlert";
import useWeather from "./weather/useWeather";

/**
 * Gets the user's current coordinates.
 */
const getUserLocation = async (
  cb: (location: { latitude: number; longitude: number }) => void
) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      cb({ latitude, longitude });
    },
    (error) => {
      throw error;
    }
  );
};

export default function App() {
  const [weather, updateWeather] = useWeather(43, -75);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>(null);
  const [city, setCity] = useState<string>(null);
  const [state, setState] = useState<string>(null);
  const [useCelsius, setUseCelsius] = useState(false);

  useEffect(() => {
    getUserLocation(setLocation);
  }, []);

  useEffect(() => {
    if (!location) return;
    const setCityAndState = async () => {
      const data = await reverseGeocode([
        location.latitude,
        location.longitude,
      ]);
      const city = data.city
        .split(" ")
        .map((str: any) => `${str.slice(0, 1)}${str.slice(1).toLowerCase()}`)
        .join(" ");
      setCity(city);
      setState(data.state);
    };

    updateWeather({
      latitude: location.latitude,
      longitude: location.longitude,
    });
    setCityAndState();
  }, [location]);

  const handleSubmit = async (e: FormEvent, text: string) => {
    e.preventDefault();
    const { latt, longt } = await geocode(text);
    setLocation({ latitude: latt, longitude: longt });
  };

  const cityAndState = city && state ? `${city}, ${state}` : "";

  return (
    <div className="App">
      <Navigation
        onSubmit={handleSubmit}
        onScaleSwitch={() => {
          setUseCelsius((prevState) => !prevState);
        }}
        cityAndState={cityAndState}
        useCelsius={useCelsius}
      />
      {/* <CurrentWeather
        weather={this.state.weather}
        tempScale={this.state.tempScale}
        locale={this.state.locale}
      />
      <Forecast
        locale={this.state.locale}
        tempScale={this.state.tempScale}
        weather={this.state.weather}
      /> */}
    </div>
  );
}

// interface AppState {
//   locale: string;
//   searchInput: string;
//   location: {
//     city: string;
//     state: string;
//     coords: number[];
//   };
//   weather: {
//     current: WeatherCurrent;
//     hourly: WeatherHour[];
//     daily: WeatherDay[];
//     alerts: WeatherAlert[];
//   } | null;
//   tempScale: string;
// }

// class App extends React.Component<{}, AppState> {
//   state: AppState;

//   constructor(props: any) {
//     super(props);
//     this.state = {
//       locale: navigator.language,
//       searchInput: "",
//       location: {
//         city: null,
//         state: null,
//         coords: [],
//       },
//       weather: null,
//       tempScale: "fahrenheit",
//     };
//   }

//   /**
//    * Switches the temperature scale to fahrenheit or celsius on click.
//    */
//   handleScaleSwitch = () => {
//     const newTempScale =
//       this.state.tempScale === "fahrenheit" ? "celsius" : "fahrenheit";

//     this.setState({
//       tempScale: newTempScale,
//     });
//   };

//   /**
//    * Updates search input on input change.
//    * @param {object} e Event.
//    */
//   handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       searchInput: e.target.value,
//     });
//   };

//   /**
//    * Updates location coordinates on input submit.
//    */
//   handleSearchInputSubmit = async (e: any) => {
//     e.preventDefault();
//     const inputText = e.target.querySelector(".search__input");
//     try {
//       const { latt, longt } = await geocode(this.state.searchInput);
//       this.setState((prevState) => {
//         return {
//           location: { ...prevState.location, coords: [latt, longt] },
//         };
//       });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       inputText.value = "";
//     }
//   };

//   /**
//    * Gets the user's current coordinates.
//    */
//   getCurrentCoords = async () => {
//     try {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           this.setState((prevState) => {
//             return {
//               location: {
//                 ...prevState.location,
//                 coords: [latitude, longitude],
//               },
//             };
//           });
//         },
//         (error) => {
//           throw new Error(error.message);
//         }
//       );
//     } catch (error) {
//       throw new Error(error);
//     }
//   };

//   /**
//    * Updates the location city and state to match the coordinates and
//    * gets the weather for the new location.
//    */
//   updateLocationAndWeather = async () => {
//     try {
//       const [lat, lon] = this.state.location.coords;
//       const location: any = await reverseGeocode([
//         lat.toString(),
//         lon.toString(),
//       ]);

//       const city = location.city
//         .split(" ")
//         .map((str: any) => `${str.slice(0, 1)}${str.slice(1).toLowerCase()}`)
//         .join(" ");

//       const weather = new Weather(await getWeather(lat, lon));

//       this.setState((prevState) => {
//         return {
//           location: {
//             coords: prevState.location.coords,
//             city: city,
//             state: location.state,
//           },
//           weather,
//         };
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // If no change in coordinates, location and weather will NOT update.
//   componentDidUpdate(_: any, prevState: AppState) {
//     if (
//       prevState.location.coords.toString() ===
//       this.state.location.coords.toString()
//     )
//       return;

//     this.updateLocationAndWeather();
//   }

//   componentDidMount() {
//     this.getCurrentCoords();
//   }

//   render() {
//     const { city, state } = this.state.location;
//     const location = city && state ? `${city}, ${state}` : "";
//     return (
//       <div className="App">
//         <Navigation
//           onSearchInputChange={this.handleSearchInput}
//           onSearchInputSubmit={this.handleSearchInputSubmit}
//           onScaleSwitch={this.handleScaleSwitch}
//           location={location}
//           tempScale={this.state.tempScale}
//         />
//         <CurrentWeather
//           weather={this.state.weather}
//           tempScale={this.state.tempScale}
//           locale={this.state.locale}
//         />
//         <Forecast
//           locale={this.state.locale}
//           tempScale={this.state.tempScale}
//           weather={this.state.weather}
//         />
//       </div>
//     );
//   }
// }
