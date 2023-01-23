import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";

import AutoSubmitTextbox from "./components/AutoSubmitTextbox/AutoSubmitTextbox";
import Navigation from "./components/Navigation/Navigation";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Forecast from "./components/Forecast/Forecast";
import useWeather from "./weather";
import useLocation from "./location";

export default function App() {
  // const [weather, updateWeather, setCoords] = useWeather(43, -75);
  // const { location, setLocation, searchResults, search } = useLocation();
  const [useCelsius, setUseCelsius] = useState(false);

  // const handleSubmit = async (e: FormEvent, text: string) => {
  //   e.preventDefault();
  //   search(text);
  // };

  return (
    <div className="App">
      {/* CREATE SEARCH COMPONENT */}
      <AutoSubmitTextbox
        submit={(text: string) => {
          console.log(text);
        }}
      />
      {/* <Navigation
        onSubmit={handleSubmit}
        onScaleSwitch={() => {
          setUseCelsius((prevState) => !prevState);
        }}
        cityAndState={`${location.name}, ${location.state}`}
        useCelsius={useCelsius}
      /> */}
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
