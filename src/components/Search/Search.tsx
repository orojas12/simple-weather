import React, { useEffect } from "react";
import { Combobox } from "components";
import { usePlaceAutocomplete, useGeocoding } from "hooks";
import { SearchIcon, LocationIcon } from "icons";
import "./search.css";

export interface SearchProps {
  setLocation: (location: any) => void;
}

export default function Search(props: SearchProps) {
  const [predictions, autocomplete] = usePlaceAutocomplete();
  const [location, geocode] = useGeocoding();

  useEffect(() => {
    if (location) props.setLocation(location);
  }, [location]);

  // const searchIconEl = (
  //   <img src={searchIcon} style={{ height: "100%", width: "100%" }} />
  // );
  // const locationIconEl = (
  //   <img src={locationIcon} style={{ height: "100%", width: "100%" }} />
  // );

  const listItems = predictions.map((prediction, i) => ({
    id: prediction.placeId,
    text: prediction.description,
    data: prediction,
  }));

  return (
    <div className="search">
      <Combobox
        id="searchCombobox"
        label="search location"
        autocomplete="list"
        items={listItems}
        select={(prediction) => {
          console.log(prediction);
          geocode(prediction.placeId);
        }}
        onChangeWithDelay={[autocomplete, 1000]}
        inputIcon={SearchIcon}
        itemIcon={LocationIcon}
      />
    </div>
  );
}
